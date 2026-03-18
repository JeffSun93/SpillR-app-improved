import { ScrollView, View, Text, StyleSheet } from "react-native";
import CommentCardSocket from "./CommentCardSocket.jsx";
import {
  getCommentsByEpisodeId,
  getFilteredCommentsByEpisodeId,
} from "../../utils/utilsFunctionsByApi.js";
import { UserContext } from "../../context/User.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { commentStyles } from "../../styles/commentStyles.jsx";
import emojiLookup from "../../utils/emojiLookupObject.js";
import socket from "../../socket/connection.js";

export default function CommentsSocket(props) {
  const {
    setScrubFinished,
    scrubFinished,
    currentSeconds,
    episode_id,
    isHome,
    isUser,
    isProfile,
    isChat,
    feedComments,
    userComments,
    isPlaying,
    isScrubbing,
  } = props;

  const [comments, setComments] = useState([]);
  const currentSecondsRef = useRef(currentSeconds);
  const { loggedInUser } = useContext(UserContext);
  const bufferRef = useRef([]);
  const addOptimisticCommentRef = useRef(null);

  const addOptimisticComment = (newComment) => {
    setComments((prev) => {
      const existingIds = new Set(prev.map((c) => c.comment_id));
      if (existingIds.has(newComment.comment_id)) return prev;
      return [newComment, ...prev];
    });
  };

  addOptimisticCommentRef.current = addOptimisticComment;

  //add and display this comment immediately

  // DONT CHANGE BELOW FOR NOW - WORKING CHAT

  useEffect(() => {
    // missing piece to add websockets comments
    const handleNewComment = (newComment) => {
      console.log(newComment);
      // if (String(newComment.episode_id) !== String(episode_id)) return;
      // if (newComment.user_id === loggedInUser.user_id) {
      //   addOptimisticComment(newComment);
      // } else {
      //   const diff = Math.abs(
      //     newComment.runtime_seconds - currentSecondsRef.current,
      //   );
      //   //if the new comment added is near your runtime seconds add it immediately
      //   if (diff <= 30) {
      //     addOptimisticComment(newComment);
      //   }
      //   // let the buffer/ticker handle it at the right time
      //   bufferRef.current = [...bufferRef.current, newComment];
      // }
      setComments((prev) => [newComment, ...prev]);
    };
    socket.on("comment:new", handleNewComment);

    return () => {
      socket.off("comment:new", handleNewComment);
    };
  }, [episode_id]);

  // DONT CHANGE ABOVE FOR NOW

  // ─── initial load ───────────────────────────────────────────
  // When video is at t=0 and paused, fetch all comments for the episode
  useEffect(() => {
    if (!isChat || !episode_id) return;
    if (currentSeconds !== 0 || isPlaying) return;

    const fetchAllComments = async () => {
      const result = await getCommentsByEpisodeId(episode_id);
      setComments(result);
    };
    fetchAllComments();
  }, [isChat, currentSeconds, isPlaying, episode_id]);

  // ─── Chat — scrub ───────────────────────────────────────────────────
  // User jumped to a new timestamp —, refresh the buffer array and fetch and show all comments up to that point
  useEffect(() => {
    if (!isChat || !episode_id) return;
    if (currentSecondsRef.current === 0 && !isPlaying) return;

    const safeSeconds = Math.floor(currentSecondsRef.current);

    getFilteredCommentsByEpisodeId(episode_id, safeSeconds).then((result) => {
      bufferRef.current = result;
      setComments(
        [...result].sort((a, b) => b.runtime_seconds - a.runtime_seconds),
      );
      setScrubFinished(false);
    });
  }, [scrubFinished]);

  // ─── Chat — while playing, 30s polling starts ───────────────────────────────
  // Pre-fetches comments 3 mins ahead into a buffer; never sets comments directly
  useEffect(() => {
    if (!isChat || !episode_id) return;
    if (!isPlaying || isScrubbing) return;

    // Reset buffer when playback starts from zero
    if (bufferRef.current.length === 0 || currentSecondsRef.current === 0) {
      bufferRef.current = [];
      setComments([]);
    }

    const mergeIntoBuffer = (incoming) => {
      const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));
      const newComments = incoming.filter(
        (c) => !existingIds.has(c.comment_id),
      );
      bufferRef.current = [...bufferRef.current, ...newComments];
    };

    const fetchAhead = async () => {
      const safeSeconds = Math.floor(currentSecondsRef.current);
      const results = await getFilteredCommentsByEpisodeId(
        episode_id,
        safeSeconds,
      );
      mergeIntoBuffer(results);
    };

    fetchAhead();
    const interval = setInterval(fetchAhead, 30000);
    return () => clearInterval(interval);
  }, [isPlaying, isScrubbing, episode_id]);

  // ─── Chat — reveal buffered comments in real time ──────────────────
  // Runs every second; drip-feeds buffered comments whose timestamp is now due
  useEffect(() => {
    if (isScrubbing || isHome) {
      return;
    } else {
      // newly due is an array created from the buffer array that contains all the comments that are due now using a filter
      const newlyDue = bufferRef.current.filter(
        (c) => c.runtime_seconds <= currentSeconds,
      );

      bufferRef.current = bufferRef.current.filter(
        (c) => c.runtime_seconds > currentSeconds,
      );
      //if theres nothing due return nothing
      if (newlyDue.length === 0) {
        return;
      } else {
        //else set the comments and deduplicate based on what is already rendered in the comments array
        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => c.comment_id));
          const incoming = newlyDue.filter(
            (c) => !existingIds.has(c.comment_id),
          );
          if (incoming.length === 0) return prev;
          return [...incoming, ...prev];
        });
      }
    }
  }, [currentSeconds]);

  return (
    <ScrollView
      style={commentStyles.commentsBox}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 350 }}
      showsVerticalScrollIndicator={false}
    >
      {comments?.length > 0 ? (
        comments.map((comment, index) => (
          <View key={`${comment.comment_id},${index}`}>
            <CommentCardSocket
              isHome={isHome}
              isChat={isChat}
              isLive={comment.is_live}
              user_id={comment.user_id}
              body={
                comment.body ? comment.body : emojiLookup(comment.reaction_type)
              }
              created_at={comment.created_at}
              comment_id={comment.comment_id}
              runtime_seconds={comment.runtime_seconds}
              season_number={comment.season_number}
              episode_number={comment.episode_number}
              tv_show_name={comment.tv_show_name}
              type={comment.Commenttype}
              reactions_total={comment.reactions_total}
              repliesTotal={comment.repliesTotal}
              isReaction={comment.reaction_id}
              isReply={comment.reply_id}
              reactionType_total={comment.reactionType_total}
              setComments={setComments}
            />
            <View style={styles.divider} />
          </View>
        ))
      ) : (
        <Text style={styles.noComments}>
          {isHome
            ? null
            : `No reactions at this timestamp yet, keep playing to see more... or be the first?`}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noComments: {
    color: "#8E8E8E",
    fontWeight: 700,
  },

  scrollArea: {
    flex: 1,
    backgroundColor: "#232222",
  },
  nameContainer: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    justifyContent: "flex-start",
  },
  username: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    flexShrink: 1,
  },

  buttonNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: "7.5%",
    marginTop: 50,
  },

  handle: {
    color: "#505050",
    paddingLeft: "7.5%",
    marginTop: 0,
    fontSize: 15,
  },

  editButton: {
    marginTop: 50,
    borderColor: "#2663f4",
    borderWidth: 1.2,
    borderRadius: 15,
    paddingRight: 40,
    paddingLeft: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#2663f4",
    fontSize: 12,
    fontWeight: 800,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    marginTop: 20,
    marginLeft: "10%",
    height: 100,
    width: 100,
  },
  statsContainer: {
    flexDirection: "row",
    marginRight: 20,
    marginLeft: 30,
    gap: 30,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#8E8e8E",
    fontSize: 13,
  },
  bio: {
    color: "#ffffff",
    marginTop: 10,
    marginLeft: 20,
    lineHeight: 20,
  },
  sectionTitle: {
    color: "#8E8E8E",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  showContainer: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 8,
  },
  showCard: {
    width: 185,
    height: 140,
    borderRadius: 14,
  },
  commentsBox: {
    overflow: "visible",
    flex: 1,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  commentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
  commentContent: {
    flex: 1,
  },
  commentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentUser: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  commentTime: {
    color: "#8E8E8E",
    fontSize: 12,
  },
  commentMeta: {
    color: "#8E8E8E",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  commentText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#3a3a3a",
    marginVertical: 10,
  },
});

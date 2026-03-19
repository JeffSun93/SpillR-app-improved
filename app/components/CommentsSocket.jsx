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
    setScrubSwitch,
    scrubSwitch,
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

  useEffect(() => {
    currentSecondsRef.current = currentSeconds;
  }, [currentSeconds]);

  // store the for release later
  const mergeIntoBuffer = (incoming) => {
    const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));
    const newComments = incoming.filter((c) => !existingIds.has(c.comment_id));
    bufferRef.current = [...bufferRef.current, ...newComments];
  };

  //render immediately
  const addOptimisticComment = (newComment) => {
    setComments((prev) => {
      const existingIds = new Set(prev.map((c) => c.comment_id));
      if (existingIds.has(newComment.comment_id)) {
        return prev;
      } else {
        return [newComment, ...prev].sort(
          (a, b) => b.runtime_seconds - a.runtime_seconds,
        );
      }
    });
  };

  //fectchAhead and store for later
  const fetchAhead = async () => {
    const safeSeconds = Math.floor(currentSecondsRef.current);
    const results = await getFilteredCommentsByEpisodeId(
      episode_id,
      safeSeconds,
    );
    mergeIntoBuffer(results);
  };

  addOptimisticCommentRef.current = addOptimisticComment;

  //add and display this comment immediately

  // DONT CHANGE BELOW FOR NOW - WORKING CHAT

  useEffect(() => {
    // missing piece to add websockets comments
    const handleNewComment = (newComment) => {
      console.log(newComment);

      if (newComment.episode_id === episode_id) {
        const isOwnComment = newComment.user_id === loggedInUser.user_id;

        const differenceTime = Math.abs(
          newComment.runtime_seconds - currentSecondsRef.current,
        );

        // let the buffer/ticker just handle it at the right tim
        bufferRef.current = [...bufferRef.current, newComment];

        //if the new comment added is near your runtime seconds or it's yours add it immediately
        if (isOwnComment || differenceTime <= 40) {
          addOptimisticCommentRef.current(newComment);
        }
      }
    };
    socket.on("comment:new", handleNewComment);

    return () => {
      socket.off("comment:new", handleNewComment);
    };
  }, [episode_id]);

  // DONT CHANGE ABOVE FOR NOW

  // When video is at t=0 and paused, fetch all comments for the episode
  useEffect(() => {
    if (episode_id) {
      if (currentSeconds === 0 && !isPlaying) {
        const fetchAllComments = async () => {
          const result = await getCommentsByEpisodeId(episode_id);
          setComments(result);
        };
        fetchAllComments();
      }
    }
  }, [currentSeconds, isPlaying, episode_id]);

  //scrubbing pattern
  useEffect(() => {
    if (episode_id && !isScrubbing) {
      const safeSeconds = Math.floor(currentSecondsRef.current);

      const fetchCommentsByTime = async () => {
        const result = await getFilteredCommentsByEpisodeId(
          episode_id,
          safeSeconds,
        );

        const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));

        const newComments = result.filter(
          (c) => !existingIds.has(c.comment_id),
        );

        bufferRef.current = [...bufferRef.current, ...newComments];

        setComments((prev) => {
          const prevIds = new Set(prev.map((c) => c.comment_id));
          const toAdd = result.filter((c) => !prevIds.has(c.comment_id));

          return [...toAdd, ...prev].sort(
            (a, b) => b.runtime_seconds - a.runtime_seconds,
          );
        });
      };

      fetchCommentsByTime();
    }
  }, [scrubSwitch, isScrubbing]);

  // while playing, 30s polling starts
  // Pre-fetches comments 3 mins ahead into a buffer; never sets comments directly
  useEffect(() => {
    if (episode_id) {
      if (isPlaying && !isScrubbing) {
        const interval = setInterval(fetchAhead, 30000);
        // Reset buffer when playback starts from zero
        if (currentSecondsRef.current === 0) {
          bufferRef.current = [];
          setComments([]);
        }

        fetchAhead();
        return () => clearInterval(interval);
      }
    }
  }, [isPlaying, isScrubbing, episode_id]);

  // reveal buffered comments in real time ──────────────────
  // Runs every second because of ; drip-feeds buffered comments whose timestamp is now due
  useEffect(() => {
    if (!isScrubbing && isPlaying) {
      // newly due is an array created from the buffer array that contains all the comments that are due now using a filter
      const newlyDue = bufferRef.current.filter(
        (c) => c.runtime_seconds <= currentSeconds,
      );
      //buffer current must now drain those comments out of it
      bufferRef.current = bufferRef.current.filter(
        (c) => c.runtime_seconds > currentSeconds,
      );
      //if there is something due set the comments array
      if (newlyDue.length > 0) {
        //else set the comments and deduplicate based on what is already rendered in the comments array
        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => c.comment_id));
          const incoming = newlyDue.filter(
            (c) => !existingIds.has(c.comment_id),
          );
          return [...incoming, ...prev].sort(
            (a, b) => b.runtime_seconds - a.runtime_seconds,
          );
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
              avatar_url={comment.avatar_url}
              username={comment.username}
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
              isSpoiler={comment.is_spoiler}
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

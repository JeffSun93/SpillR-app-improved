import { ScrollView, View, Text, StyleSheet } from "react-native";
import CommentCard from "./commentCard";
import {
  getCommentsByEpisodeId,
  getFilteredCommentsByEpisodeId,
} from "../../utils/utilsFunctionsByApi.js";
import { useState, useEffect, useRef } from "react";
import { commentStyles } from "../../styles/commentStyles";
import emojiLookup from "../../utils/emojiLookupObject.js";
import socket from "../../socket/connection.js";

export default function Comments(props) {
  const {
    setScrubFinished,
    scrubFinished,
    currentSeconds,
    episode_id,
    isHome,
    userComments,
    isChat,
    isPlaying,
    isScrubbing,
  } = props;

  const [comments, setComments] = useState([]);
  const currentSecondsRef = useRef(currentSeconds);

  useEffect(() => {
    // missing piece to add websockets comments
    const handleNewComment = (newComment) => {
      if (String(newComment.episode_id) !== String(episode_id)) return;

      setComments((prevComments) => {
        const alreadyExists = prevComments.some(
          (comment) => comment.comment_id === newComment.comment_id,
        );

        if (alreadyExists) return prevComments;

        return [newComment, ...prevComments];
      });
    };
    socket.on("comment:new", handleNewComment);

    return () => {
      socket.off("comment:new", handleNewComment);
    };
  }, [episode_id]);

  // Keep ref in sync so the polling interval always reads the latest value
  // without needing currentSeconds as a dependency on the interval effect
  useEffect(() => {
    currentSecondsRef.current = currentSeconds;
  }, [currentSeconds]);

  // ─── Effect 1: isHome ───────────────────────────────────────────────────────
  // Not in isChat mode — just reflect the passed-in userComments array directly
  useEffect(() => {
    if (!isHome) {
      return;
    } else {
      setComments(userComments);
    }
  }, [isHome, userComments]);

  // ─── Effect 2: t = 0 and not playing ───────────────────────────────────────
  // Video is at the start and not playing — fetch ALL comments for the episode
  useEffect(() => {
    if (isHome || !episode_id) {
      return;
    } else {
      if (currentSeconds === 0 && !isPlaying) {
        const fetchAllComments = async () => {
          const result = await getCommentsByEpisodeId(episode_id);
          setComments(result);
        };
        fetchAllComments();
      }
    }
  }, [currentSeconds, isPlaying, episode_id, isHome]);

  const bufferRef = useRef([]);

  // ─── Effect 3: scrubbing ────────────────────────────────────────────────────
  useEffect(() => {
    if (!scrubFinished || isHome || !episode_id) return;
    if (currentSecondsRef.current === 0 && !isPlaying) return;

    const safeSeconds = Math.floor(currentSecondsRef.current);
    getFilteredCommentsByEpisodeId(episode_id, safeSeconds).then((result) => {
      bufferRef.current = result;
      // show all fetched results immediately — no filter, user jumped here deliberately
      const sorted = [...result].sort(
        (a, b) => b.runtime_seconds - a.runtime_seconds,
      );
      setComments(sorted);
      setScrubFinished(false);
    });
  }, [scrubFinished]);

  // ─── Effect 4: 30-second polling while playing ──────────────────────────────
  // Fetches 3 mins ahead and buffers — does NOT set comments directly
  useEffect(() => {
    if (isHome || !episode_id) return;
    if (!isPlaying || isScrubbing) return;

    if (bufferRef.current.length === 0 || currentSecondsRef.current === 0) {
      bufferRef.current = [];
      setComments([]);
    }

    // immediate fetch so buffer is populated before first 30s tick
    const fetchImmediate = async () => {
      const safeSeconds = Math.floor(currentSecondsRef.current);
      const results = await getFilteredCommentsByEpisodeId(
        episode_id,
        safeSeconds,
      );
      bufferRef.current = (() => {
        const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));
        const incoming = results.filter((c) => !existingIds.has(c.comment_id));
        return [...bufferRef.current, ...incoming];
      })();
    };
    fetchImmediate();

    const interval = setInterval(async () => {
      const safeSeconds = Math.floor(currentSecondsRef.current);
      const results = await getFilteredCommentsByEpisodeId(
        episode_id,
        safeSeconds,
      );

      // merge into buffer with dedup
      bufferRef.current = (() => {
        const existingIds = new Set(bufferRef.current.map((c) => c.comment_id));
        const incoming = results.filter((c) => !existingIds.has(c.comment_id));
        return [...bufferRef.current, ...incoming];
      })();
    }, 30000);

    return () => clearInterval(interval);
  }, [isPlaying, isScrubbing, episode_id, isHome]);

  // ─── Effect 5: reveal buffered comments as currentSeconds advances ───────────
  // Runs every second — filters buffer down to only what's due
  // ─── Effect 5: reveal buffered comments as currentSeconds advances ───────────
  useEffect(() => {
    if (isScrubbing || isHome) return;

    const newlyDue = bufferRef.current.filter(
      (c) => c.runtime_seconds === currentSeconds,
    );

    if (newlyDue.length === 0) return;

    setComments((prev) => {
      const existingIds = new Set(prev.map((c) => c.comment_id));
      const incoming = newlyDue.filter((c) => !existingIds.has(c.comment_id));
      if (incoming.length === 0) return prev;
      return [...incoming, ...prev]; // prepend to top
    });
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
        comments.map((comment) => (
          <View key={comment.comment_id}>
            <CommentCard
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

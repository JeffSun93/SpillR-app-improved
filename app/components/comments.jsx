import { ScrollView, View, Text, StyleSheet } from "react-native";
import CommentCard from "./commentCard";
import { getCommentsByEpisodeId } from "../../utils/utilsFunctionsByApi.js";
import { useState, useEffect } from "react";
import { commentStyles } from "../../styles/commentStyles";
import emojiLookup from "../../utils/emojiLookupObject.js";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const { currentSeconds, episode_id, isHome, userComments, isChat } = props;
  useEffect(() => {
    if (!episode_id) {
      if (userComments) setComments(userComments);
      return;
    }
    const fetchComments = async (id) => {
      const results = await getCommentsByEpisodeId(id);
      setComments(results);
    };
    fetchComments(episode_id);
  }, [episode_id]);

  const filteredCommentsByRuntimeRange = comments.filter(
    // needs to be fetched later instead
    (comment) =>
      comment.runtime_seconds >= currentSeconds - 1200 &&
      comment.runtime_seconds <= currentSeconds,
  );
  return (
    <ScrollView
      style={commentStyles.commentsBox}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      {filteredCommentsByRuntimeRange?.length > 0 ? (
        filteredCommentsByRuntimeRange.map((comment) => {
          return (
            <View key={comment.comment_id}>
              <CommentCard
                isChat={isChat}
                isLive={comment.is_live}
                user_id={comment.user_id}
                body={
                  comment.body
                    ? comment.body
                    : emojiLookup(comment.reaction_type)
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
          );
        })
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
    height: 230,
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

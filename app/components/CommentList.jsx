import { ScrollView, View, Text, StyleSheet } from "react-native";
import CommentCard from "./CommentCard.jsx";
import { commentStyles } from "../../styles/commentStyles.jsx";

export default function CommentList(props) {
  const { comments, setComments, isHome, isChat, isUser, isProfile } = props;

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
            <CommentCard
              comment={comment}
              setComments={setComments}
              isChat={isChat}
              isHome={isHome}
            />
            <View style={styles.divider} />
          </View>
        ))
      ) : (
        <Text style={styles.noComments}>
          {isHome
            ? null
            : `No comments or reactions at this timestamp yet, keep playing to see more... or be the first?`}
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

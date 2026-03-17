import ReplyCard from "./ReplyCard";
import Post from "./Post";
import {
  ScrollView,
  View,
  Text,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { getRepliesByCommentId } from "../../utils/utilsFunctionsByApi.js";

const RepliesList = ({ comment_id }) => {
  const [replylist, setReplyList] = useState([]);
  useEffect(() => {
    const fetchRepliesForThisComment = async () => {
      const result = await getRepliesByCommentId(comment_id);
      if (result.length > 0) {
        setReplyList(result);
      }
    };
    fetchRepliesForThisComment();
  }, [comment_id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80} // tweak this
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 100 }]}
        >
          {replylist.map((reply) => (
            <ReplyCard key={reply.reply_id} reply={reply} />
          ))}
        </ScrollView>

        <Post comment_id={comment_id} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: 8,
    paddingTop: 60,
    overflow: "visible",
  },
});

export default RepliesList;

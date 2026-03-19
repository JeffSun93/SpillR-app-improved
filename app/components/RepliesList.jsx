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
import socket from "../../socket/connection.js";
import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";
import { preventAutoHideAsync } from "expo-router/build/utils/splash.js";

const RepliesList = ({ comment_id, parent_username }) => {
  const [replylist, setReplyList] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const handleNewReply = (newReply) => {
      console.log(newReply);
      console.log(parent_username, "replies list");
      newReply.parent_username = parent_username;
      newReply.avatar_url = loggedInUser.avatar_url;
      newReply.replies_total = 0;
      newReply.reactions_total = 0;
      newReply.reactionType_total = {
        sadTotal: 0,
        heartTotal: 0,
        fireTotal: 0,
        deadTotal: 0,
        laughingTotal: 0,
        angryTotal: 0,
      };
      setReplyList((prev) => [newReply, ...prev]);
    };
    socket.on("reply:new", handleNewReply);
    return () => {
      socket.off("reply:new", handleNewReply);
    };
  }, [comment_id]);

  useEffect(() => {
    const fetchRepliesForThisComment = async () => {
      const result = await getRepliesByCommentId(comment_id);
      if (result.length > 0) {
        setReplyList(result);
        console.log(result);
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
            <ReplyCard key={"reply-id-" + reply.reply_id} reply={reply} />
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

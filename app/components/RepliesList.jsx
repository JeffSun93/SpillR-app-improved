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

const RepliesList = ({ commentId, parentUsername }) => {
  const [replylist, setReplyList] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const handleNewReply = (newReply) => {
      if (String(newReply.comment_id) !== String(commentId)) return;
      const replyToAdd = {
        ...newReply,
        replies_total: 0,
        reactions_total: 0,
        reactionType_total: {
          sadTotal: 0,
          heartTotal: 0,
          fireTotal: 0,
          deadTotal: 0,
          laughingTotal: 0,
          angryTotal: 0,
        },
      };
      console.log(replyToAdd);
      setReplyList((prev) => [replyToAdd, ...prev]);
    };
    socket.on("reply:new", handleNewReply);
    return () => {
      socket.off("reply:new", handleNewReply);
    };
  }, [commentId]);

  useEffect(() => {
    const fetchRepliesForThisComment = async () => {
      const result = await getRepliesByCommentId(commentId);
      if (result.length > 0) {
        setReplyList(result);
        console.log(result);
      }
    };
    fetchRepliesForThisComment();
  }, [commentId]);

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
          {replylist.map((reply, index) => (
            <ReplyCard
              key={"reply-id-" + index + reply.reply_id}
              reply={reply}
            />
          ))}
        </ScrollView>

        <Post commentId={commentId} parentUsername={parentUsername} />
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

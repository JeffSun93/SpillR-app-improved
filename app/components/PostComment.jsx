import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Send from "../../assets/send-button.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { EpisodeContext } from "../../context/Episode";
import socket from "../../socket/connection.js";

const PostBox = ({ comment_id, currentSecond, style }) => {
  const { loggedInUser } = useContext(UserContext);
  const { episodeId } = useContext(EpisodeContext);
  const [input, setInput] = useState("");

  const comment = {
    episode_id: episodeId,
    user_id: loggedInUser.user_id,
    // runtime_seconds: runtime_seconds,
    runtime_seconds: currentSecond ? currentSecond : 1, //hardcoded for now
    is_spoiler: false,
  };
  const handleSubmit = () => {
    console.log(input);
    if (input) {
      const newComment = {
        ...comment,
        body: input,
        username: loggedInUser.username,
        avatar_url: loggedInUser.avatar_url,
        repliesTotal: 0,
        reactions_total: 0,
        reactionType_total: {
          angryTotal: 0,
          laughingTotal: 0,
          sadTotal: 0,
          fireTotal: 0,
          deadTotal: 0,
          heartTotal: 0,
        },
      };
      console.log("client sends comment:", newComment);
      socket.emit("comment:post", newComment);
    }
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, style]}
    >
      <Image style={styles.avatar} source={{ uri: loggedInUser.avatar_url }} />
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="What's happening?"
          placeholderTextColor="#8E8E8E"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Send width={20} height={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingLeft: 16,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  avatar: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: "#ffffff",
    borderRadius: 20,
    marginLeft: 0,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    color: "#ffffff",
    fontSize: 15,
  },
  sendButton: {
    position: "absolute",
    right: 14,
  },
});

export default PostBox;

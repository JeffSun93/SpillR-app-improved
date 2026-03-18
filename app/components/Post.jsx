import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Send from "../../assets/send-button.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { EpisodeContext } from "../../context/Episode";
import socket from "../../socket/connection.js";

const Post = ({ comment_id, runtime_seconds, style }) => {
  const { loggedInUser } = useContext(UserContext);
  const { episodeId } = useContext(EpisodeContext);
  const [input, setInput] = useState("");

  const comment = {
    episode_id: episodeId,
    user_id: loggedInUser.user_id,
    // runtime_seconds: runtime_seconds,
    runtime_seconds: 1, //hardcoded for now
    is_spoiler: false,
  };

  const reply = {
    comment_id: comment_id,
    episode_id: episodeId,
    user_id: loggedInUser.user_id,
    runtime_seconds: 1,
    is_spoiler: false,
    body: input,
  };

  const handleSubmit = () => {
    if (input) {
      // console.log(input);
      if (!comment_id) {
        const newComment = { ...comment, body: input };
        console.log("client sends comment:", newComment);
        socket.emit("comment:post", newComment);
      } else {
        const newReply = { ...reply, body: input };
        console.log("client sends reply:", newReply);
        socket.emit("reply:post", newReply);
      }
      setInput("");
    }
  };

  return (
    <View style={[styles.container, style]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#101010",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: -16,
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

export default Post;

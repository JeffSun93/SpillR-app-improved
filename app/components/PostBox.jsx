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
import { UserContext } from "../context/User.jsx";

const PostBox = ({ comment_id, episode_id, style }) => {
  const { loggedInUser } = useContext(UserContext);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    console.log(input);
    setInput("");
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
    borderRadius: 30,
    paddingLeft: 16,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#101010",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
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

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { useState, useEffect } from "react";
import Send from "../../assets/send-button.jsx";
import socket from "../../socket/connection.js";

const PollInput = ({ comment_id, episode_id, style }) => {
  const { loggedInUser } = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleSubmit = () => {
    if (!question || !option1 || !option2) return;

    socket.emit("poll:create", {
      poll_name: question,
      field_1: option1,
      field_2: option2,
      episode_id,
      user_id: loggedInUser.user_id,
    });

    setQuestion("");
    setOption1("");
    setOption2("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, style]}
    >
      <View style={styles.inputWrapper}>
        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Ask chat something..."
            placeholderTextColor="#8E8E8E"
            value={question}
            onChangeText={setQuestion}
            style={styles.input}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Send width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.pollOptionsRow}>
          <TextInput
            placeholder="Option 1"
            placeholderTextColor="#8E8E8E"
            value={option1}
            onChangeText={setOption1}
            style={[styles.input, styles.pollOption]}
          />

          <TextInput
            placeholder="Option 2"
            placeholderTextColor="#8E8E8E"
            value={option2}
            onChangeText={setOption2}
            style={[styles.input, styles.pollOption]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  pollOptionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  pollOption: {
    flex: 1, // each input claims equal share of the row
    paddingHorizontal: 12, // slightly tighter padding since they're narrower
  },
  container: {
    borderRadius: 30,
    paddingLeft: 16,
    marginTop: 0,
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
    backgroundColor: "#101010",
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#2a2a2a",
    padding: 10,
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
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});

export default PollInput;

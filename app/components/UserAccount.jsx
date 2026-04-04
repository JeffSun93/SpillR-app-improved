import { View, Text, Image, StyleSheet, Pressable, Platform, Alert } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { commentStyles } from "../../styles/commentStyles.jsx";
import { useRouter } from "expo-router";
import socket from "../../socket/connection.js";

export default function UserAccount({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const router = useRouter();
  const [rejected, setRejected] = useState(false);

  const handleSelect = () => {
    setRejected(false);
    const previousUserId = loggedInUser?.user_id ?? null;

    socket.emit("user:login", { userId: user.user_id, previousUserId });

    socket.once("login:success", ({ userId }) => {
      if (userId === user.user_id) {
        setLoggedInUser(user);
        router.push("/");
      }
    });

    socket.once("login:rejected", ({ userId }) => {
      if (userId === user.user_id) {
        setRejected(true);
        if (Platform.OS === "web") {
          window.alert(`@${user.username} is already logged in elsewhere.`);
        } else {
          Alert.alert("Account in use", `@${user.username} is already logged in elsewhere.`);
        }
      }
    });
  };

  return (
    <Pressable
      style={[commentStyles.commentsBox, styles.pressable]}
      onPress={handleSelect}
    >
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
        <View style={styles.content}>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.name}>{user.name}</Text>
          {rejected && (
            <Text style={styles.rejected}>Already logged in elsewhere</Text>
          )}
        </View>
        <View style={[styles.button, rejected && styles.buttonRejected]}>
          <Text style={styles.buttonText}>{rejected ? "in use" : "select"}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  username: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  name: {
    color: "#8E8E8E",
    fontSize: 12,
    fontWeight: "400",
  },
  button: {
    padding: 8,
    marginRight: 5,
    backgroundColor: "#1B1B1B",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    alignSelf: "center",
  },
  buttonRejected: {
    borderColor: "#f87171",
    backgroundColor: "#2a1a1a",
  },
  buttonText: {
    color: "#8E8E8E",
    fontSize: 12,
    fontWeight: "400",
  },
  rejected: {
    color: "#f87171",
    fontSize: 11,
    marginTop: 2,
  },
});

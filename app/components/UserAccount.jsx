import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import { commentStyles } from "../../styles/commentStyles.jsx";

export default function UserAccount({ user }) {
  const { setLoggedInUser } = useContext(UserContext);

  return (
    <Pressable
      style={[commentStyles.commentsBox, styles.pressable]}
      onPress={() => setLoggedInUser(user)}
    >
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
        <View style={styles.content}>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>select</Text>
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
  buttonText: {
    color: "#8E8E8E",
    fontSize: 12,
    fontWeight: "400",
  },
});

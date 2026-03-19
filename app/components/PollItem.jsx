import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import TitleText from "./ui/ShowTitleText";
import socket from "../../socket/connection";

export default function PollItem({ poll, horizontal = true }) {
  //   const router = useRouter();

  const IMAGE_WIDTH = horizontal ? 140 : 100;
  const IMAGE_HEIGHT = horizontal ? 200 : 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.poll_name}</Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={() =>
            socket.emit("poll:vote", {
              poll_id: poll.poll_id,
              field_1: true,
              field_2: false,
              episode_id: poll.episode_id,
            })
          }
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{poll.field_1}</Text>
          <Text style={styles.voteCount}>{poll.poll_field_1_count}</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            socket.emit("poll:vote", {
              poll_id: poll.poll_id,
              field_1: false,
              field_2: true,
              episode_id: poll.episode_id,
            })
          }
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{poll.field_2}</Text>
          <Text style={styles.voteCount}>{poll.poll_field_2_count}</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalVotes}>{poll.poll_votes_count} votes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 14,
    marginRight: 10,
    backgroundColor: "#1B1B1B",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 10,
  },

  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  button: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },

  voteCount: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  totalVotes: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});

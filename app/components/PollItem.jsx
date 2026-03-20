import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import socket from "../../socket/connection";
import { useState } from "react";

export default function PollItem({ poll, horizontal = true }) {
  const [selectedVote, setSelectedVote] = useState(null);

  const totalVotes = poll.poll_votes_count || 0;
  const option1Votes = poll.poll_field_1_count || 0;
  const option2Votes = poll.poll_field_2_count || 0;

  const field1Percent = totalVotes > 0 ? (option1Votes / totalVotes) * 100 : 0;
  const field2Percent = totalVotes > 0 ? (option2Votes / totalVotes) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.poll_name}</Text>

      <Pressable
        disabled={selectedVote === 1}
        onPress={() => {
          setSelectedVote(1);
          // console.log("pressed field 1");

          socket.emit("poll:vote", {
            poll_id: poll.poll_id,
            field_1: true,
            field_2: false,
            episode_id: poll.episode_id,
          });
        }}
        style={({ pressed }) => [
          styles.option,
          pressed && styles.buttonPressed,
          selectedVote === 1 && styles.voted,
        ]}
      >
        <View style={styles.optionHeader}>
          <Text style={styles.buttonText}>{poll.field_1}</Text>
          <Text style={styles.percentText}>{Math.round(field1Percent)}%</Text>
        </View>

        <View style={styles.barTrack}>
          <LinearGradient
            colors={["#ff7a18", "#ff2d55", "#a259ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barFill, { width: `${field1Percent}%` }]}
          />
        </View>

        <Text style={styles.voteCount}>{option1Votes} votes</Text>
      </Pressable>

      <Pressable
        disabled={selectedVote === 2}
        onPress={() => {
          setSelectedVote(2);

          socket.emit("poll:vote", {
            poll_id: poll.poll_id,
            field_1: false,
            field_2: true,
            episode_id: poll.episode_id,
          });
        }}
        style={({ pressed }) => [
          styles.option,
          pressed && styles.buttonPressed,
          selectedVote === 2 && styles.voted,
        ]}
      >
        <View style={styles.optionHeader}>
          <Text style={styles.buttonText}>{poll.field_2}</Text>
          <Text style={styles.percentText}>{Math.round(field2Percent)}%</Text>
        </View>

        <View style={styles.barTrack}>
          <LinearGradient
            colors={["#ff7a18", "#ff2d55", "#a259ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barFill, { width: `${field2Percent}%` }]}
          />
        </View>

        <Text style={styles.voteCount}>{option2Votes} votes</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.totalVotes}>{totalVotes} votes</Text>
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
    gap: 12,
  },

  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 20,
  },

  option: {
    gap: 6,
  },

  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },

  percentText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  barTrack: {
    width: "100%",
    height: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 999,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 999,
    shadowColor: "#ff2d55",
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  voteCount: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
  },

  voted: {
    opacity: 0.6,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },

  totalVotes: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});

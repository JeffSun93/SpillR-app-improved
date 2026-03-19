import { ScrollView, View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import PollItem from "./PollItem";
import { globalStyles } from "../../styles/globalStyles";
import socket from "../../socket/connection";

// const polls = [
//   {
//     poll_id: 1,
//     user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
//     episode_id: 3129600,
//     img_url: null,
//     is_open: true,
//     poll_name: "Best EastEnders whodunnit ever?",
//     created_at: "2026-03-13T11:10:56.315556",
//     field_1: "Who Shot Phil Mitchell",
//     field_2: "Who Killed Archie Mitchell",
//   },
//   {
//     poll_id: 2,
//     user_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
//     episode_id: 3129600,
//     img_url: null,
//     is_open: true,
//     poll_name: "Most shocking return?",
//     created_at: "2026-03-13T11:10:56.315556",
//     field_1: "Dirty Den",
//     field_2: "Nick Cotton",
//   },
// ];

export default function PollsList({ id, horizontal = true }) {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPolls() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://spillr-be.onrender.com/api/episodes/${id}/polls`,
        );

        const data = await res.json();
        console.log(data);

        setPolls(data.polls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPolls();
    }
  }, [id]);

  useEffect(() => {
    function handlePollUpdate(updatedPolls) {
      console.log("poll:update received", updatedPolls);
      setPolls(updatedPolls);
    }

    socket.on("poll:update", handlePollUpdate);

    return () => {
      socket.off("poll:update", handlePollUpdate);
    };
  }, []);

  if (loading) return <Text style={styles.subtitle}>Loading polls...</Text>;
  if (error) return <Text>{error}</Text>;
  if (polls.length === 0)
    return (
      <Text style={styles.subtitle}>
        Polls will appear here if added ... so anything you want to ask chat?
      </Text>
    );

  if (horizontal) {
    return (
      <View>
        <Text style={styles.title}>Polls</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {polls.map((poll) => (
            <PollItem key={poll.poll_id} poll={poll} horizontal={horizontal} />
          ))}
        </ScrollView>
      </View>
    );
  }
  //   style={globalStyles.grid}

  return (
    <View>
      {polls.length > 0 ? <Text>Polls</Text> : ""}
      <View style={styles.pollsList}>
        {polls.map((poll) => (
          <View key={poll.poll_id} style={globalStyles.gridItem}>
            <PollItem poll={poll} horizontal={horizontal} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pollsList: {
    alignItems: "center",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 0,
    marginLeft: 20,
    marginBottom: 0,
    fontSize: 20,
    color: "white",
  },
  subtitle: {
    marginTop: 0,
    marginLeft: 22,
    marginRight: 25,
    marginBottom: 0,
    fontSize: 13,
    color: "#8E8E8E",
  },
});

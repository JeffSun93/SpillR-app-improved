import { View, Text, StyleSheet } from "react-native";

export default function FriendsAreWatching() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Everyone is talking about ...</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          3 friends and 200 others are watching
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "left",
  },
  container: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  card: {
    marginTop: 16,
    backgroundColor: "#aaaaaaff",
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  cardText: {
    textAlign: "center",
  },
});

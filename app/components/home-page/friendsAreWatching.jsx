import { View, Text, StyleSheet, Image } from "react-native";

export default function FriendsAreWatching() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Everyone is talking about ...</Text>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.image}
        ></Image>
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
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 6,
    flexDirection: "row",
  },
  cardText: {
    textAlign: "flex-start",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
});

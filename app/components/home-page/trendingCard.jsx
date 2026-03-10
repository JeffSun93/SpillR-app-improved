import { View, Text, StyleSheet } from "react-native";

export default function TrendingCard() {
  return (
    <View style={styles.card}>
      <Text>Trending Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: "#aaaaaaff",
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 6,
  },
});

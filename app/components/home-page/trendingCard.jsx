import { View, Text, StyleSheet, Image } from "react-native";

export default function TrendingCard(props) {
  const show = props.show;
  return (
    <View style={styles.card}>
      <Image source={{ uri: show.tv_show_img_url }} style={styles.image} />
      <Text>{show.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    marginRight: 12,
    backgroundColor: "#aaaaaaff",
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  gridCard: {
    width: "48%",
    marginRight: 0,
  },
  image: { width: 120, height: 180, borderRadius: 6, marginBottom: 8 },
});

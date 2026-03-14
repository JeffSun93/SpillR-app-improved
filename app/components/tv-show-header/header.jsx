import { View, Text, StyleSheet, Image } from "react-native";

export default function Header(props) {
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
    backgroundColor: "#aaaaaaff",
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  image: { width: 120, height: 180, borderRadius: 6, marginBottom: 8 },
});

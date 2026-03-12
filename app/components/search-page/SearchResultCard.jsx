import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SearchResultCard({ show }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/tv-show/[id]",
          params: { id: show.tv_show_id },
        })
      }
    >
      <Image source={{ uri: show.tv_show_img_url }} style={styles.image} />

      <Text style={styles.title} numberOfLines={1}>
        {show.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 6,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },

  title: {
    color: "white",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
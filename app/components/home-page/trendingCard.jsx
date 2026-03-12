import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function TrendingCard({ show, horizontal = true }) {
  const router = useRouter();

  const IMAGE_WIDTH = horizontal ? 140 : 100;
  const IMAGE_HEIGHT = horizontal ? 200 : 150;

  return (
    <Pressable onPress={() => router.push(`/tv-show/${show.tv_show_id}`)}>
      <View style={styles.card}>
        <Image
          source={{ uri: show.tv_show_img_url }}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            borderRadius: 6,
            marginBottom: 4,
          }}
        />
        <Text>{show.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 6,
  },
  horizontalCard: {},
  gridCard: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

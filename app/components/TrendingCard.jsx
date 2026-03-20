import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { globalStyles } from "../../styles/globalStyles";
import TitleText from "./ui/ShowTitleText";

export default function TrendingCard({ show, horizontal = true }) {
  const router = useRouter();

  const IMAGE_WIDTH = horizontal ? 140 : 140;
  const IMAGE_HEIGHT = horizontal ? 200 : 200;

  return (
    <Pressable onPress={() => router.push(`/tv-show/${show.tv_show_id}`)}>
      <View style={[globalStyles.color, { width: IMAGE_WIDTH }]}>
        <Image
          source={{ uri: show.tv_show_img_url }}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            borderRadius: 6,
            marginBottom: 4,
          }}
        />
        <TitleText style={globalStyles.color}>{show.name}</TitleText>
      </View>
    </Pressable>
  );
}

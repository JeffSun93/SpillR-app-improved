import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function EpisodeCard({ episode, selectedSeason, showName }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/episode-live-chat/${episode.episode_id}`,
          params: {
            showName: showName,
          },
        })
      }
    >
      <View style={styles.episodeCard}>
        <View key={episode.episode_id}>
          <Text>{`Season ${selectedSeason.season_number}, Episode ${episode.episode_number}`}</Text>
          <Image
            style={{ width: "100%", aspectRatio: 1, borderRadius: 6 }}
            source={{ uri: episode.episode_url }}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  episodeCard: {
    width: "100%",
  },
});

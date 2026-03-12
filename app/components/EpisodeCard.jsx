import { View, StyleSheet, Text, Image } from "react-native";

export default function EpisodeCard({ episode, selectedSeason }) {
  return (
    <View key={episode.episode_id}>
      <Text>{`Season ${selectedSeason.season_number}, Episode ${episode.episode_number}`}</Text>
      <Image
        style={{ width: 40, height: 40 }}
        source={{ uri: episode.episode_url }}
      />
    </View>
  );
}

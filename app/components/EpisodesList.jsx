import { View, StyleSheet, Text, Image } from "react-native";

export default function EpisodesList({ selectedSeason }) {
  const episodesArray = selectedSeason.episodes || [];

  return (
    <View style={styles.listContainer}>
      {episodesArray.map((episode) => (
        <View key={episode.episode_id}>
          <Text>{`Season ${selectedSeason.season_number}, Episode ${episode.episode_number}`}</Text>
          <Image
            style={{ width: 40, height: 40 }}
            source={{ uri: episode.episode_url }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {},
});

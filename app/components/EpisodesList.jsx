import { View, StyleSheet, Text, Image } from "react-native";
import EpisodeCard from "./EpisodeCard";

export default function EpisodesList({ selectedSeason, showName }) {
  const episodesArray = selectedSeason.episodes || [];

  return (
    <View style={styles.listContainer}>
      {episodesArray.map((episode) => (
        <View key={episode.episode_id} style={styles.gridItem}>
          <EpisodeCard
            episode={episode}
            selectedSeason={selectedSeason}
            showName={showName}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    padding: 10,
    width: "50%",
  },
});

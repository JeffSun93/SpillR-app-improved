import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import {
  getEpisodeById,
  getSeasonByID,
  getTvShowById,
} from "../../utils/utilsFunctions.js";
import { useState, useEffect } from "react";

export default function FriendsAreWatchingCards({
  episodeId,
  friendsWatching,
  userWatching,
}) {
  const [episodeInfo, setEpisodeInfo] = useState({});
  useEffect(() => {
    const fetchEpisodeById = async () => {
      const episode = await getEpisodeById(episodeId);
      const seasonId = episode.season_id;
      const season = await getSeasonByID(seasonId);
      const tvShowId = season.tv_show_id;
      const tvShow = await getTvShowById(tvShowId);
      episode.seasonNumber = season.season_number;
      episode.tvShowName = tvShow.name;
      setEpisodeInfo(episode);
    };
    fetchEpisodeById();
  }, []);
  return (
    <View>
      <Text
        style={[
          globalStyles.sectionTitle,
          { marginBottom: 0, paddingBottom: 0, marginTop: 10, paddingLeft: 10 },
        ]}
      >
        {episodeInfo.tvShowName} S{episodeInfo.seasonNumber} ep
        {episodeInfo.episode_number}
      </Text>
      <View style={styles.card}>
        {episodeInfo.episode_url && (
          <Image
            source={{ uri: episodeInfo.episode_url }}
            style={styles.image}
          ></Image>
        )}
        <Text style={styles.cardText}>
          {friendsWatching} friends and {userWatching - friendsWatching} others
          are watching
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 2,
    backgroundColor: "#211F21",
    borderWidth: 0.5,
    borderColor: "#2D2B2E",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 6,
    flexDirection: "row",
    width: 250,
  },
  cardText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "white",
    flexWrap: "wrap",
    fontFamily: "Agenda",
    alignSelf: "center",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
});

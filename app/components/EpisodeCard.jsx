import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function EpisodeCard({
  episode,
  selectedSeason,
  seasonNumber,
  showName,
  tv_show_img_url,
  isPremier,
}) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/episode-live-chat/${episode.episode_id}`,
          params: {
            showName: showName,
            seasonNumber: seasonNumber,
          },
        })
      }
    >
      <View style={styles.episodeCard}>
        <View key={episode.episode_id}>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: "100%", aspectRatio: 1, borderRadius: 6 }}
              source={{
                uri:
                  episode.episode_url ||
                  selectedSeason.season_img_url ||
                  tv_show_img_url,
              }}
            />
            {isPremier && (
              <View style={styles.liveContainer}>
                <View style={styles.glowRing}>
                  <View style={styles.liveIndicator} />
                </View>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
          <Text
            style={styles.episodeInfo}
          >{`Season ${selectedSeason.season_number}, Episode ${
            !episode.episode_number ? "special" : episode.episode_number
          }`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  liveContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  glowRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(34, 197, 94, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  liveText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Agenda-Bold",
  },
  episodeCard: {
    width: "100%",
  },
  episodeInfo: {
    marginTop: 10,
    color: "white",
  },
});

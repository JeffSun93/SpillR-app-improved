import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { getEpisodeById } from "../../utils/utilsFunctions";
import EpisodeTimelineScrubber from "../components/EpisodeTimelineScrubber";
import { Stack } from "expo-router";

export default function LiveChatPage() {
  const { id, showName } = useLocalSearchParams();

  //   const navigation = useNavigation();
  const [episode, setEpisode] = useState(null);
  const [episodeRuntime, setEpisodeRuntime] = useState(60);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    async function loadEpisode() {
      const data = await getEpisodeById(id);
      setEpisode(data);
      setEpisodeRuntime(data.runtime_total);

      //   navigation.setOptions({
      //     title: `Episode ${data.episode_number}`,
      //     headerStyle: {
      //       backgroundColor: "#484848",
      //     },
      //     headerTintColor: "#fff",
      //     headerTitleStyle: {
      //       fontWeight: "bold",
      //     },
      //   });
    }

    loadEpisode();
  }, [id]);

  if (!episode) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        scrollEnabled={!isScrubbing}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            title: ` Episode: ${episode?.episode_number} `,
            headerBackTitle: showName,
            headerStyle: {
              backgroundColor: "#484848",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{episode.episode_number}</Text>
          <View style={styles.timelineContainer}>
            <EpisodeTimelineScrubber
              setIsScrubbing={setIsScrubbing}
              episodeRuntime={episodeRuntime}
            />
          </View>
          <View style={styles.paragraph}>
            <Text style={styles.description}>{episode.synopsis}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  paragraph: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
    flexShrink: 0,
  },

  description: {
    flex: 1, // takes up remaining horizontal space
    flexWrap: "wrap",
  },
  timelineContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
});

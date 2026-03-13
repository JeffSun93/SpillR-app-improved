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
import { Stack } from "expo-router";
import { cleanText } from "../../utils/cleanText";
import PollsList from "../components/tv-show-chat/PollsList";
import EpisodeTimelineScrubber from "../components/EpisodeTimelineScrubber";
import CommentList from "../components/tv-show-chat/CommentList";
import { globalStyles } from "../../styles/globalStyles";

export default function LiveChatPage() {
  const { id, showName } = useLocalSearchParams();

  //   const navigation = useNavigation();
  const [episode, setEpisode] = useState(null);
  const [episodeRuntime, setEpisodeRuntime] = useState(60);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  useEffect(() => {
    async function loadEpisode() {
      const data = await getEpisodeById(id);
      setEpisode(data);
      setEpisodeRuntime(data.runtime_total);
    }

    loadEpisode();
  }, [id]);

  if (!episode) return <Text>Loading...</Text>;

  const synopsis = cleanText(episode.synopsis);

  return (
    <SafeAreaView style={globalStyles.container}>
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
          <Text style={styles.showName}>{showName}</Text>
          <Text style={styles.title}>Episode: {episode.episode_number}</Text>
          <View style={styles.timelineContainer}>
            <EpisodeTimelineScrubber
              currentSeconds={currentSeconds}
              setCurrentSeconds={setCurrentSeconds}
              setIsScrubbing={setIsScrubbing}
              episodeRuntime={episodeRuntime}
            />
          </View>
          <View style={styles.paragraph}>
            <Text style={styles.description}>{synopsis}</Text>
          </View>
          <View styles={{ height: 220, justifyContent: "center" }}>
            <PollsList />
          </View>
        </View>

        <CommentList currentSeconds={currentSeconds} episode_id={3129601} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
    color: "white",
  },
  paragraph: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    // marginLeft: 20,
    padding: 20,
    color: "white",
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
    color: "white",
  },
  timelineContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  showName: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
    fontWeight: "bold",
    color: "white",
  },
});

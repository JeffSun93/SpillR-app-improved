import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useNavigation, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getEpisodeById } from "../../utils/utilsFunctions";
import { cleanText } from "../../utils/cleanText";
import PollsList from "../components/PollsList.jsx";
import EpisodeTimelineScrubber from "../components/EpisodeTimelineScrubber";
import FloatingButton from "../components/FloatingButton";
import CommentsSocket from "../components/CommentsSocket.jsx";
import { globalStyles } from "../../styles/globalStyles";
import PostBox from "../components/PostComment.jsx";
import PollInput from "../components/PollInput.jsx";
import socket from "../../socket/connection";
import { EpisodeProvider } from "../../context/Episode";

export default function LiveChatPage() {
  const { id, showName, seasonNumber } = useLocalSearchParams();

  //   const navigation = useNavigation();
  const [episode, setEpisode] = useState(null);
  const [episodeRuntime, setEpisodeRuntime] = useState(60);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [scrubSwitch, setScrubSwitch] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showPollInput, setShowPollInput] = useState(false);
  useEffect(() => {
    async function loadEpisode() {
      const data = await getEpisodeById(id);
      setEpisode(data);
      setEpisodeRuntime(data.runtime_total);
    }

    loadEpisode();
  }, [id]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("room:join", id);
      console.log(`socket connected and joined room ${id}`);
    }
    return () => {
      if (socket.connected) {
        socket.emit("room:leave", id);
        socket.off("comment:new");
        console.log(`socket left room ${id}`);
        socket.disconnect();
      }
    };
  }, [id]);

  if (!episode) return <Text>Loading...</Text>;

  const synopsis = cleanText(episode.synopsis);

  return (
    <EpisodeProvider episodeId={episode.episode_id}>
      <View style={[globalStyles.container, { flex: 1, paddingHorizontal: 0 }]}>
        <ScrollView
          scrollEnabled={!isScrubbing}
          contentContainerStyle={{ paddingTop: 2, paddingBottom: 0 }}
          showsVerticalScrollIndicator={false}
        >
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerTitle: "",
              headerTintColor: "#FFFFFF",
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerShadowVisible: false,
            }}
          />

          <View style={styles.container}>
            <ImageBackground
              source={{ uri: episode.episode_url }}
              style={styles.heroImage}
            >
              <LinearGradient
                colors={[
                  "rgba(102,102,102,0)",
                  "rgba(16,16,16,0.90)",
                  "rgba(16,16,16,1)",
                ]}
                locations={[0.01, 0.7, 1]}
                style={styles.heroOverlay}
              >
                <Text style={styles.title}>
                  S{seasonNumber} Ep:{" "}
                  {!episode.episode_number
                    ? "Season special"
                    : episode.episode_number}
                </Text>
                <Text style={styles.showName}>{showName}</Text>
                <View style={styles.timelineContainer}>
                  <EpisodeTimelineScrubber
                    setScrubSwitch={setScrubSwitch}
                    scrubSwitch={scrubSwitch}
                    episodeRuntime={episodeRuntime}
                    currentSeconds={currentSeconds}
                    setCurrentSeconds={setCurrentSeconds}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isScrubbing={isScrubbing}
                    setIsScrubbing={setIsScrubbing}
                  />
                </View>
              </LinearGradient>
            </ImageBackground>
            <View style={styles.paragraph}>
              <Text
                style={styles.description}
                numberOfLines={expanded ? undefined : 3}
              >
                {synopsis}
              </Text>
              <Text
                style={styles.readMore}
                onPress={() => setExpanded(!expanded)}
              >
                {expanded ? "Read less" : "Read more"}
              </Text>
            </View>
            <View styles={{ height: 220, justifyContent: "center" }}>
              <PollsList />
            </View>
          </View>

          <CommentsSocket
            setScrubSwitch={setScrubSwitch}
            scrubSwitch={scrubSwitch}
            currentSeconds={currentSeconds}
            episode_id={episode.episode_id}
            isChat={true}
            isPlaying={isPlaying}
            isScrubbing={isScrubbing}
            isHome={false}
          />
        </ScrollView>
        <View style={styles.fab}>
          <FloatingButton
            episodeId={episode.episode_id}
            showPost={showPost}
            setShowPost={setShowPost}
            showPollInput={showPollInput}
            setShowPollInput={setShowPollInput}
          />
        </View>
        {showPost && (
          <PostBox
            episode_id={id}
            currentSecond={currentSeconds}
            style={styles.postBar}
          />
        )}
        {showPollInput && <PollInput episode_id={id} style={styles.postBar} />}
      </View>
    </EpisodeProvider>
  );
}

const styles = StyleSheet.create({
  postBar: {
    position: "absolute",
    width: "80%",
    bottom: 35,
    left: 0,
    right: 0,
  },

  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    zIndex: 100,
  },
  heroImage: {
    width: "100%",
    height: 280,
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  readMore: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
    marginLeft: 20,
    color: "white",
  },
  paragraph: {
    gap: 12,
    alignItems: "flex-start",
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
    flex: 1,
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
    marginTop: 0,
    marginLeft: 20,
    fontWeight: "bold",
    color: "white",
  },
});

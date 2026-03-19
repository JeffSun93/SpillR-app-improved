import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const trackWidth = screenWidth - 65;

export default function EpisodeTimelineScrubber({
  episodeRuntime,
  scrubSwitch,
  setScrubSwitch,
  setIsScrubbing,
  currentSeconds,
  setCurrentSeconds,
  isPlaying,
  setIsPlaying,
}) {
  const [episodeFinished, setEpisodeFinished] = useState(false);
  const [scrubWidth, setScrubWidth] = useState(0);
  const scrubPositionRef = useRef(currentSeconds);

  const runtimeSeconds = episodeRuntime * 60;

  // keep scrubWidth in sync with playback, but not during scrubbing
  useEffect(() => {
    setScrubWidth((currentSeconds / runtimeSeconds) * trackWidth);
  }, [currentSeconds]);

  const formatRuntime = (seconds) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isPlaying && !episodeFinished) {
      const id = setInterval(() => {
        setCurrentSeconds((prev) => {
          const next = prev + 1;
          if (next >= runtimeSeconds) {
            setEpisodeFinished(true);
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [isPlaying, episodeFinished]);

  const confineAndConvertXPosition = (x) => {
    const limitedX = Math.max(0, Math.min(x, trackWidth));
    const seconds = Math.floor((limitedX / trackWidth) * runtimeSeconds);
    scrubPositionRef.current = seconds;
    // only update local visual state — parent stays frozen during drag
    setScrubWidth(limitedX);
  };

  const handlePress = (event) => {
    const x = event.nativeEvent.locationX;
    confineAndConvertXPosition(x);
  };

  const handlePressPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const displaySeconds = Math.floor((scrubWidth / trackWidth) * runtimeSeconds);
  const minutes = Math.floor(displaySeconds / 60);
  const seconds = displaySeconds % 60;

  return (
    <View>
      <View>
        <Text
          style={[
            styles.timeDisplay,
            { transform: [{ translateX: scrubWidth - 25 }] },
          ]}
        >{`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Text>
      </View>
      <View style={styles.buttonAndBarContainer}>
        <View
          style={styles.greyTrackBar}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={() => {
            setIsScrubbing(true);
          }}
          onResponderMove={handlePress}
          onResponderRelease={() => {
            setCurrentSeconds(scrubPositionRef.current); // commit to parent on release
            setIsScrubbing(false);
            setScrubSwitch(!scrubSwitch);
          }}
          onResponderTerminate={() => {
            setCurrentSeconds(scrubPositionRef.current);
            setIsScrubbing(false);
            setScrubSwitch(!scrubSwitch);
          }}
        >
          <View
            style={[
              styles.currentPosition,
              { transform: [{ translateX: scrubWidth - 3 }] },
            ]}
          />
          <View style={[styles.purpleProgressBar, { width: scrubWidth }]} />
        </View>

        <View style={styles.controlsRow}>
          <Pressable
            style={styles.buttonContainer}
            onPress={handlePressPlayPause}
          >
            {isPlaying ? (
              <AntDesign name="pause" style={styles.playOrPauseButton} />
            ) : (
              <Entypo name="controller-play" style={styles.playOrPauseButton} />
            )}
          </Pressable>
          <Text style={styles.runtimeDisplay}>
            {formatRuntime(runtimeSeconds)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAndBarContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth - 65,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playOrPauseButton: {
    fontSize: 20,
    paddingTop: 10,
    color: "white",
  },
  greyTrackBar: {
    height: 12,
    width: screenWidth - 65,
    borderRadius: 5,
    backgroundColor: "#c4c4c4ac",
  },
  purpleProgressBar: {
    height: 12,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#E500FF",
  },
  currentPosition: {
    position: "absolute",
    width: 3,
    height: 25,
    borderRadius: 100,
    backgroundColor: "white",
    zIndex: 1,
  },
  timeDisplay: {
    marginBottom: 8,
    marginTop: 5,
    color: "white",
    width: 50,
    textAlign: "center",
  },
  runtimeDisplay: {
    marginBottom: 8,
    marginTop: 8,
    color: "white",
    width: 50,
    textAlign: "center",
  },
});

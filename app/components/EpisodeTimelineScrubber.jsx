import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const trackWidth = screenWidth - 65;

export default function EpisodeTimelineScrubber({
  episodeRuntime,
  setIsScrubbing,
  currentSeconds,
  setCurrentSeconds,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeFinished, setEpisodeFinished] = useState(false);

  const runtimeSeconds = episodeRuntime * 60;

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

  const roundedSeconds = Math.floor(currentSeconds);
  let minutes = Math.floor(roundedSeconds / 60);
  let seconds = Math.floor(roundedSeconds % 60);

  let currentWidth = (currentSeconds / runtimeSeconds) * trackWidth;

  const confineAndConvertXPosition = (x) => {
    let limitedX = x;

    if (limitedX < 0) {
      limitedX = 0;
    }

    if (limitedX > trackWidth) {
      limitedX = trackWidth;
    }

    const seconds = (limitedX / trackWidth) * runtimeSeconds;

    setCurrentSeconds(seconds);
  };

  const handlePress = (event) => {
    const x = event.nativeEvent.locationX;
    confineAndConvertXPosition(x);
  };

  const handlePressPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const leftOffset = 0;

  return (
    <View>
      <View>
        <Text
          style={[
            styles.timeDisplay,
            { transform: [{ translateX: leftOffset + currentWidth - 25 }] },
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
            handlePress;
          }}
          onResponderMove={handlePress}
          onResponderRelease={() => setIsScrubbing(false)}
          onResponderTerminate={() => setIsScrubbing(false)}
        >
          <View
            style={[
              styles.currentPosition,
              { transform: [{ translateX: currentWidth - 5 }] },
            ]}
          />
          <View style={[styles.purpleProgressBar, { width: currentWidth }]} />
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
    height: 8,
    width: screenWidth - 65,
    borderRadius: 5,
    backgroundColor: "#c4c4c4ac",
  },
  purpleProgressBar: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#E500FF",
  },
  currentPosition: {
    position: "absolute",
    width: 8,
    height: 8,
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

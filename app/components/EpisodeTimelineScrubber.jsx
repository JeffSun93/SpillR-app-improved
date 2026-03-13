import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EpisodeTimelineScrubber({
  episodeRuntime,
  setIsScrubbing,
}) {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeFinished, setEpisodeFinished] = useState(false);

  const runtimeSeconds = episodeRuntime * 60;

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

  const trackWidth = 300;
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

  const leftOffset = 32;

  return (
    <View>
      <Text
        style={[
          styles.timeDisplay,
          { transform: [{ translateX: leftOffset + currentWidth - 25 }] },
        ]}
      >{`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Text>
      <View style={styles.buttonAndBarContainer}>
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
        <View
          style={styles.greyTrackBar}
          onStartShouldSetResponder={() => true} //  key for draggin (not just pressing)
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
          ></View>
          <View
            style={[styles.purpleProgressBar, { width: currentWidth }]}
          ></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAndBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playOrPauseButton: {
    fontSize: 20,
    color: "black",
  },
  greyTrackBar: {
    height: 8,
    width: 300,
    borderRadius: 5,
    backgroundColor: "#383838ac",
  },
  purpleProgressBar: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#9D00FF",
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
    marginTop: 5,
    color: "black",
    width: 50,
    textAlign: "center",
  },
});

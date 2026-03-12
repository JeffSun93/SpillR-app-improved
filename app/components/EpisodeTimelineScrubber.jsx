import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";

export default function EpisodeTimelineScrubber() {
  const [currentSeconds, setCurrentSeconds] = useState(1200);

  const runtimeSeconds = 3600;
  const trackWidth = 300;
  let currentWidth = (currentSeconds / runtimeSeconds) * trackWidth;

  const handlePress = (event) => {
    const x = event.nativeEvent.locationX;
    const positionToSeconds = (x / trackWidth) * runtimeSeconds;
    console.log(positionToSeconds);
    setCurrentSeconds(positionToSeconds);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.greyTrackBar}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  greyTrackBar: {
    height: 15,
    width: 300,
    backgroundColor: "grey",
  },
  purpleProgressBar: {
    height: 15,
    backgroundColor: "purple",
  },
  currentPosition: {
    position: "absolute",
    width: 14,
    height: 15,
    borderRadius: 100,
    backgroundColor: "white",
    zIndex: 1,
  },
});

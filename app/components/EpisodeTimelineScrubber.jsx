import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function EpisodeTimelineScrubber() {
  const [currentSeconds, setCurrentSeconds] = useState(1200);

  const runtimeSeconds = 3600;
  const trackWidth = 300;
  const currentWidth = (currentSeconds / runtimeSeconds) * trackWidth;

  return (
    <View style={styles.container}>
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
    </View>
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

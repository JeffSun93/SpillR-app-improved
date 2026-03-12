import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EpisodeTimelineScrubber() {
  const [currentSeconds, setCurrentSeconds] = useState(1200);

  const runtimeSeconds = 3600;
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

  return (
    <View style={styles.container}>
      <View
        style={styles.greyTrackBar}
        onStartShouldSetResponder={() => true} //  key for draggin (not just pressing)
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handlePress}
        onResponderMove={handlePress}
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
      <Text
        style={[
          styles.timeDisplay,
          { transform: [{ translateX: currentWidth - 25 }] },
        ]}
      >{`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greyTrackBar: {
    height: 15,
    width: 300,
    borderRadius: 5,
    backgroundColor: "grey",
  },
  purpleProgressBar: {
    height: 15,
    borderRadius: 5,
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
  timeDisplay: {
    marginTop: 5,
    color: "black",
    width: 50,
    textAlign: "center",
  },
});

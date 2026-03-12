import { View, Text, StyleSheet } from "react-native";
// import EpisodeTimelineScrubber from "../components/EpisodeTimelineScrubber";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text>Notifications Page</Text>
      {/* <EpisodeTimelineScrubber /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

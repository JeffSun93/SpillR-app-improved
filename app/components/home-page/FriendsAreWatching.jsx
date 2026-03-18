import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import FriendsAreWatchingCard from "./FriendsAreWatchingCard";
import { globalStyles } from "../../../styles/globalStyles";

export default function FriendsAreWatching() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Everyone is talking about ...</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.horizontalList}
      >
        <FriendsAreWatchingCard />
        <FriendsAreWatchingCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "left",
    color: "#8E8E8E",
    fontWeight: 700,
  },
  container: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
});

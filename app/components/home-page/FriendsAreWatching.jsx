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
    color: "#8F8D90",
  },
  container: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
});

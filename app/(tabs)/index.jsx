import { View, Text, StyleSheet } from "react-native";
import Header from "../components/home-page/header";
import Trending from "../components/home-page/trending";
import FriendsAreWatching from "../components/home-page/friendsAreWatching";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Trending />
      <FriendsAreWatching />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
});

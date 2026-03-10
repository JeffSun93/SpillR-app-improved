import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/home-page/header";
import Trending from "../components/home-page/trending";
import FriendsAreWatching from "../components/home-page/friendsAreWatching";
import Comments from "../components/home-page/comments";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Header />
          <Trending />
          <FriendsAreWatching />
          <Comments />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: { paddingTop: 20, paddingBottom: 20 },
  container: {
    flex: 1,
    width: "100%",
  },
});

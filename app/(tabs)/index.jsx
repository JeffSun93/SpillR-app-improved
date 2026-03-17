import { View, ScrollView } from "react-native";
import Header from "../components/home-page/header";
import Trending from "../components/home-page/trending";
import FriendsAreWatching from "../components/home-page/friendsAreWatching";
import Comments from "../components/Comments";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Home() {
  const [isHome, setIsHome] = useState(true);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.container}>
          <Header />
          <Trending />
          <FriendsAreWatching />
          <Comments isHome={isHome} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

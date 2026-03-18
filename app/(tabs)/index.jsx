import { View, ScrollView } from "react-native";
import Header from "../components/home-page/Header";
import Trending from "../components/home-page/Trending";
import FriendsAreWatching from "../components/home-page/FriendsAreWatching";
import Comments from "../components/Comments";
import { getFeedComments } from "../../utils/utilsFunctions.js";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/User";
import { useState, useEffect, useRef, useContext } from "react";

export default function Home() {
  const { loggedInUser } = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    const fetchFeed = async () => {
      const result = await getFeedComments(loggedInUser.user_id, 0);
      setFeed(result);
    };
    fetchFeed();
  }, []);

  for (let i = 0; i < feed.length; i++) {
    const obj = feed[i];
    if (obj.reaction_id) {
      obj.Commenttype = "reaction";
    } else if (obj.reply_id) {
      obj.Commenttype = "reply";
    } else {
      obj.Commenttype = "comment";
    }
  }
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
          <Comments isHome={true} feedComments={feed} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

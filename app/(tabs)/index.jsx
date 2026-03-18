import { View, ScrollView, ActivityIndicator, Text } from "react-native";
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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async (currentOffset) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const result = await getFeedComments(loggedInUser.user_id, currentOffset);
    if (!result || result.length === 0) {
      setHasMore(false);
    } else {
      setFeed((prev) => [...prev, ...result]);
      setOffset((prev) => prev + result.length);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed(0);
  }, []);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
    if (isNearBottom) fetchFeed(offset);
  };

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
    <SafeAreaView style={globalStyles.container} edges={["top"]}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.container}>
          <Header />
          <Trending />
          <FriendsAreWatching />
          <Comments isHome={true} feedComments={feed} />
          {loading && (
            <ActivityIndicator color="#fff" style={{ marginVertical: 20 }} />
          )}
          {!hasMore && (
            <Text
              style={{
                color: "#8E8E8E",
                textAlign: "center",
              }}
            >
              You're all caught up
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

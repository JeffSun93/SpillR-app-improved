import { useState, useEffect, useRef, useContext } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePageHeader from "../HomePageHeader.jsx";
import Trending from "../Trending.jsx";
import FriendsAreWatching from "../FriendsAreWatching.jsx";
import CommentList from "../CommentList.jsx";
import { getFeedComments } from "../../../utils/utilsFunctions.js";
import { globalStyles } from "../../../styles/globalStyles.jsx";
import { UserContext } from "../../../context/User.jsx";

export default function Home() {
  const { loggedInUser } = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFeed([]);
    setOffset(0);
    setHasMore(true);
    fetchFeed(0);
  }, [loggedInUser.user_id]);

  const fetchFeed = async (offset) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await getFeedComments(loggedInUser.user_id, offset);
      setFeed((prev) => [...prev, ...result]);
      setOffset((prev) => prev + 5);

      if (result.length < 5) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(0);
  }, [loggedInUser.user_id]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchFeed(offset);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
    if (isNearBottom) loadMore();
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
          <HomePageHeader />
          <Trending />
          <FriendsAreWatching />
          <CommentList isHome={true} comments={feed} />
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

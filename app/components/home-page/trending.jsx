import { ScrollView, View, Text, StyleSheet } from "react-native";
import TrendingCard from "./trendingCard";

export default function Trending() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.trending}
    >
      <TrendingCard />
      <TrendingCard />
      <TrendingCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  trending: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
});

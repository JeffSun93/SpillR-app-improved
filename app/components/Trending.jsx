import { ScrollView, View, Text, FlatList, StyleSheet } from "react-native";
import TrendingCard from "./TrendingCard";
import { globalStyles } from "../../styles/globalStyles.jsx";
import { useEffect, useState } from "react";
import { getTrendingTvShows } from "../../utils/utilsFunctionsByApi.js";

export default function Trending({ horizontal = true }) {
  const [trendingTvShows, setTrendingTvShows] = useState([]);

  useEffect(() => {
    async function fetchTrendingTvShows() {
      try {
        const trendingTVshows = await getTrendingTvShows();

        setTrendingTvShows(trendingTVshows || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrendingTvShows();
  }, []);
  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.horizontalList}
      >
        {trendingTvShows?.length > 0 &&
          trendingTvShows.map((show) => (
            <TrendingCard
              key={show.tv_show_id}
              show={show}
              horizontal={horizontal}
            />
          ))}
      </ScrollView>
    );
  }

  return (
    <View style={globalStyles.grid}>
      {trendingTvShows?.length > 0 &&
        trendingTvShows.map((show) => (
          <View key={show.tv_show_id} style={globalStyles.gridItem}>
            <TrendingCard show={show} horizontal={horizontal} />
          </View>
        ))}
    </View>
  );
}

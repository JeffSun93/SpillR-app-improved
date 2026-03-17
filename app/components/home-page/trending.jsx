import { ScrollView, View, Text, FlatList, StyleSheet } from "react-native";
import TrendingCard from "./TrendingCard";
import { globalStyles } from "../../../styles/globalStyles";

const trendingTvShows = [
  {
    tv_show_id: 58174,
    name: "The Traitors",
    description:
      "<p>Nail-biting psychological competition where 22 strangers play the ultimate reality game of detection, backstabbing and trust, in the hope of winning up to £120,000.</p>",
    number_of_seasons: 5,
    number_of_episodes: 48,
    tv_show_img_url:
      "https://static.tvmaze.com/uploads/images/original_untouched/606/1515386.jpg",
  },
  {
    tv_show_id: 11363,
    name: "Love Island",
    description:
      "<p>On <b>Love Island</b> the Islanders must do their best to flirt, date, couple up in a bid to avoid being ‘dumped' from the Island. With new arrivals, heads may turn, while others will prove their true feelings. From romance and heart-to-hearts, to betrayal, bombshells and broken hearts, there's never a dull moment in the ultimate search for love. More texts, fire pit gatherings and challenges await the lovestruck Islanders, meaning there'll be plenty for them to dish the dirt on in the Beach Hut. Twists and turns will follow every step of the way, with shock recouplings, unexpected breakups and dramatic dumpings.</p><p>As the couples attempt to win the hearts of each other – and the public – one couple will ultimately triumph and be crowned <i>Love Island</i> winners</p>",
    number_of_seasons: 12,
    number_of_episodes: 558,
    tv_show_img_url:
      "https://static.tvmaze.com/uploads/images/original_untouched/572/1431169.jpg",
  },
  {
    tv_show_id: 40861,
    name: "RuPaul's Drag Race UK",
    description:
      "<p>Mama Ru presides as fabulous queens aim to be the UK's next Drag Race superstar. Who will dazzle the celeb judges and the amazing Michelle Visage? Join the party, squirrel friends!</p>",
    number_of_seasons: 8,
    number_of_episodes: 78,
    tv_show_img_url:
      "https://static.tvmaze.com/uploads/images/original_untouched/589/1473218.jpg",
  },
];

export default function Trending({ horizontal = true }) {
  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.horizontalList}
      >
        {trendingTvShows.map((show) => (
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
      {trendingTvShows.map((show) => (
        <View key={show.tv_show_id} style={globalStyles.gridItem}>
          <TrendingCard show={show} horizontal={horizontal} />
        </View>
      ))}
    </View>
  );
}

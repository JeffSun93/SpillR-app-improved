import SubCard from "./SubscribedCard";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../styles/globalStyles";

export default function SubLi() {
  const showArr = [
    {
      tv_show_id: 3508,
      name: "Gogglebox",
      tv_show_img_url:
        "https://static.tvmaze.com/uploads/images/original_untouched/613/1534217.jpg",
    },
    {
      tv_show_id: 7973,
      name: "Married at First Sight UK",
      tv_show_img_url:
        "https://static.tvmaze.com/uploads/images/original_untouched/588/1471880.jpg",
    },
    {
      tv_show_id: 2950,
      name: "The Great British Bake Off",
      tv_show_img_url:
        "https://static.tvmaze.com/uploads/images/original_untouched/585/1464906.jpg",
    },
    {
      tv_show_id: 2958,
      name: "The Apprentice",
      tv_show_img_url:
        "https://static.tvmaze.com/uploads/images/original_untouched/611/1527868.jpg",
    },
    {
      tv_show_id: 831,
      name: "Made in Chelsea",
      tv_show_img_url:
        "https://static.tvmaze.com/uploads/images/original_untouched/591/1478757.jpg",
    },
  ];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={[globalStyles.scrollContent, { paddingLeft: 16 }]}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.showContainer}>
        {showArr.map((show) => (
          <SubCard key={show.tv_show_id} show={show} />
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  showContainer: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 8,
  },
});

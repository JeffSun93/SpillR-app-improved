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
import { useState } from "react";

export default function SubLi({ userSubscriptions }) {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={[globalStyles.scrollContent, { paddingLeft: 16 }]}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.showContainer}>
        {userSubscriptions.map((show) => (
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

import { View, Text, StyleSheet, Image } from "react-native";
import TitleText from "../ui/TitleText";
import ShowTitleText from "../ui/ShowTitleText";
import { globalStyles } from "../../../styles/globalStyles";
export default function Header() {
  return (
    <View style={globalStyles.container}>
      <TitleText>Notifications</TitleText>

      <View style={styles.options}>
        <ShowTitleText>All</ShowTitleText>
        <ShowTitleText>Mentions</ShowTitleText>
        <ShowTitleText>Requests</ShowTitleText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   MarginTop: 16,
  //   alignItems: "center",
  // },

  titleText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
  optionText: {
    fontSize: 18,
  },
});

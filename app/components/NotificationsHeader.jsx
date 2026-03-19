import { View, Text, StyleSheet, Image } from "react-native";
import TitleText from "./ui/TitleText";
import ShowTitleText from "./ui/ShowTitleText";

export default function Header() {
  return (
    <View style={styles.header}>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
});

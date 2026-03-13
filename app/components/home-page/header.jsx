import { View, StyleSheet } from "react-native";
import TitleText from "../ui/TitleText";
import { globalStyles } from "../../../styles/globalStyles";

export default function Header() {
  return (
    <View style={globalStyles.container}>
      <View style={styles.titleContainer}>
        <TitleText style={styles.header}>SpillR</TitleText>
      </View>
      <TitleText>Trending</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
});

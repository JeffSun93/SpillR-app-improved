import { View, Text, StyleSheet } from "react-native";
import TitleText from "../ui/TitleText";
import { globalStyles } from "../../../styles/globalStyles";

export default function Header() {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>SpillR</Text>
      <TitleText style={styles.trending}>Trending</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#abababff",
  },
});

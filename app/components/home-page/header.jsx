import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpillR</Text>
      <Text style={styles.secondHeader}>Trending</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondHeader: {
    marginTop: 20,
    textAlign: "left",
    fontSize: 20,
  },
});

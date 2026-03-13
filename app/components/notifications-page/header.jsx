import { View, Text, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Notifications</Text>

      <View style={styles.options}>
        <Text style={styles.optionText}>All</Text>
        <Text style={styles.optionText}>Mentions</Text>
        <Text style={styles.optionText}>Requests</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    MarginTop: 16,
    alignItems: "center",
  },

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

import { View, Text, StyleSheet } from "react-native";

export default function TVShowChat() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TV Show Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});

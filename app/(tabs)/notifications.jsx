import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../../components/searchBar";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text>Notifications Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

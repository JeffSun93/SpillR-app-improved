import { View, Text, StyleSheet } from "react-native";
import Dropdown from "../components/Dropdown";

export default function Notifications() {
  return (
    <View style={styles.container}>
      {/* <Text>Notifications Page</Text> */}
      <Dropdown />
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

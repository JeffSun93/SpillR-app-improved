import { View, Text, StyleSheet, FlatList } from "react-native";
import NotificationCard from "./notificationCard";

export default function NotificationsList() {
  return (
    <View style={styles.notifications}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <NotificationCard />}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notifications: {
    paddingTop: 20,
    paddingBottom: 80,
  },
});

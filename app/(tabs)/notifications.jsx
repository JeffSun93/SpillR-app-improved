import { View, Text, StyleSheet } from "react-native";
import Header from "../components/notifications-page/header";
import NotificationsList from "../components/notifications-page/notificationsList";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Header />
      <NotificationsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 80,
  },
});

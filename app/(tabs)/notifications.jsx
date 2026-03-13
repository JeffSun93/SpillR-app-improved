import { View, Text, StyleSheet } from "react-native";
import Header from "../components/notifications-page/header";
import NotificationsList from "../components/notifications-page/notificationsList";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.container}>
        <Header />
        <NotificationsList />
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     marginTop: 80,
//   },
// });

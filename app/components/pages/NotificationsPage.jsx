import { ScrollView } from "react-native";
import NotificationsHeader from "../NotificationsHeader";
import NotificationsList from "../NotificationsList";
import { globalStyles } from "../../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <NotificationsHeader />
        <NotificationsList />
      </ScrollView>
    </SafeAreaView>
  );
}

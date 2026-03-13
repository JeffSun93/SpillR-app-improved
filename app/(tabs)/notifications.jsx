import { View, ScrollView } from "react-native";
import Header from "../components/notifications-page/header";
import NotificationsList from "../components/notifications-page/notificationsList";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <ScrollView>
          <Header />
          <NotificationsList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

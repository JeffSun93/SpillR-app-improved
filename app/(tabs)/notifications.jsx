import { ScrollView } from "react-native";
import Header from "../components/notifications-page/Header";
import NotificationsList from "../components/notifications-page/NotificationsList";
import { globalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <Header />
                <NotificationsList />
            </ScrollView>
        </SafeAreaView>
    );
}

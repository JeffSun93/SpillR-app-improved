import { View, StyleSheet, FlatList } from "react-native";
import NotificationCard from "./NotificationCard";

export default function NotificationsList() {
    return (
        <View style={styles.notifications}>
            {[1, 2, 3, 4, 5].map((item) => (
                <NotificationCard key={item.toString()} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    notifications: {
        paddingTop: 20,
        paddingBottom: 80,
    },
});

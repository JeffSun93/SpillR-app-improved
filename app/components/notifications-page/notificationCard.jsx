import { View, Text, StyleSheet, Image } from "react-native";

export default function NotificationCard() {
  return (
    <View style={styles.notification}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=1" }}
        style={styles.notificationAvatar}
      ></Image>
      <View style={styles.textContainer}>
        <Text style={styles.user}>@jazzmine1256 at 15:17</Text>
        <Text style={styles.action}>Liked your comment:</Text>
        <Text style={styles.comment}>
          .. Remell?? Why would you volunteer that you've been with 5 girls in a
          night willingly? No gun to your head
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    backgroundColor: "#aaaaaaff",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  textContainer: {
    flex: 1,
  },
  user: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "bold",
  },
  notificationAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
  comment: {
    marginTop: 5,
    fontWeight: "light",
    fontSize: 12,
  },
});

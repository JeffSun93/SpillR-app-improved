import { View, Text, StyleSheet } from "react-native";

export default function CommentCard() {
  return (
    <View style={styles.comment}>
      <Text style={styles.author}>
        @jazzmine1256 in LoveIslandUK S5 Ep10 at 15:17
      </Text>
      <Text>
        .. Remell?? Why would you volunteer that you've been with 5 girls in a
        night willingly? No gun to your head
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    marginTop: 16,
    backgroundColor: "#aaaaaaff",
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  author: {
    fontSize: 10,
    marginBottom: 10,
  },
});

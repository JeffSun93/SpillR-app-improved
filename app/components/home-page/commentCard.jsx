import { View, Text, StyleSheet, Image } from "react-native";
import CommentText from "../ui/CommentText";

export default function CommentCard() {
  return (
    <View style={styles.comment}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        style={styles.image}
      ></Image>
      <Text style={styles.author}>
        @jazzmine1256 in LoveIslandUK S5 Ep10 at 15:17
      </Text>
      <CommentText>
        .. Remell?? Why would you volunteer that you've been with 5 girls in a
        night willingly? No gun to your head
      </CommentText>
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
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
});

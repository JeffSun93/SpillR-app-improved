import { View, Text, StyleSheet } from "react-native";
import CommentCard from "./commentCard";

export default function Comments() {
  return (
    <View style={styles.comments}>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </View>
  );
}

const styles = StyleSheet.create({
  comments: {
    paddingTop: 20,
  },
});

import { Pressable, View, StyleSheet, TouchableOpacity } from "react-native";
import Replies from "../../assets/comment.jsx";
import Reaction from "../../assets/react.jsx";
import PollsIcon from "../../assets/PollsIcon.jsx";
import { useState, useEffect, useContext } from "react";

export default function FloatingButtonMenu({
  showPost,
  setShowPost,
  setShowPollInput,
  showPollInput,
  showEmojiPicker,
  setShowEmojiPicker,
  episodeId,
  reactionType,
}) {
  const handleReaction = (reactionType) => {
    console.log("reacted with:", reactionType);
    setShowEmojiPicker(false);
  };
  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.iconGroup}
        onPress={() => setShowPost(!showPost)}
      >
        <Replies />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconGroup}
        onPress={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <Reaction />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconGroup}
        onPress={() => setShowPollInput(!showPollInput)}
      >
        <PollsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconGroup: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
  },
  menu: {
    backgroundColor: "#1B1B1B",
    padding: 15,
    borderRadius: 10,
    borderColor: "rgb(101, 100, 100)",
    borderWidth: 1,
    position: "absolute",
    bottom: 70,
    right: 0,
    alignItems: "center",
    gap: 12,
  },
});

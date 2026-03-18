import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import PlusButton from "../../assets/Plus-button";
import FloatingButtonMenu from "./FloatingButtonMenu";
import EmojiPicker from "./EmojiPicker.jsx";

export default function FloatingButton({
  episodeId,
  showPost,
  setShowPost,
  showPollInput,
  setShowPollInput,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <Pressable
      onPress={() => setIsClicked(!isClicked)}
      style={{ alignSelf: "flex-end", position: "relative" }}
    >
      <PlusButton />
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={(reactionType) => {
            console.log("reacted with:", reactionType);
            setShowEmojiPicker(false);
          }}
          style={{
            position: "absolute",
            bottom: 0,
            right: 70,
          }}
        />
      )}

      {isClicked ? (
        <Pressable onPress={(e) => e.stopPropagation()}>
          <FloatingButtonMenu
            episodeId={episodeId}
            setShowPost={setShowPost}
            showPost={showPost}
            setShowPollInput={setShowPollInput}
            showPollInput={showPollInput}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
          />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  emojiPicker: {
    position: "absolute",
    bottom: 70,
    right: 80,
  },
});

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import emojiLookup from "../../utils/emojiLookupObject.js";

const EmojiPicker = ({ reactionType_total, onSelect }) => {
  const emojis = ["angry", "laughing", "sad", "fire", "dead", "heart"];

  return (
    <View style={styles.container}>
      {emojis.map((emoji) => (
        <TouchableOpacity
          key={emoji}
          style={styles.emojiOption}
          onPress={() => onSelect(emoji)}
        >
          <Text style={styles.emoji}>{emojiLookup(emoji)}</Text>
          <Text style={styles.count}>
            {reactionType_total[`${emoji}Total`]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#232222",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 6,
    alignSelf: "flex-end",
  },
  emojiOption: {
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
  },
  emoji: {
    fontSize: 20,
  },
  count: {
    fontSize: 10,
    color: "#8E8E8E",
  },
});

export default EmojiPicker;

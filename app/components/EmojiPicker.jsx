import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import emojiLookup from "../../utils/emojiLookupObject.js";

const EmojiPicker = ({ reactionType_total, onSelect, style, lastReaction }) => {
  const emojis = ["angry", "laughing", "sad", "fire", "dead", "heart"];

  return (
    <View style={[styles.container, style]}>
      {emojis.map((emoji) => (
        <TouchableOpacity
          key={emoji}
          style={[
            styles.emojiOption,
            lastReaction === emoji && styles.selected,
          ]}
          onPress={() => onSelect(emoji)}
        >
          <Text style={styles.emoji}>{emojiLookup(emoji)}</Text>
          {reactionType_total && (
            <Text style={styles.count}>
              {reactionType_total[`${emoji}Total`]}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    borderRadius: 20,

    shadowColor: "#e434f7",
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
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
    width: 260,
    flexWrap: "nowrap",
  },
  emojiOption: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    paddingHorizontal: 6,
  },
  emoji: {
    fontSize: 20,
  },
  count: {
    fontSize: 10,
    color: "#8E8E8E",
    height: 14,
    textAlign: "center",
  },
});

export default EmojiPicker;

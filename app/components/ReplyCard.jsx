import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import Reaction from "../../assets/react";
import EmojiPicker from "./EmojiPicker.jsx";

const ReplyCard = ({ reply }) => {
  const {
    user_id,
    body,
    runtime_seconds,
    username,
    avatar_url,
    reactions_total,
    reactionType_total,
    parent_username,
  } = reply;
  const { loggedInUser } = useContext(UserContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleReaction = (reactionType) => {
    console.log("reacted with:", reactionType);
    setShowEmojiPicker(false);
  };

  const formatRuntime = (seconds) => {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const actor = user_id === loggedInUser.user_id ? "you" : `@${username}`;

  return (
    <View style={styles.replyRow}>
      <Image style={styles.replyAvatar} source={{ uri: avatar_url }} />
      <View style={styles.replyContent}>
        <View style={styles.replyTopRow}>
          <Text style={styles.replyUser}>
            {actor} replied to @{parent_username}
          </Text>
          <Text style={styles.replyTime}>{formatRuntime(runtime_seconds)}</Text>
        </View>
        <Text style={styles.replyText}>{body}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.iconGroup}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Text style={styles.iconCount}>{reactions_total}</Text>
            <Reaction width={18} height={18} />
          </TouchableOpacity>
        </View>

        {showEmojiPicker && reactionType_total && (
          <EmojiPicker
            reactionType_total={reactionType_total}
            onSelect={handleReaction}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  replyRow: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 10,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: -16,
  },
  replyContent: {
    flex: 1,
    gap: 4,
  },
  replyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  replyUser: {
    color: "#8E8E8E",
    fontSize: 12,
  },
  replyTime: {
    color: "#8E8E8E",
    fontSize: 11,
  },
  replyText: {
    color: "#e4e4e4",
    fontSize: 14,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    marginTop: 4,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconCount: {
    fontSize: 12,
    color: "#8E8E8E",
  },
});

export default ReplyCard;

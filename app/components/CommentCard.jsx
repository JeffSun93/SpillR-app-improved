import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getUserById } from "../../utils/utilsFunctions.js";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/User.jsx";
import { commentStyles } from "../../styles/commentStyles.jsx";
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { timeAgo } from "../../utils/CleanTime.js";
import Replies from "../../assets/comment.jsx";
import Delete from "../../assets/delete.jsx";
import Reaction from "../../assets/react.jsx";
import SpoilerFlag from "../../assets/SpoilerFlag.jsx";
import RepliesList from "./RepliesList.jsx";
import EmojiPicker from "./EmojiPicker.jsx";

//comment flow for a single comment card, complete with how long ago it was
// posted relative to now, who posted it and a space for other meta data like where it was posted
export default function CommentCard(props) {
  const {
    comment_id,
    body,
    user_id,
    created_at,
    type,
    tv_show_name,
    episode_number,
    season_number,
    runtime_seconds,
    isChat,
    isLive,
    reactions_total,
    reactionType_total,
    repliesTotal,
    isReaction,
    isReply,
  } = props;
  const [username, setUserName] = useState(null);
  const [userurl, setUserurl] = useState(null);
  const { loggedInUser } = useContext(UserContext);
  const [relativeTime, setRelativeTime] = useState(
    created_at ? timeAgo(created_at) : "",
  );
  const [showReplies, setShowReplies] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleReplies = () => {
    if (!isChat) return;
    setShowReplies(!showReplies);
  };

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

  const actionMap = {
    comment: "commented on:",
    reply: "replied in: ",
    reaction: "reacted in: ",
  };

  const islive = isLive ? "live" : "replay";

  const actor = username === loggedInUser.username ? "you" : `@${username}`;
  const meta = type
    ? `${actor} ${actionMap[type]} ${tv_show_name} S${season_number} ep${episode_number}`
    : `posted in ${islive}`;

  useEffect(() => {
    const fetchUser = async () => {
      if (!user_id) return;
      const result = await getUserById(user_id);

      if (!result) return;

      setUserName(result.username);
      setUserurl(result.avatar_url);
      setRelativeTime(timeAgo(created_at));
    };
    fetchUser();
  }, [user_id]);

  return (
    <View>
      <View style={commentStyles.commentRow}>
        <Image style={commentStyles.commentAvatar} source={{ uri: userurl }} />
        <View style={commentStyles.commentContent}>
          <View style={commentStyles.commentTopRow}>
            <Text style={commentStyles.commentUser}>@{username}</Text>
            <Text style={commentStyles.commentTime}>
              {isChat ? formatRuntime(runtime_seconds) : relativeTime}
            </Text>
          </View>
          <Text style={commentStyles.commentMeta}>{meta}</Text>
          <Text style={commentStyles.commentText}>{body}</Text>
        </View>
      </View>
      {!isReaction && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.iconGroup}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Text style={styles.iconCount}>{reactions_total}</Text>
            <Reaction width={22} height={22} />
          </TouchableOpacity>

          {!isReply && (
            <>
              <TouchableOpacity
                style={styles.iconGroup}
                onPress={handleToggleReplies}
              >
                <Text style={styles.iconCount}>{repliesTotal}</Text>
                <Replies width={22} height={22} />
              </TouchableOpacity>
              {user_id === loggedInUser.user_id ? (
                <TouchableOpacity style={styles.iconGroup}>
                  <Delete
                    width={22}
                    height={22}
                    style={{ transform: [{ translateY: 2 }] }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.iconGroup}>
                  <SpoilerFlag width={22} height={22} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}

      {showEmojiPicker && (
        <EmojiPicker
          reactionType_total={reactionType_total}
          onSelect={handleReaction}
        />
      )}

      {showReplies && (
        <>
          <View style={styles.threadLine} />
          <RepliesList comment_id={comment_id} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  threadLine: {
    position: "absolute",
    left: 20,
    top: 40, // adjust to start just below avatar centre
    bottom: 0,
    width: 1,
    backgroundColor: "#2a2a2a",
    zIndex: -1, // sits behind everything so it never blocks touches
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
  buttonRow: {
    flexDirection: "row",
    gap: 15,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  scrollArea: {
    flex: 1,
    backgroundColor: "#232222",
  },
  nameContainer: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    justifyContent: "flex-start",
  },
  username: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap",
    flexShrink: 1,
  },

  buttonNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: "7.5%",
    marginTop: 50,
  },

  handle: {
    color: "#505050",
    paddingLeft: "7.5%",
    marginTop: 0,
    fontSize: 15,
  },

  editButton: {
    marginTop: 50,
    borderColor: "#2663f4",
    borderWidth: 1.2,
    borderRadius: 15,
    paddingRight: 40,
    paddingLeft: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#2663f4",
    fontSize: 12,
    fontWeight: 800,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    marginTop: 20,
    marginLeft: "10%",
    height: 100,
    width: 100,
  },
  statsContainer: {
    flexDirection: "row",
    marginRight: 20,
    marginLeft: 30,
    gap: 30,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#8E8e8E",
    fontSize: 13,
  },
  bio: {
    color: "#ffffff",
    marginTop: 10,
    marginLeft: 20,
    lineHeight: 20,
  },
  sectionTitle: {
    color: "#8E8E8E",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  showContainer: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 8,
  },
  showCard: {
    width: 185,
    height: 140,
    borderRadius: 14,
  },
});

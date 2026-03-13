import { Image, View, Text, StyleSheet } from "react-native";
import { getUserById } from "../../../utils/utilsFunctions.js";
import { useState, useEffect } from "react";
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function CommentCard(props) {
  const { body, user_id, created_at } = props;
  const [username, setUserName] = useState(null);
  const [userurl, setUserurl] = useState(null);
  const [commentTime, setCommentTime] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!user_id) return;
      const result = await getUserById(user_id);
      console.log(result);
      setUserName(result.username);
      setUserurl(result.avatar_url);
      setCommentTime(created_at);
    };
    fetchUser();
  }, [user_id]);
  return (
    <>
      <Image style={styles.commentAvatar} source={{ uri: userurl }} />
      <View style={styles.commentContent}>
        <View style={styles.commentTopRow}>
          <Text style={styles.commentUser}>@{username}</Text>
          <Text style={styles.commentTime}>{commentTime}</Text>
        </View>

        <Text style={styles.commentMeta}>
          you replied to @jazzmine1256 Love Island S4:
        </Text>
        <Text style={styles.commentText}>{body}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  commentsBox: {
    height: 230,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  commentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
  commentContent: {
    flex: 1,
  },
  commentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentUser: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
  commentTime: {
    color: "#8E8E8E",
    fontSize: 12,
  },
  commentMeta: {
    color: "#8E8E8E",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  commentText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#3a3a3a",
    marginVertical: 10,
  },
});

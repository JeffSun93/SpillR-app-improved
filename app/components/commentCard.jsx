import { Image, View, Text, StyleSheet } from "react-native";
import { getUserById } from "../../utils/utilsFunctions.js";
import { useState, useEffect } from "react";
import { commentStyles } from "../../styles/commentStyles";
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { timeAgo } from "../../utils/CleanTime.js";

//comment flow for a single comment card, complete with how long ago it was
// posted relative to now, who posted it and a space for other meta data like where it was posted
export default function CommentCard(props) {
  const { body, user_id, created_at } = props;
  const [username, setUserName] = useState(null);
  const [userurl, setUserurl] = useState(null);
  const [relativeTime, setRelativeTime] = useState(
    created_at ? timeAgo(created_at) : "",
  );

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
            <Text style={commentStyles.commentTime}>{relativeTime}</Text>
          </View>
          <Text style={commentStyles.commentMeta}>{null}</Text>
          <Text style={commentStyles.commentText}>{body}</Text>
        </View>
      </View>
    </View>
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
});

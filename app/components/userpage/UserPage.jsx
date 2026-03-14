import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { UserContext } from "../../context/User";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { commentStyles } from "../../../styles/commentStyles";
import Comments from "../comments";
import ProfileHeader from "./Header";
import SubLi from "./SubscribedLi";

export default function UserPage() {
  const { loggedInUser } = useContext(UserContext);
  const userComments = [
    {
      comment_id: 1,
      user_id: loggedInUser.user_id,
      body: "Why would you volunteer that you've been with 5 girls in a night willingly? No gun to your head",
      created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      reply_id: "r1",
      tv_show_name: "Love Island",
      season_number: 4,
      episode_number: 3,
    },
    {
      comment_id: 2,
      user_id: loggedInUser.user_id,
      body: "I am crying because she was wrong from the start and still so confident about it",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      reaction_id: "re1",
      tv_show_name: "Traitors",
      season_number: 4,
      episode_number: 2,
    },
    {
      comment_id: 3,
      user_id: loggedInUser.user_id,
      body: "This cast is so messy but I cannot stop watching",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      tv_show_name: "Geordie Shore",
      season_number: 12,
      episode_number: 1,
    },
  ];
  for (let i = 0; i < userComments.length; i++) {
    let type = "";
    const obj = userComments[i];
    const keys = Object.keys(obj);

    if (keys.includes("reply_id")) {
      type = "reply";
    } else if (keys.includes("reaction_id")) {
      type = "reaction";
    } else {
      type = "comment";
    }

    obj.Commenttype = type;
  }
  const firstName = loggedInUser.name.split(" ")[0];
  return (
    <View style={styles.scrollArea}>
      <ScrollView>
        <View style={styles.pageColor}>
          <ProfileHeader />

          <Text style={styles.sectionTitle}>Subscribed Shows</Text>

          <SubLi />

          <Text style={styles.sectionTitle}>Comments and replies</Text>

          <Comments userComments={userComments} isHome={true} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#101010",
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
    paddingHorizontal: "20",
    marginTop: 50,
  },

  handle: {
    color: "#a4a4a4ff",

    marginTop: 10,
    fontSize: 15,
  },

  editButton: {
    marginTop: 25,
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
    marginLeft: 20,
    height: 100,
    width: 100,
    borderRadius: 50,
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
    marginRight: 22,
    lineHeight: 20,

    paddingVertical: 8,
  },
  sectionTitle: {
    color: "#8E8E8E",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 700,
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

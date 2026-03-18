import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { commentStyles } from "../../styles/commentStyles";
import Comments from "../components/Comments";
import ProfileHeader from "../components/userpage/Header";
import SubLi from "../components/userpage/SubscribedLi";
import {
  getUserByIdAPI,
  getUserByUsernameAPI,
  getCommentsRepliesReactionsById,
} from "../../utils/utilsFunctions";

import { useLocalSearchParams, useNavigation, Stack } from "expo-router";

export default function ProfilePage() {
  const { id, username } = useLocalSearchParams();

  const [userObj, setUserObj] = useState({});
  const { loggedInUser } = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    const fetchUserById = async () => {
      const result = await getUserByIdAPI(id);
      const comments = await getCommentsRepliesReactionsById(id);
      setUserObj(result);
      setUserComments(comments);
      setSubscriptions(result.subscriptions);
    };

    fetchUserById();
  }, [id]);

  for (let i = 0; i < userComments.length; i++) {
    const obj = userComments[i];

    if (obj.reaction_id !== null) {
      obj.Commenttype = "reaction";
    } else if (obj.reply_id !== null) {
      obj.Commenttype = "reply";
    } else {
      obj.Commenttype = "comment";
    }
  }

  return (
    <View style={styles.scrollArea}>
      <ScrollView>
        <View style={styles.pageColor}>
          <ProfileHeader userObj={userObj} />

          <Text style={styles.sectionTitle}>Subscribed Shows</Text>

          <SubLi userSubscriptions={subscriptions} />

          <Text style={styles.sectionTitle}>Comments and replies</Text>

          <Comments userComments={userComments} isProfile={true} />
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

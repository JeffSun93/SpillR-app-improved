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
import { useRouter } from "expo-router";

export default function ProfileHeader({ userObj }) {
  const { loggedInUser } = useContext(UserContext);
  const firstName = userObj?.name?.split(" ")[0];
  const isSelf = userObj.user_id === loggedInUser.user_id;
  const isFriend = userObj.friends?.some(
    (friend) => friend.friend_user_id === loggedInUser.user_id,
  );
  const router = useRouter();

  return (
    <View>
      <View style={styles.buttonNameContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{firstName}</Text>
          <Text style={styles.handle}>@{userObj.username}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          {isSelf ? (
            <Text style={styles.buttonText}>Edit</Text>
          ) : isFriend ? (
            <Text style={styles.buttonText}>Friends</Text>
          ) : (
            <Text style={styles.buttonText}>Add Friend</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.profileRow}>
        <Image style={styles.userImage} source={{ uri: userObj.avatar_url }} />

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() =>
                router.push({
                  pathname: "../friend-list/[id]",
                  params: {
                    id: userObj.user_id,
                    friendList: JSON.stringify(userObj.friends),
                  },
                })
              }
            >
              <Text style={styles.statNumber}>{userObj.friend_count}</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userObj.subscription_count}</Text>
            <Text style={styles.statLabel}>Subscribed</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>
        {userObj.bio ? userObj.bio : "Nothing to see here yet.."}
      </Text>
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
    color: "rgb(214, 213, 213)",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 22,
    lineHeight: 20,

    paddingVertical: 8,
  },
});

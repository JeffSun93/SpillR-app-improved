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

export default function ProfileHeader() {
  const { loggedInUser } = useContext(UserContext);
  const firstName = loggedInUser.name.split(" ")[0];
  return (
    <View>
      <View style={styles.buttonNameContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{firstName}</Text>
          <Text style={styles.handle}>@{loggedInUser.username}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileRow}>
        <Image
          style={styles.userImage}
          source={{ uri: loggedInUser.avatar_url }}
        />

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>19</Text>
            <Text style={styles.statLabel}>Subscribed</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>
        Love Island is life!!! Also stream the new BTS album if you're a real
        one and not an OP x
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
    color: "#ffffff",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 22,
    lineHeight: 20,

    paddingVertical: 8,
  },
});

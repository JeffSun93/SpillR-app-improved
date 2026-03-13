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

export default function UserPage() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.scrollArea}>
      <ScrollView>
        <View style={styles.pageColor}>
          <View style={styles.buttonNameContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{loggedInUser.name}</Text>
              <Text style={styles.handle}>{loggedInUser.username}</Text>
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
            Love Island is life!!! Also stream the new BTS album if you're a
            real one and not an OP x
          </Text>

          <Text style={styles.sectionTitle}>Subscribed Shows</Text>

          <View style={styles.showContainer}>
            <Image
              style={styles.showCard}
              source={require("../../../assets/geordie-shore.png")}
            />

            <Image
              style={styles.showCard}
              source={require("../../../assets/traitors.png")}
            />
          </View>

          <Text style={styles.sectionTitle}>Comments and replies</Text>

          <ScrollView
            style={styles.commentsBox}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.commentRow}>
              <Image
                style={styles.commentAvatar}
                source={{ uri: loggedInUser.avatar_url }}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentTopRow}>
                  <Text style={styles.commentUser}>@theesudani</Text>
                  <Text style={styles.commentTime}>2m</Text>
                </View>
                <Text style={styles.commentMeta}>
                  you replied to @jazzmine1256 Love Island S4:
                </Text>
                <Text style={styles.commentText}>
                  Why would you volunteer that you've been with 5 girls in a
                  night willingly? No gun to your head
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.commentRow}>
              <Image
                style={styles.commentAvatar}
                source={{ uri: loggedInUser.avatar_url }}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentTopRow}>
                  <Text style={styles.commentUser}>@theesudani</Text>
                  <Text style={styles.commentTime}>2h</Text>
                </View>
                <Text style={styles.commentMeta}>
                  you reacted to @jazzmine1256 comment on Traitors S4 E2:
                </Text>
                <Text style={styles.commentText}>
                  I am crying because she was wrong from the start and still so
                  confident about it
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.commentRow}>
              <Image
                style={styles.commentAvatar}
                source={{ uri: loggedInUser.avatar_url }}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentTopRow}>
                  <Text style={styles.commentUser}>@theesudani</Text>
                  <Text style={styles.commentTime}>1d</Text>
                </View>
                <Text style={styles.commentMeta}>
                  you commented on Geordie Shore:
                </Text>
                <Text style={styles.commentText}>
                  This cast is so messy but I cannot stop watching
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
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

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "../../context/User";

export default function FriendCard({ friendObj, userPageID }) {
  const router = useRouter();
  const { loggedInUser } = useContext(UserContext);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/profilepage/[id]",
          params: {
            id: friendObj.friend_user_id,
            username: friendObj.friend_username,
          },
        })
      }
    >
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={{ uri: friendObj.friend_avatar_url }}
        />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.username}>@{friendObj.friend_username}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.container}>
          {userPageID === loggedInUser.user_id ? (
            <Text style={styles.friends}>friends</Text>
          ) : (
            <Text style={styles.friends}>profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 5,
    marginTop: 0,
    backgroundColor: "#1B1B1B",
    borderRadius: 10,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 21,
    marginTop: 2,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  friends: {
    color: "#8E8E8E",
    fontSize: 12,
    fontWeight: "400",
  },
});

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FriendsAreWatchingCard from "./FriendsAreWatchingCard";
import { globalStyles } from "../../styles/globalStyles";
import { UserContext } from "../../context/User.jsx";
import { useEffect, useState, useContext, useCallback } from "react";
import { getUserById } from "../../utils/utilsFunctions.js";
import socket from "../../socket/connection.js";

export default function FriendsAreWatching() {
  const { loggedInUser } = useContext(UserContext);
  const { userId } = loggedInUser;
  const [friendList, setFriendList] = useState([
    "d4e5f6a7-b8c9-0123-defa-234567890123",
  ]);
  const [roomStatus, setRoomStatus] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const fetchUserObj = async () => {
      try {
        const userObj = await getUserById(userId);
        console.log(userObj);
        const friends = userObj.friends;

        const userIds = friends.map((f) => f.friend_user_id);

        setFriendList(userIds);
        console.log(userIds);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserObj();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      const handleRoomStatus = (room) => {
        console.log("receive room status", room);
        setRoomStatus(room);
      };

      const handleRoomUserIn = (episodeId) => {
        console.log(`receive room ${episodeId} user in`);

        setRoomStatus((prev) => {
          const isEpisodeRoomExist = prev.some(
            (room) => room.episodeId === episodeId,
          );

          if (isEpisodeRoomExist) {
            return prev.map((room) =>
              room.episodeId === episodeId
                ? { ...room, userWatching: (room.userWatching || 0) + 1 }
                : room,
            );
          } else {
            return [
              { episodeId: episodeId, friendsWatching: 0, userWatching: 1 },
              ...prev,
            ];
          }
        });
      };

      const handleRoomUserOut = (episodeId) => {
        setRoomStatus((prev) => {
          const targetRoom = prev.find((r) => r.episodeId === episodeId);

          if (!targetRoom || targetRoom.userWatching <= 1) {
            return prev.filter((r) => r.episodeId !== episodeId);
          }

          return prev.map((r) =>
            r.episodeId === episodeId
              ? { ...r, userWatching: r.userWatching - 1 }
              : r,
          );
        });
      };

      const handleFriendJoin = ({ userId, episodeId }) => {
        console.log(`receive room ${episodeId} friend ${userId} join`);
        setRoomStatus((prev) =>
          prev.map((room) =>
            room.episodeId === episodeId
              ? { ...room, friendsWatching: room.friendsWatching + 1 }
              : room,
          ),
        );
      };
      const handleFriendLeave = ({ userId, episodeId }) => {
        console.log(`receive room ${episodeId} friend ${userId} leave`);
        setRoomStatus((prev) =>
          prev.map((room) =>
            room.episodeId === episodeId
              ? { ...room, friendsWatching: room.friendsWatching - 1 }
              : room,
          ),
        );
      };

      socket.connect();
      console.log(`socket connected!!!!`);
      socket.emit("room:load", friendList);
      socket.on("roomList:status", handleRoomStatus);
      console.log("2", roomStatus);
      socket.on("room:userIn", handleRoomUserIn);
      socket.on("room:userOut", handleRoomUserOut);
      socket.on("friend:join", handleFriendJoin);
      socket.on("friend:leave", handleFriendLeave);

      return () => {
        socket.off("roomList:status", handleRoomStatus);
        socket.off("room:userIn", handleRoomUserIn);
        socket.off("room:userOut", handleRoomUserOut);
        socket.off("friend:join", handleFriendJoin);
        socket.off("friend:leave", handleFriendLeave);
        socket.disconnect();
        console.log("socket deregietered!!!!");
      };
    }, [friendList]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Everyone is talking about ...</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.horizontalList}
      >
        {roomStatus.map((room) => {
          return (
            <FriendsAreWatchingCard
              key={room.episodeId}
              episodeId={room.episodeId}
              friendsWatching={room.friendsWatching}
              userWatching={room.userWatching}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "left",
    color: "#8E8E8E",
    fontWeight: 700,
  },
  container: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
});

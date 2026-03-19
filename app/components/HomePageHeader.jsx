import { View, StyleSheet, Pressable, Image, Text } from "react-native";
import TitleText from "./ui/TitleText";
import { globalStyles } from "../../styles/globalStyles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const firstName = loggedInUser.name.split(" ")[0];
  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.titleSide} />
        <TitleText style={styles.header} />
        <Pressable
          style={styles.titleSide}
          onPress={() =>
            router.push({
              pathname: "/login/[id]",
              params: { id: loggedInUser.user_id },
            })
          }
        >
          {loggedInUser?.avatar_url && (
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: loggedInUser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.avatarUsername}>{firstName}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <TitleText
        style={[globalStyles.sectionTitle, { paddingTop: 0, marginTop: 0 }]}
      >
        Trending UK
      </TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleSide: {
    flex: 1,
    alignItems: "flex-end",
  },
  avatarContainer: {
    alignItems: "center",
    paddingRight: 15,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "#ffffff",
  },
  avatarUsername: {
    color: "rgba(255, 255, 255, 0.75)",
    fontFamily: "Agenda-Bold",
    fontSize: 10,
    fontWeight: "900",
    marginTop: 5,
  },
});

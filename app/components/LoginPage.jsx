import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import UserAccount from "./UserAccount";
import { commentStyles } from "../../styles/commentStyles.jsx";
import { globalStyles } from "../../styles/globalStyles.jsx";

export default function LoginPage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const userAccounts = [
    {
      user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      username: "screenqueen",
      avatar_url: "https://i.pravatar.cc/150?img=1",
      language: "English",
      name: "Priya Sharma",
      bio: "Professional side-eye giver I watch so you don’t have to (but you should).Here for bad decisions, dramatic exits, and iconic one-liners.",
    },
    {
      user_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      username: "bingewatcher",
      avatar_url: "https://i.pravatar.cc/150?img=2",
      language: "English",
      name: "Marcus Johnson",
      bio: "Reality TV is my full-time personality. From roses to reunions—I break it all down. Hot takes, cold truths, and zero spoilers (unless deserved).",
    },
    {
      user_id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      username: "soapaddict",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      language: "English",
      name: "Jade Williams",
      bio: " Running on drama, snacks, and questionable contestants.I yell at my screen so you don’t have to.Team Messy™ always.",
    },
    {
      user_id: "d4e5f6a7-b8c9-0123-defa-234567890123",
      username: "tellytea",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      language: "English",
      name: "Callum Reid",
      bio: "Reading between the edits and catching what others miss. Game strategy, producer tricks, and cast psychology.Let’s talk about what really happened.",
    },
    {
      user_id: "e5f6a7b8-c9d0-1234-efab-345678901234",
      username: "eastendersforever",
      avatar_url: "https://i.pravatar.cc/150?img=5",
      language: "English",
      name: "Amara Osei",
      bio: "Just a fan who’s way too invested.Laughing, cringing, and commenting in real time.If it’s dramatic, I’m watching.",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#101010" }}>
      <ScrollView
        style={commentStyles.commentsBox}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[globalStyles.sectionTitle, { paddingBottom: 30 }]}>
          {loggedInUser ? "Switch Account" : "Choose Profile"}
        </Text>
        <Text style={[styles.name, { paddingBottom: 30 }]}>
          {loggedInUser
            ? `Logged in as @${loggedInUser.username}`
            : "Not logged in"}
        </Text>
        <View>
          {userAccounts.map((account) => (
            <View key={account.user_id}>
              <UserAccount user={account} />
              <View style={styles.divider} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "#8E8E8E",
    fontSize: 15,
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "#3a3a3a",
    marginVertical: 10,
  },
});

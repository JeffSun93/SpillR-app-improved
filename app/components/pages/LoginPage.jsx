import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/User.jsx";
import UserAccount from "../UserAccount.jsx";
import { commentStyles } from "../../../styles/commentStyles.jsx";
import { globalStyles } from "../../../styles/globalStyles.jsx";

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
    {
      user_id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
      username: "3llasious",
      avatar_url:
        "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Favatars.alphacoders.com%2Favatars%2Fview%2F246845&ved=0CBYQjRxqFwoTCNi-7PXprpMDFQAAAAAdAAAAABAI&opi=89978449",
      language: "English",
      name: "Ella Itopa",
      bio: "If there's a twist coming, I've already clocked it. Forensic rewatcher, timeline nerd, and certified dramatic irony enthusiast.",
    },
    {
      user_id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
      username: "jinsonpj",
      avatar_url:
        "https://64.media.tumblr.com/56f6451c104784d83a4a5c0fcb1cbc73/5ec6447b83c91faa-78/s1280x1920/685468b3b8163deba53421f284cad1b86a7dfff5.jpg",
      language: "English",
      name: "Jinson PJ",
      bio: "Here for the chaos, staying for the villain arc. If you're not rooting for the wrong person at least once, are you even watching?",
    },
    {
      user_id: "b8c9d0e1-f2a3-4567-bcde-678901234567",
      username: "ines1299",
      avatar_url:
        "https://static.wikia.nocookie.net/evangelion/images/2/26/Rei_Eva23_DirectorCut.png/revision/latest?cb=20211210152104&path-prefix=es",
      language: "English",
      name: "Inês Mota",
      bio: "Snacks reviewed, episodes ranked, opinions given unasked. I pause more than I play and I stand by every single decision.",
    },
    {
      user_id: "c9d0e1f2-a3b4-5678-cdef-789012345678",
      username: "ollivander",
      avatar_url:
        "https://i.pinimg.com/736x/4e/15/3d/4e153d9278746b5e3f1b7e2fe58c56ae.jpg",
      language: "English",
      name: "Oliver Feor",
      bio: "Gasping at finales since 2003. I will not be taking questions but I will be posting unhinged live reactions.",
    },
    {
      user_id: "d0e1f2a3-b4c5-6789-defa-890123456789",
      username: "jeff",
      avatar_url: "https://ik.imagekit.io/jxal3dd8u/IMG_8863.jpg",
      language: "English",
      name: "Jeff Sun",
      bio: "Obsessed with why they cast who they cast. Character motivations, casting choices, narrative arcs. This is my sport.",
    },
    {
      user_id: "e1f2a3b4-c5d6-7890-efab-901234567890",
      username: "djSQL",
      avatar_url:
        "https://www.looper.com/img/gallery/sailor-moons-luna-explained/l-intro-1686095791.jpg",
      language: "English",
      name: "Yewen Jin",
      bio: "Phone in hand, eyes on screen, commentary always ready. Live tweeting was made for people like me. Spoil me and we're done.",
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

import ReplyCard from "./ReplyCard";
import Post from "./Post";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const RepliesList = ({ comment_id }) => {
  const fakeReplies = [
    {
      reply_id: "r1",
      comment_id: 2,
      user_id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      username: "soapaddict",
      avatar_url: "https://i.pravatar.cc/150?img=3",
      parent_username: "jazzmine1256",
      body: "For real girl !!!!",
      runtime_seconds: 917,
      created_at: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      reactions_total: 14,
      reactionType_total: {
        angryTotal: 0,
        laughingTotal: 8,
        sadTotal: 0,
        fireTotal: 4,
        deadTotal: 1,
        heartTotal: 1,
      },
    },
    {
      reply_id: "r2",
      comment_id: 2,
      user_id: "d4e5f6a7-b8c9-0123-defa-234567890123",
      username: "tellytea",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      parent_username: "jazzmine1256",
      body: "@ellasious He's such a snake 🐍",
      runtime_seconds: 917,
      created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      reactions_total: 22,
      reactionType_total: {
        angryTotal: 10,
        laughingTotal: 6,
        sadTotal: 0,
        fireTotal: 2,
        deadTotal: 3,
        heartTotal: 1,
      },
    },
    {
      reply_id: "r3",
      comment_id: 2,
      user_id: "e5f6a7b8-c9d0-1234-efab-345678901234",
      username: "eastendersforever",
      avatar_url: "https://i.pravatar.cc/150?img=5",
      parent_username: "jazzmine1256",
      body: "The audacity honestly I cannot",
      runtime_seconds: 917,
      created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      reactions_total: 5,
      reactionType_total: {
        angryTotal: 2,
        laughingTotal: 1,
        sadTotal: 0,
        fireTotal: 1,
        deadTotal: 0,
        heartTotal: 1,
      },
    },
  ];

  return (
    <View style={styles.container}>
      {fakeReplies.map((reply) => (
        <ReplyCard key={reply.reply_id} reply={reply} />
      ))}
      <Post comment_id={comment_id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 8,
    paddingTop: 60,
    overflow: "visible",
  },
});

export default RepliesList;

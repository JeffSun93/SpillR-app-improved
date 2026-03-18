import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function UserResultCard({ user }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/profilepage/[id]",
          params: { id: user.user_id },
        })
      }
    >
      {user.avatar_url ? (
        <Image source={{ uri: user.avatar_url }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initial}>
            {user.name ? user.name[0].toUpperCase() : "?"}
          </Text>
        </View>
      )}
      <Text style={styles.name} numberOfLines={1}>
        {user.name}
      </Text>
      <Text style={styles.username} numberOfLines={1}>
        @{user.username}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 6,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  placeholder: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    color: "white",
    fontSize: 48,
    fontWeight: "600",
  },
  name: {
    color: "white",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
  },
  username: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
});

import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";
import TitleText from "../ui/ShowTitleText";

export default function PollItem({ poll, horizontal = true }) {
  //   const router = useRouter();

  const IMAGE_WIDTH = horizontal ? 140 : 100;
  const IMAGE_HEIGHT = horizontal ? 200 : 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{poll.poll_name}</Text>
      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{poll.field_1}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{poll.field_2}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 120,
    padding: 10,
    marginRight: 5,
    marginTop: 0,
    backgroundColor: "#1B1B1B",
    borderRadius: 8,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    height: 60,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: "#ffffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
});

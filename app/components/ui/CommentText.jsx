import { Text } from "react-native";
import { theme } from "../../../theme";

export default function CommentText({ children }) {
  return (
    <Text
      style={{
        color: theme.color.text,
        fontSize: 12,
        fontWeight: "400",
      }}
    >
      {children}
    </Text>
  );
}

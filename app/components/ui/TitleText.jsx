import { Text } from "react-native";
import { theme } from "../../../theme";

export default function TitleText({ children, style }) {
  return (
    <Text
      style={[
        {
          color: theme.color.text,
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 10,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

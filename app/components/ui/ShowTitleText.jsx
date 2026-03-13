import { Text } from "react-native";
import { theme } from "../../../theme";

export default function ShowTitleText({ children, style }) {
  return (
    <Text
      style={[
        {
          color: theme.color.text,
          fontSize: 14,
          fontWeight: "600",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

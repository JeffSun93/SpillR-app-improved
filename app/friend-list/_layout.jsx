import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { backButton } from "../../styles/BackButton";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerBackground: () => null,
        headerStyle: {
          borderWidth: 0,
          borderColor: "transparent",
        },
        headerBackVisible: false,
        headerLeftContainerStyle: {
          borderWidth: 0,
          borderColor: "transparent",
          backgroundColor: "transparent",
        },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (router.canGoBack()) router.back();
            }}
            style={backButton}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

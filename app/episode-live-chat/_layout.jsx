import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#484848" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) router.back();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

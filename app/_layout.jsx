import { Stack } from "expo-router";
import { UserProvider } from "./context/User";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="tv-show" options={{ headerShown: false }} />

        <Stack.Screen
          name="episode-live-chat"
          options={{ headerShown: false }}
        />
      </Stack>
    </UserProvider>
  );
}

import { Stack } from "expo-router";
import { UserProvider } from "./context/User";

export default function RootLayout() {
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

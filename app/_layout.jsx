import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="tv-show" options={{ headerShown: false }} />

      <Stack.Screen name="episode-live-chat" options={{ headerShown: false }} />
    </Stack>
  );
}

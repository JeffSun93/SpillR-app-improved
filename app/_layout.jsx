import { Stack } from "expo-router";
import { UserProvider } from "../context/User";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";
import FloatingParticleProvider from "../context/FloatingParticle";
import socket from "../socket/connection.js";

export default function RootLayout() {
  useEffect(() => {
    socket.connect();
    console.log(`socket connected!!!!`);
    return () => {
      socket.disconnect();
      console.log("socket deregietered!!!!");
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Agenda: require("../assets/fonts/Agenda.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <FloatingParticleProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="tv-show" options={{ headerShown: false }} />

          <Stack.Screen
            name="episode-live-chat"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="friend-list" options={{ headerShown: false }} />
          <Stack.Screen name="profile-page" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </FloatingParticleProvider>
  );
}

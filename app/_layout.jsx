import { Stack, useRouter, useSegments } from "expo-router";
import { UserProvider, UserContext } from "../context/User";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useEffect, useContext } from "react";
import FloatingParticleProvider from "../context/FloatingParticle";
import socket from "../socket/connection.js";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

function SocketInit() {
  useEffect(() => {
    socket.connect();
    console.log("socket connected!!!!");

    return () => {
      socket.disconnect();
      console.log("socket deregistered!!!!");
    };
  }, []);

  return null;
}

function AuthGuard() {
  const { loggedInUser } = useContext(UserContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inLoginPage = segments[0] === "login";
    if (!loggedInUser && !inLoginPage) {
      router.replace("/login");
    }
  }, [loggedInUser, segments]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Agenda: require("../assets/fonts/Agenda.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) return null;
  return (
    <FloatingParticleProvider>
      <UserProvider>
        <SocketInit />
        <AuthGuard />
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

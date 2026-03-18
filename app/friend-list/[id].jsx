import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams, useNavigation, Stack } from "expo-router";

import FriendList from "../components/FriendList.jsx";

export default function Friends() {
  const { id, friendList } = useLocalSearchParams();
  const friends = JSON.parse(friendList);

  return (
    <View style={{ flex: 1, backgroundColor: "#101010" }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
        }}
      />

      <FriendList friendList={friends} id={id} />
    </View>
  );
}

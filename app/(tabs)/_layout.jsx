import { Tabs } from "expo-router";
import { Image } from "react-native";

import homeIcon from "../../assets/home.png";
import searchIcon from "../../assets/search-normal.png";
import userIcon from "../../assets/user.png";
import notificationIcon from "../../assets/notification-status.png";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          height: 70,
          borderTopWidth: 0,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#fff" : "#9CA3AF",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="searchpage"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={searchIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#fff" : "#9CA3AF",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={notificationIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? "#fff" : "#9CA3AF",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={userIcon}
              style={{
                width: 28,
                height: 28,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 12,
                tintColor: focused ? "#fff" : "#9CA3AF",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

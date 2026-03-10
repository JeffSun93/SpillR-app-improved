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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#484848",
          height: 70,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={homeIcon} style={{ width: 28, height: 28 }} />
          ),
        }}
      />

      <Tabs.Screen
        name="searchpage"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={searchIcon} style={{ width: 28, height: 28 }} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={notificationIcon}
              style={{ width: 28, height: 28 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={userIcon}
              style={{
                width: 28,
                height: 28,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 12,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

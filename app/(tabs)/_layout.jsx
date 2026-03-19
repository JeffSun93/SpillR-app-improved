import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../context/User.jsx";
import homeIcon from "../../assets/home.png";
import searchIcon from "../../assets/search-normal.png";
import userIcon from "../../assets/user.png";
import notificationIcon from "../../assets/notification-status.png";

export default function TabsLayout() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "transparent",
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
              tintColor={focused ? "#fff" : "#9CA3AF"}
              style={{
                width: 28,
                height: 28,
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
              tintColor={focused ? "#fff" : "#9CA3AF"}
              style={{
                width: 28,
                height: 28,
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
              tintColor={focused ? "#fff" : "#9CA3AF"}
              style={{
                width: 28,
                height: 28,
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
              source={{ uri: loggedInUser.avatar_url }}
              // tintColor={focused ? "#fff" : "#9CA3AF"}
              style={{
                width: 28,
                height: 28,
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 14,
                overflow: "hidden",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

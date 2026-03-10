import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="homepage"
        options={{
          title: "Homepage",
        }}
      />

      <Tabs.Screen
        name="tv-show-chat"
        options={{
          title: "TV Chat",
        }}
      />
    </Tabs>
  );
}

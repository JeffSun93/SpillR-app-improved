import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { getTvShowById } from "../../utils/utilsFunctions";
import Dropdown from "../components/Dropdown";
import { Stack } from "expo-router";

export default function TvShowPage() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [show, setShow] = useState(null);

  useEffect(() => {
    async function loadShow() {
      const data = await getTvShowById(id);
      setShow(data);

      navigation.setOptions({
        title: data.name,
        headerStyle: {
          backgroundColor: "#484848", // match your tab bar color
        },
        headerTintColor: "#fff", // back arrow + title color
        headerTitleStyle: {
          fontWeight: "bold",
        },
      });
    }

    loadShow();
  }, [id]);

  if (!show) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{show.name}</Text>
      <View style={styles.paragraph}>
        <Text style={styles.description}>{show.description}</Text>
        <Image source={{ uri: show.tv_show_img_url }} style={styles.image} />
        <Dropdown name={show.name} />
      </View>
    </View>
    <>
      <Stack.Screen options={{ title: show?.name }} />
      <View style={styles.container}>
        <Text style={styles.title}>{show.name}</Text>
        <View style={styles.paragraph}>
          <Text style={styles.description}>{show.description}</Text>
          <Image source={{ uri: show.tv_show_img_url }} style={styles.image} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  image: { width: 120, height: 180, borderRadius: 6, marginBottom: 8 },
  paragraph: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

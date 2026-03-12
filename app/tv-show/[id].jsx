import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { getTvShowById } from "../../utils/utilsFunctions";
import Dropdown from "../components/Dropdown";
import EpisodesList from "../components/EpisodesList";
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
          backgroundColor: "#484848",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      });
    }

    loadShow();
  }, [id]);

  if (!show) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen options={{ title: show?.name }} />
        <View style={styles.container}>
          <Text style={styles.title}>{show.name}</Text>
          <View style={styles.paragraph}>
            <Image
              source={{ uri: show.tv_show_img_url }}
              style={styles.image}
            />
            <Text style={styles.description}>{show.description}</Text>
          </View>
          <Dropdown name={show.name} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  paragraph: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
    flexShrink: 0,
  },

  description: {
    flex: 1, // takes up remaining horizontal space
    flexWrap: "wrap",
  },
});

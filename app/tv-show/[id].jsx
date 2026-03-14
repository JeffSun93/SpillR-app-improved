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
import { cleanText } from "../../utils/cleanText";
import { globalStyles } from "../../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import {
  getSeasonsAndEpisodesByShowName,
  getSeasonsAndEpisodesByShowId,
} from "../../utils/utilsFunctions";

export default function TvShowPage() {
  const { id } = useLocalSearchParams();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [show, setShow] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const showData = await getTvShowById(id);
        setShow(showData);

        navigation.setOptions({
          headerTitle: "",
        });

        const seasonsData = await getSeasonsAndEpisodesByShowId(
          showData.tv_show_id,
        );

        setSeasons(seasonsData.seasons);
      } catch (error) {
        console.log("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (!show || seasons.length === 0) return <Text>Loading...</Text>;

  const description = cleanText(show.description);

  return (
    <View style={[globalStyles.container, { flex: 1, paddingHorizontal: 0 }]}>
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
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.container}>
          <View style={styles.imageContainer}>
            {seasons.length > 0 && (
              <Image
                source={{
                  uri: seasons[0].season_img_url
                    ? seasons[0].season_img_url
                    : seasons[seasons.length - 3]?.season_img_url
                      ? seasons[seasons.length - 3].season_img_url
                      : show.tv_show_img_url
                        ? show.tv_show_img_url
                        : null,
                }}
                style={styles.image}
              />
            )}

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              locations={[0.1, 1]}
              style={styles.overlay}
            >
              <Text style={styles.title}>{show.name}</Text>
              <Text
                style={styles.description}
                numberOfLines={expanded ? undefined : 3}
              >
                {description}
              </Text>

              <Text
                style={styles.readMore}
                onPress={() => setExpanded(!expanded)}
              >
                {expanded ? "Read less" : "Read more"}
              </Text>
            </LinearGradient>
          </View>

          <Dropdown
            name={show.name}
            seasons={seasons}
            tv_show_img_url={show.tv_show_img_url}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 350,
    borderRadius: 0,
    overflow: "hidden",
    margin: 0,
    padding: 0,
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
    // fontFamily: "Inter_600SemiBold",
  },
  description: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: "Inter_400Regular",
  },
  readMore: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});

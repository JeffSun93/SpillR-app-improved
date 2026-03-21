import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { getTvShowById } from "../../utils/utilsFunctions";
import Dropdown from "../components/Dropdown";
import { Stack } from "expo-router";
import { cleanText } from "../../utils/cleanText";
import { globalStyles } from "../../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import {
  getSeasonsAndEpisodesByShowName,
  getSeasonsAndEpisodesByShowId,
  getUserByIdAPI,
  addSubscriptionAPI,
  deleteSubscriptionAPI,
} from "../../utils/utilsFunctions";

import { UserContext } from "../../context/User";

export default function TvShowPage() {
  const { id } = useLocalSearchParams();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [show, setShow] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (!show.tv_show_id || !loggedInUser) return;
    const checkSubscription = async () => {
      try {
        const userData = await getUserByIdAPI(loggedInUser.user_id);
        const already = userData.subscriptions?.some(
          (s) => s.tv_show_id === show.tv_show_id,
        );
        setIsSubscribed(already);
      } catch (err) {
        console.log("subscription check error:", err.response?.data);
      }
    };
    checkSubscription();
  }, [show.tv_show_id]);

  const handleSubscribe = async () => {
    try {
      if (isSubscribed) {
        await deleteSubscriptionAPI(loggedInUser.user_id, show.tv_show_id);
      } else {
        await addSubscriptionAPI(loggedInUser.user_id, show.tv_show_id);
      }
      setIsSubscribed(!isSubscribed);
    } catch (err) {
      console.log("subscribe error:", err.response?.data);
    }
  };

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
              colors={[
                "rgba(16,16,16,0)",
                "rgba(16,16,16,0.6)",
                "rgba(16,16,16,1)",
              ]}
              locations={[0, 0.5, 1]}
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
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                borderColor: isSubscribed ? "#E500FF" : "#d8d7d7",
                backgroundColor: isSubscribed
                  ? "rgba(229,0,255,0.15)"
                  : "rgba(0,0,0,0.4)",
              },
            ]}
            onPress={handleSubscribe}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isSubscribed ? "#E500FF" : "#d8d7d7" },
              ]}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Text>
          </TouchableOpacity>
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
  editButton: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 20,
    marginBottom: -10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.1,
  },
  buttonText: {
    textAlign: "center",
    color: "#2663f4",
    fontSize: 12,
    fontWeight: 300,
  },
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

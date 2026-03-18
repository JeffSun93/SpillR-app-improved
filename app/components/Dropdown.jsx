import { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import EpisodesList from "./EpisodesList";

export default function Dropdown({ name, seasons, tv_show_img_url }) {
  const [selectedSeason, setSelectedSeason] = useState({});
  const [latestSeason, setLatestSeason] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seasons.length > 0) {
      let latestSeason = "";
      latestSeason =
        seasons[seasons.length - 1].episodes.length > 0
          ? seasons[seasons.length - 1]
          : seasons[seasons.length - 2];

      setSelectedSeason(latestSeason);
      setLatestSeason(latestSeason);
    }
  }, [name]);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSelectSeason = (season) => {
    setSelectedSeason(season);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {loading
            ? "Loading seasons..."
            : selectedSeason.season_number > latestSeason?.season_number
              ? `Next Season ${selectedSeason.season_number}`
              : selectedSeason.season_number === latestSeason?.season_number
                ? `Latest Season`
                : `Season ${selectedSeason.season_number}`}
        </Text>
        {/* <Image
          style={styles.dropdownArrow}
          source={require("../../assets/dropdown_arrow.png")}
        /> */}
      </TouchableOpacity>

      {visible && (
        <ScrollView
          style={styles.dropdown}
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingTop: 2, paddingBottom: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {seasons.map((season) => (
            <TouchableOpacity
              key={season.season_id}
              style={styles.dropdownItem}
              onPress={() => handleSelectSeason(season)}
            >
              <Text style={styles.dropdownItem}>
                Season {season.season_number}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <EpisodesList
        selectedSeason={selectedSeason}
        showName={name}
        tv_show_img_url={tv_show_img_url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    width: "100%",
    zIndex: 999,
    marginLeft: 0,
  },
  button: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 30,
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: "#1B1B1B",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },

  dropdownArrow: {
    width: 14,
    height: 14,
    tintColor: "#FFFFFF",
    resizeMode: "contain",
  },

  dropdown: {
    position: "absolute",
    width: "30%",
    top: 45,
    left: 0,
    right: 0,
    marginLeft: 8,
    marginBottom: 8,
    backgroundColor: "#1B1B1B",
    borderRadius: 6,
    paddingVertical: 5,
    zIndex: 1000,
    elevation: 5,
    maxHeight: 350,
  },

  dropdownItem: {
    padding: 8,
    color: "#FFFFFF",
  },
});

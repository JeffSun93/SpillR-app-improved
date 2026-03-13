import { getSeasonsAndEpisodesByShowName } from "../../utils/utilsFunctions";

import { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EpisodesList from "./EpisodesList";

export default function Dropdown({ name }) {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSeasonsAndEpisodes() {
      try {
        setLoading(true);
        const data = await getSeasonsAndEpisodesByShowName(name);

        setSeasons(data.seasons);
        setSelectedSeason(data.seasons[0]);
      } catch (error) {
        console.log("Error loading seasons:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSeasonsAndEpisodes();
  }, []);

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
            : `Season ${selectedSeason.season_number}`}
        </Text>
        <Image
          style={styles.dropdownArrow}
          source={require("../../assets/dropdown_arrow.png")}
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          {seasons.map((season) => (
            <TouchableOpacity
              key={season.season_id}
              style={styles.dropdownItem}
              onPress={() => handleSelectSeason(season)}
            >
              <Text>Season {season.season_number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <EpisodesList selectedSeason={selectedSeason} showName={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#efefef",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 14,
  },

  dropdownArrow: {
    width: 14,
    height: 14,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 6,
    marginTop: 5,
    paddingVertical: 5,
  },

  dropdownItem: {
    padding: 8,
  },
});

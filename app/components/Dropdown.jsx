import { getSeasonsAndEpisodesByShowName } from "../../utils/utilsFunctions";

import { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Dropdown() {
  const [seasons, setSeasons] = useState([{}]); // add loading state (initially appears as Season undefined)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getSeasonsAndEpisodes() {
      const data = await getSeasonsAndEpisodesByShowName("taskmaster");
      console.log(data);
      setSeasons(data.seasons);
      if (data) {
        setLoading(false);
      }
    }

    getSeasonsAndEpisodes();
  }, []);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.buttonText}>
          {loading ? "..." : `Season ${seasons[0].season_number}`}
        </Text>

        <Image
          style={styles.dropdownArrow}
          source={require("../../assets/dropdown_arrow.png")}
        />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          {seasons.map((season) => (
            <Text key={season.season_id} style={styles.dropdownItem}>
              Season {season.season_number}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginLeft: 20,
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

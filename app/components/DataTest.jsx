import { getSeasonsAndEpisodesByShowName } from "../../utils/utilsFunctions";

import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function DataTest() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    async function getSeasons() {
      const data = await getSeasonsAndEpisodesByShowName("taskmaster");
      console.log(data);
      setSeasons(data.seasons);
    }

    getSeasons();
  }, []);

  return (
    <View>
      {seasons.map((season) => (
        <Text key={season.season_number}>{season.season_number}</Text>
      ))}
    </View>
  );
}

import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TvShowPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>TV Show ID: {id}</Text>
    </View>
  );
}

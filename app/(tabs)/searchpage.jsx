import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import SearchBar from "../components/searchBar";
import Trending from "../components/home-page/trending";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setClicked(false)}>
        <View style={{ flex: 1 }}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.results}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                Trending Shows
              </Text>
              <Trending horizontal={false} />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232222",
    paddingHorizontal: 16,
  },
  results: {
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});

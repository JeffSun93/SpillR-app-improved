import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import Trending from "../components/home-page/trending";
import SearchResultCard from "../components/search-page/SearchResultCard";
import { searchTvShowsByName } from "../../utils/utilsFunctions";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchResults, setSearchResults] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchPhrase.length > 1) {
      setLoading(true);
      searchTvShowsByName(searchPhrase)
        .then((data) => setSearchResults(data))
        .finally(() => setLoading(false));
    } else {
      setSearchResults([]);
    }
  }, [searchPhrase]);

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
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item?.tv_show_id?.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => <SearchResultCard show={item} />}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
            />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.results}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "600" }}
                >
                  Trending Shows
                </Text>
                <Trending horizontal={false} />
              </View>
            </ScrollView>
          )}
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

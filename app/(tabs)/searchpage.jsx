import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import Trending from "../components/home-page/trending";
import SearchResultCard from "../components/search-page/SearchResultCard";
import {
  searchLocalTvShows,
  searchExternalTvShows,
} from "../../utils/utilsFunctions";
import { globalStyles } from "../../styles/globalStyles";
import TitleText from "../components/ui/TitleText";
import { color } from "../../theme/color";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (searchPhrase.length > 1) {
      setNotFound(false);
      searchLocalTvShows(searchPhrase).then((localResults) => {
        setSearchResults(localResults);
      });
    } else {
      setSearchResults([]);
      setNotFound(false);
    }
  }, [searchPhrase]);

  async function handleSearchSubmit() {
    if (searchPhrase.length < 2) return;

    setLoading(true);
    setNotFound(false);

    try {
      const localResults = await searchLocalTvShows(searchPhrase);

      if (localResults.length > 0) {
        setSearchResults(localResults);
        return;
      }

      await searchExternalTvShows(searchPhrase);

      const savedResults = await searchLocalTvShows(searchPhrase);

      if (savedResults.length > 0) {
        setSearchResults(savedResults);
      } else {
        setSearchResults([]);
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => (item.tv_show_id || item.id).toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <SearchResultCard show={item} />}
        ListHeaderComponent={
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            onSubmit={handleSearchSubmit}
          />
        }
        ListFooterComponent={
          <View style={{ marginTop: 20 }}>
            {notFound && !loading && <Text>No shows found</Text>}
            <Text style={globalStyles.sectionTitle}>People liked</Text>
            <Trending />
          </View>
        }
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: 20 }}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: "#ffffff",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
});

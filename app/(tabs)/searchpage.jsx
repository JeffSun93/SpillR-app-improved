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
import { globalStyles } from "../../styles/globalStyles";
import TitleText from "../components/ui/TitleText";

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
    <SafeAreaView style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => setClicked(false)}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.tv_show_id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <SearchResultCard show={item} />}
          ListHeaderComponent={
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
          }
          ListFooterComponent={
            <View style={{ marginTop: 20 }}>
              <TitleText>Trending Shows</TitleText>
              <Trending horizontal={false} />
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

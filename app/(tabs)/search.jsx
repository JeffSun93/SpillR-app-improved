import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import SearchBar from "../../components/searchBar";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  return (
    <View style={styles.container}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={styles.results}>
        <Text>Search Page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

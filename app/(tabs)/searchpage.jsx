import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import SearchBar from "../../components/searchBar";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setClicked(false)}>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16, // optional, adds spacing from top if needed
  },
  results: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* Search Icon */}
        <Feather name="search" size={20} color="black" />
        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {/* Cross Icon */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            onPress={() => setSearchPhrase("")}
          />
        )}
      </View>
      {/* Cancel Button */}
      {clicked && (
        <Button
          title="Cancel"
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  searchBar__unclicked: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#e4e5e5",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

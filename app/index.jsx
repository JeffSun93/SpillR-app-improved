import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill the whole screen
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
  },
  text: {
    fontSize: 24, // make text visible
  },
});

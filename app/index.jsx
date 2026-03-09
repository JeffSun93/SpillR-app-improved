import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpillR</Text>
      <Text style={{ marginTop: 10 }}>Trending</Text>
      <View style={styles.card}>
        <Text>CARD!!!</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 5,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
});

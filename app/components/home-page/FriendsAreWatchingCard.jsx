import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../../styles/globalStyles";

export default function FriendsAreWatchingCards() {
  return (
    <View>
      <Text
        style={[
          globalStyles.sectionTitle,
          { marginBottom: 0, paddingBottom: 0, marginTop: 10, paddingLeft: 10 },
        ]}
      >
        Tv-Show
      </Text>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.image}
        ></Image>
        <Text style={styles.cardText}>
          3 friends and 200 others are watching
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 2,
    backgroundColor: "#211F21",
    borderWidth: 0.5,
    borderColor: "#2D2B2E",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 6,
    flexDirection: "row",
    width: 250,
  },
  cardText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "white",
    flexWrap: "wrap",
    fontFamily: "Agenda",
    alignSelf: "center",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
    marginTop: 2,
  },
});

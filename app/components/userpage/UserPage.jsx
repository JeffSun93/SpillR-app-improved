import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function UserPage() {
  return (
    <SafeAreaView style={styles.scrollArea}>
      <ScrollView>
        <View style={styles.pageColor}>
          <View style={styles.headerContainer}>
            <View style={styles.buttonNameContainer}>
              <Text style={styles.username}>Aki</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.handle}>@theesudani</Text>
          </View>
          <View style={styles.imageAndFriendsContainer}>
            <Image
              style={styles.userImage}
              source={require("../../../assets/user.png")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    backgroundColor: "#232222",
  },
  headerContainer: {
    marginTop: 110,
    justifyContent: "flex-start",
  },
  username: {
    paddingLeft: "7.5%",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 0,
  },
  handle: {
    color: "#454545",
    paddingLeft: "7.5%",
    marginTop: 0,
    fontSize: 15,
  },
  buttonNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },

  editButton: {
    borderColor: "#2663f4",
    borderWidth: 1.2,
    borderRadius: 15,
    paddingRight: 40,
    paddingLeft: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#2663f4",
    fontSize: 12,
    fontWeight: 800,
  },
  imageAndFriendsContainer: {
    marginTop: 30,
  },
  userImage: {
    marginLeft: "10%",
    height: 100,
    width: 100,
  },
});

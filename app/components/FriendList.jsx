import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";

import FriendCard from "./FriendCard.jsx";
import { commentStyles } from "../../styles/commentStyles.jsx";

export default function FriendList({ friendList, id }) {
  return (
    <ScrollView
      style={commentStyles.commentsBox}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 150 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[globalStyles.sectionTitle, { paddingBottom: 30 }]}>
        Friends
      </Text>
      <View>
        {friendList.map((friend) => (
          <View key={friend.friends_id}>
            <FriendCard friendObj={friend} userPageID={id} />
            <View style={styles.divider} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#3a3a3a",
    marginVertical: 10,
  },
});

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Trending from "../components/home-page/Trending";
import SearchResultCard from "../components/search-page/SearchResultCard";
import UserResultCard from "../components/search-page/UserResultCard";
import {
  searchLocalTvShows,
  searchExternalTvShows,
  searchLocalUsers,
} from "../../utils/utilsFunctions";
import { globalStyles } from "../../styles/globalStyles";

export default function Search() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("shows");

  useEffect(() => {
    if (searchPhrase.length > 1) {
      setNotFound(false);
      if (activeTab === "shows") {
        searchLocalTvShows(searchPhrase).then((results) => {
          setSearchResults(results);
        });
      } else {
        searchLocalUsers(searchPhrase).then((results) => {
          setSearchResults(results);
          if (results.length === 0) setNotFound(true);
        });
      }
    } else {
      setSearchResults([]);
      setNotFound(false);
    }
  }, [searchPhrase, activeTab]);

  function handleTabSwitch(tab) {
    setActiveTab(tab);
    setSearchResults([]);
    setNotFound(false);
  }

  async function handleSearchSubmit() {
    if (activeTab === "users" || searchPhrase.length < 2) return;

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
        keyExtractor={(item) =>
          (item.tv_show_id || item.user_id || item.id).toString()
        }
        numColumns={2}
        key={activeTab}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) =>
          activeTab === "shows" ? (
            <SearchResultCard show={item} />
          ) : (
            <UserResultCard user={item} />
          )
        }
        ListHeaderComponent={
          <View>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              onSubmit={handleSearchSubmit}
            />
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "shows" && styles.activeTab]}
                onPress={() => handleTabSwitch("shows")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "shows" && styles.activeTabText,
                  ]}
                >
                  Shows
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === "users" && styles.activeTab]}
                onPress={() => handleTabSwitch("users")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "users" && styles.activeTabText,
                  ]}
                >
                  Users
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: 20 }}>
            {notFound && !loading && (
              <Text style={{ color: "white" }}>
                {activeTab === "shows" ? "No shows found" : "No users found"}
              </Text>
            )}
            {activeTab === "shows" && (
              <>
                <Text style={globalStyles.sectionTitle}>People liked</Text>
                <Trending />
              </>
            )}
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
  tabs: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 4,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
  },
  activeTab: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: 14,
  },
  activeTabText: {
    color: "#000000",
  },
});

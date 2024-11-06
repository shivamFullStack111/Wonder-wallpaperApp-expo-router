import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Touchable,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackgroundProvider from "../components/BackgroundProvider";
import BottomSheet from "react-native-simple-bottom-sheet";
import { colors, primary } from "../utils";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import ModalForShareAndDownload from "../components/ModalForShareAndDownload";
import { TouchableHighlight } from "react-native";
import { transform } from "typescript";
import { BlurView } from "expo-blur";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";

export const categories = [
  "All",
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

const Home = () => {
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isMoreFetching, setIsMoreFetching] = useState(false);
  const [isNotOnTop, setisNotOnTop] = useState(false);
  const scrollRef = useRef();
  const [showModal, setshowModal] = useState(false);
  const [ActiveData, setActiveData] = useState(null);

  const getImages = async (page, addMore = false) => {
    let baseUrl =
      "https://pixabay.com/api/?key=46894657-46b36a9228f3db8d2e204be40";
    let url = `${baseUrl}&page=${page}`;

    if (category && category !== "All") {
      url += `&category=${category}`;
    }
    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }
    try {
      const res = await axios.get(url);
      setImages((prevImages) =>
        addMore ? [...prevImages, ...res.data.hits] : res.data.hits
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const search = useCallback(() => {
    if (searchQuery.length < 3) return;
    const time = setTimeout(() => {
      getImages(1, false);
    }, 500);
    return () => clearTimeout(time);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      search();
    } else if (searchQuery.length === 0) {
      getImages(1);
    }
  }, [searchQuery, search]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getImages(1);
    setRefreshing(false);
  }, [category]);

  useEffect(() => {
    getImages(pageNumber);
  }, [category]);

  return (
    <>
      {showModal && (
        <ModalForShareAndDownload
          ActiveData={ActiveData}
          setshowModal={setshowModal}
        />
      )}
      <BackgroundProvider>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.headerCon}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={require("../images/logo.png")}
            />
            <Ionicons
              name="reorder-three-outline"
              size={40}
              style={{ marginRight: 5 }}
              color={primary}
            />
          </View>

          {/* Search Bar */}
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchCon}
          />

          {/* Categories */}
          <View style={styles.categoryContainer}>
            <FlatList
              data={categories}
              horizontal
              style={{ padding: 10 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Text
                  onPress={() => setCategory(item)}
                  style={{
                    ...styles.catText,
                    backgroundColor: item === category ? primary : "#fae6ed",
                    color: item === category ? "white" : "black",
                  }}
                >
                  {item}
                </Text>
              )}
            />
          </View>

          {/* Render Images */}
          <View style={styles.imageContainer}>
            <FlatList
              ref={scrollRef}
              onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y > 0) {
                  setisNotOnTop(true);
                } else {
                  setisNotOnTop(false);
                }
              }}
              data={images}
              onEndReached={async () => {
                setIsMoreFetching(true);
                await getImages(pageNumber + 1, true);
                setPageNumber((prev) => prev + 1);
                setIsMoreFetching(false);
              }}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Card
                  setActiveData={setActiveData}
                  setshowModal={setshowModal}
                  item={item}
                />
              )}
            />
            {isMoreFetching && (
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                color={primary}
                size={35}
              />
            )}
          </View>

          {/* go to top button  */}

          {isNotOnTop && (
            <Animated.View
              entering={FadeInRight.duration(500)}
              exiting={FadeOutRight.duration(500)}
            >
              <TouchableOpacity
                onPress={() =>
                  scrollRef.current.scrollToOffset({
                    offset: 0,
                    animated: true,
                  })
                }
                style={{
                  position: "absolute",
                  zIndex: 50,
                  bottom: 60,
                  right: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: primary,
                  borderRadius: 100,
                  width: 60,
                  height: 60,
                }}
              >
                <Ionicons name="chevron-up" size={30} color="white" />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Bottom Sheet */}
          {/* <BottomSheet isOpen={false}>
            {(onScrollEndDrag) => (
              <ScrollView onScrollEndDrag={onScrollEndDrag}>
                {[...Array(10)].map((_, index) => (
                  <View key={`${index}`} style={styles.listItem}>
                    <Text>{`List Item ${index + 1}`}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </BottomSheet> */}
        </View>
      </BackgroundProvider>
    </>
  );
};

export default Home;

const Card = ({ item, setshowModal, setActiveData }) => {
  const height = item.imageHeight > item.imageWidth ? 250 : 150;

  return (
    <Pressable
      onPress={() => {
        setshowModal(true);
        setActiveData(item);
      }}
      style={styles.cardContainer}
    >
      <Image
        style={{ width: "100%", height, borderRadius: 15 }}
        source={{ uri: item.previewURL }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerCon: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 300,
  },
  searchCon: {
    borderWidth: 1,
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
  },
  catText: {
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 80,
  },
  imageContainer: {
    paddingBottom: 50,
    flex: 1,
  },
  cardContainer: {
    width: "50%",
    alignSelf: "center",
    padding: 4,
  },
});

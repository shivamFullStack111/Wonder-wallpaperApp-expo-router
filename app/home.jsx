import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BackgroundProvider from "../components/BackgroundProvider";
import BottomSheet from "react-native-simple-bottom-sheet";
import { colors, primary } from "../utils";

import { Drawer, Searchbar } from "react-native-paper";
import { FlatList } from "react-native";
import axios from "axios";
// https://pixabay.com/api/videos/?key=46894657-46b36a9228f3db8d2e204be40
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

const home = () => {
  const [active, setActive] = React.useState("first");
  const [category, setcategory] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [images, setimages] = useState([]);
  const [resfreshing, setresfreshing] = useState(false);

  const getImages = async (ispagenumber) => {
    let baseUrl =
      "https://pixabay.com/api/?key=46894657-46b36a9228f3db8d2e204be40&order=latest";

    let url = baseUrl;

    if (ispagenumber) {
      url = url + "&page=" + Math.ceil(Math.random() * 20);
    }
    if (category) {
      url = url + "&category=" + category;
    }
    if (searchQuery) {
      url = url + "&q=" + searchQuery;
    }
    try {
      const res = await axios.get(url);
      setimages(res?.data?.hits);
    } catch (error) {
      console.log(error.message);
    }
  };

  const search = () => {
    try {
      if (searchQuery.length < 3) return;
      const time = setTimeout(() => {
        getImages(false);
      }, 500);

      return () => clearTimeout(time);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      search();
    }
    if (searchQuery.length === 0) {
      getImages();
    }
  }, [search]);
  const handleRefresh = () => {
    try {
      setresfreshing(true);

      getImages(true);
      setresfreshing(false);
    } catch (error) {
      console.log(error.message);
      setresfreshing(false);
    }
  };

  useEffect(() => {
    getImages(false);
  }, [category]);
  return (
    <BackgroundProvider>
      <View style={{ flex: 1 }}>
        {/* header  */}
        <View style={styles.headerCon}>
          <Image
            resizeMode="cover" // ya 'contain'
            style={styles.image}
            source={require("../images/logo.png")}
          ></Image>
          <Ionicons
            name="reorder-three-outline"
            size={40}
            style={{ marginRight: 5 }}
            color={primary}
          />
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={(t) => {
            setSearchQuery(t);
          }}
          value={searchQuery}
          style={styles.searchCon}
        />

        {/* categories  */}

        <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>
          <FlatList
            data={categories}
            // keyExtractor={(k) => k}
            horizontal
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => {
              return (
                <Text
                  onPress={() => {
                    setcategory(item.item);
                  }}
                  style={{
                    ...styles.catText,
                    backgroundColor:
                      item.item == category ? primary : "#fae6ed",
                    color: item.item == category ? "white" : "black",
                  }}
                >
                  {item.item}
                </Text>
              );
            }}
          />
        </View>

        {/* render images  */}
        <FlatList
          refreshing={resfreshing}
          onRefresh={() => handleRefresh()}
          data={images}
          StickyHeaderComponent={() => <Text>hii</Text>}
          numColumns={2}
          keyExtractor={(i) => i.id + Date.now() * Math.random() * 2048488838}
          renderItem={({ item, index }) => {
            return <Card index item={item} />;
          }}
        />
        <BottomSheet isOpen={false}>
          {(onScrollEndDrag) => (
            <ScrollView onScrollEndDrag={onScrollEndDrag}>
              {[...Array(10)].map((_, index) => (
                <View key={`${index}`} style={styles.listItem}>
                  <Text>{`List Item ${index + 1}`}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </BottomSheet>
      </View>

      {/* searchbar  */}
      {/* <View style={styles.searchCon}></View> */}
    </BackgroundProvider>
  );
};

export default home;

export const Card = ({ item, index }) => {
  let height;

  if (item.imageHeight > item.imageWidth) {
    height = 250;
  }
  if (item.imageHeight < item.imageWidth) {
    height = 150;
  }

  return (
    <View
      style={{
        width: "50%",
        alignSelf: "center",
        padding: 4,
      }}
    >
      <Image
        style={{ width: "100%", height: height, borderRadius: 15 }}
        source={{ uri: item.previewURL }}
      />
    </View>
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
  scrollCon: {
    width: "100%",
  },
  catText: {
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 80,
    color: "black",
  },
});

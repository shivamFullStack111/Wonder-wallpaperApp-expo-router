import React from "react";
import BackgroundProvider from "../components/BackgroundProvider";
import { Image, StyleSheet, Text, View } from "react-native";
import { background } from "../utils";
import { LinearGradient } from "expo-linear-gradient";

const welcomeScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: background }}>
        <LinearGradient
          colors={["transparent", "#000"]}
          style={{ ...StyleSheet.absoluteFill, zIndex: 40 }}
          start={{ x: 0, y: 0 }}
        />
        <Image style={styles.image} source={require("../images/leaf.jpg")} />
        <View style={styles.boxCon}>
          <Text style={styles.text1}>Welcome to Wonder!</Text>
          <Text style={styles.text2}>Make Look Awesome ⭐</Text>
        </View>
      </View>
    </>
  );
};

export default welcomeScreen;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  boxCon: {
    bottom: 50,
    width: "100%",
    position: "absolute",
    zIndex: 50,
    alignItems: "center",
  },
  text1: {
    fontSize: 30,
    color: "white",
    fontWeight: "700",
  },
  text2: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
});

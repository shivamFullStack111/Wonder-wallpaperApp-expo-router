import React from "react";
import BackgroundProvider from "../components/BackgroundProvider";
import { Image, StyleSheet, Text, View } from "react-native";
import { background, primary } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
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
          <Animated.Text
            entering={FadeInDown.duration(600)}
            style={styles.text1}
          >
            Welcome to Wonder!
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(100).duration(600)}
            style={styles.text2}
          >
            Make Look Awesome ⭐
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.btncon}
          >
            <TouchableOpacity
              onPress={() => router.push("home")}
              style={styles.btnToch}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                Explore
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
    marginBottom: 20,
    marginTop: 6,
  },
  btncon: {
    backgroundColor: primary,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    height: 50,
  },
  btnToch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

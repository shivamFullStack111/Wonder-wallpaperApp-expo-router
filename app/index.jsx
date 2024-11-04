import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundProvider from "../components/BackgroundProvider";
import { background } from "../utils";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/welcomeScreen");
    }, 0);
  }, []);
  return (
    <BackgroundProvider>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../images/logo.png")} />
        <Text style={styles.comText}>Wonder</Text>
      </View>
      <ActivityIndicator
        size={40}
        color="white"
        style={styles.ActivityIndicator}
      />
    </BackgroundProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    backgroundColor: background,
  },
  comText: {
    fontSize: 26,
    fontWeight: "600",
    color: "white",
  },
  ActivityIndicator: {
    bottom: 60,
  },
});

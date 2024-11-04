import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { background } from "../utils";

const BackgroundProvider = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      {children}
    </SafeAreaView>
  );
};

export default BackgroundProvider;

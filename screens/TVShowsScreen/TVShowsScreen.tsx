import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TVShowNavigationBar from "../../components/TVShowNavigationBar/TVShowNavigationBar";
import "firebase/auth";

export default function TVShowsScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get("window").width,
      }}
    >
      <TVShowNavigationBar />
      <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
    </SafeAreaView>
  );
}

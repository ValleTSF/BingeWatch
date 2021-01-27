import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "firebase/auth";
import MyWatchlistNavigationBar from "../../components/MyWatchlistNavigationBar";

export default function TVShowsScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get("window").width,
      }}
    >
      <MyWatchlistNavigationBar />
      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
}

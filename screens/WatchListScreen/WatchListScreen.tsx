import * as React from "react";
import { Dimensions, StatusBar } from "react-native";
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
      <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
    </SafeAreaView>
  );
}

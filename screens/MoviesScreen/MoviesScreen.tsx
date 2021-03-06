import { Dimensions } from "react-native";
import { Text, View } from "native-base";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieNavigationBar from "../../components/MovieNavigationBar/MovieNavigationBar";

export default function MoviesScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get("window").width,
      }}
    >
      <MovieNavigationBar />
      <StatusBar backgroundColor="#b9042c" />
    </SafeAreaView>
  );
}

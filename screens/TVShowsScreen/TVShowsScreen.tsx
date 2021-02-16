import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TVShowNavigationBar from "../../components/TVShowNavigationBar/TVShowNavigationBar";
import "firebase/auth";

/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
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
      <StatusBar backgroundColor="#b9042c" />
    </SafeAreaView>
  );
}

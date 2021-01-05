import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailsScreen from "../screens/MoviesScreen/MovieDetailsScreen";
import TVShowsScreen from "../screens/TVShowsScreen/TVShowsScreen";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import { ScreenRoute } from "./constants";
import LinkingConfiguration from "./LinkingConfiguration";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../screens/DrawerContent";
import WatchListScreen from "../screens/WatchListScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

const Drawer = createDrawerNavigator();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={RootNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenRoute.ROOT} component={MoviesScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name={ScreenRoute.MOVIE_DETAILS}
        component={MovieDetailsScreen}
      />
      <Stack.Screen
        name={ScreenRoute.TV_SHOWS_SCREEN}
        component={TVShowsScreen}
      />
      <Stack.Screen
        name={ScreenRoute.MY_WATCH_LIST}
        component={WatchListScreen}
      />
    </Stack.Navigator>
  );
}

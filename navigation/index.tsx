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
import TVShowDetailsScreen from "../screens/TVShowsScreen/TVShowDetailsScreen";
import LandingScreen from "../screens/LandingScreen/LandingScreen";
import LoginScreen from "../screens/LandingScreen/LoginScreen";
import SignUpScreen from "../screens/LandingScreen/SignUpScreen";
import MovieSearchScreen from "../components/MovieNavigationBar/MovieSearchScreen";
import TvShowSearchScreen from "../components/TVShowNavigationBar/TvShowSearchScreen";
import TvShowSelectedGenreScreen from "../components/TVShowNavigationBar/TvShowSelectedGenreScreen";
import MovieSelectedGenreScreen from "../components/MovieNavigationBar/MovieSelectedGenreScreen";
import TvShowWatchlistDetails from "../screens/WatchListScreen/TvShowWatchlistDetails/TvShowWatchlistDetails";

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

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenRoute.LANDING_SCREEN}
        component={LandingScreen}
      />
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
      <Stack.Screen
        name={ScreenRoute.TV_SHOW_DETAILS}
        component={TVShowDetailsScreen}
      />
      <Stack.Screen
        name={ScreenRoute.MOVIE_SEARCH_SCREEN}
        component={MovieSearchScreen}
      />
      <Stack.Screen
        name={ScreenRoute.TV_SHOW_SEARCH_SCREEN}
        component={TvShowSearchScreen}
      />
      <Stack.Screen
        name={ScreenRoute.SELECTED_GENRE_TV_SHOW_SCREEN}
        component={TvShowSelectedGenreScreen}
      />
      <Stack.Screen
        name={ScreenRoute.SELECTED_GENRE_MOVIE_SCREEN}
        component={MovieSelectedGenreScreen}
      />
      <Stack.Screen
        name={ScreenRoute.TV_SHOW_WATCHLIST_DETAILS_SCREEN}
        component={TvShowWatchlistDetails}
      />
      <Stack.Screen name={ScreenRoute.MOVIES_SCREEN} component={MoviesScreen} />
      <Stack.Screen name={ScreenRoute.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={ScreenRoute.SIGNUP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
}

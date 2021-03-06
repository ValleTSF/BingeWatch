import { MovieResult, TVShowResult } from "./api/types";
import { ScreenRoute } from "./navigation/constants";

export type RootStackParamList = {
  [ScreenRoute.MOVIES_SCREEN]: undefined;
  [ScreenRoute.MOVIE_DETAILS]: { movie: MovieResult };
  [ScreenRoute.TV_SHOWS_SCREEN]: undefined;
  [ScreenRoute.MY_WATCH_LIST]: undefined;
  [ScreenRoute.TV_SHOW_DETAILS]: { show: TVShowResult };
  [ScreenRoute.LANDING_SCREEN]: undefined;
  [ScreenRoute.SIGNUP_SCREEN]: undefined;
  [ScreenRoute.LOGIN_SCREEN]: undefined;
  [ScreenRoute.MOVIE_SEARCH_SCREEN]: undefined;
  [ScreenRoute.TV_SHOW_SEARCH_SCREEN]: undefined;
  [ScreenRoute.SELECTED_GENRE_TV_SHOW_SCREEN]: undefined;
  [ScreenRoute.SELECTED_GENRE_MOVIE_SCREEN]: undefined;
  [ScreenRoute.TV_SHOW_WATCHLIST_DETAILS_SCREEN]: undefined;
  NotFound: undefined;
  Movies: undefined;
};

export type BottomTabParamList = {
  Movies: undefined;
  TVShows: undefined;
};

export type TabOneParamList = {
  MoviesScreen: undefined;
  TabOneScreen: undefined;
  TabTwoScreen: undefined;
};

export type TabTwoParamList = {
  TVShowsScreen: undefined;
};

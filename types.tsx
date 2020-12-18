import { MovieResult } from "./api/types";
import { ScreenRoute } from "./navigation/constants";

export type RootStackParamList = {
  [ScreenRoute.ROOT]: undefined;
  [ScreenRoute.MOVIE_DETAILS]: { movie: MovieResult };
  NotFound: undefined;
  Movies: undefined;
};

export type BottomTabParamList = {
  Movies: undefined;
  TVShows: undefined;
};

export type TabOneParamList = {
  MoviesScreen: undefined;
};

export type TabTwoParamList = {
  TVShowsScreen: undefined;
};

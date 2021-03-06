import axios from "axios";
import {
  MovieGenres,
  PopularMovieResult,
  PopularTVShowResult,
  TVShowDetails,
  TVShowSeasonDetails,
} from "./types";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
});

export const getPopularMovies = () => {
  return api.get<PopularMovieResult>(
    "popular?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&page=1"
  );
};

export const getPopularTVShows = () => {
  return api.get<PopularTVShowResult>(
    "https://api.themoviedb.org/3/tv/popular?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&page=1"
  );
};

export const getTVShowDetails = (showId: any) => {
  return api.get<TVShowDetails>(
    "https://api.themoviedb.org/3/tv/" +
      showId +
      "?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US"
  );
};

export const getTVShowSeasonDetails = (showId: any, seasonNumber: any) => {
  return api.get<TVShowSeasonDetails>(
    "https://api.themoviedb.org/3/tv/" +
      showId +
      "/season/" +
      seasonNumber +
      "?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US"
  );
};

export const getMovieSearch = (searchInput: any) => {
  return api.get<PopularMovieResult>(
    "https://api.themoviedb.org/3/search/movie?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&query=" +
      searchInput +
      "&page=1&include_adult=false"
  );
};

export const getTvShowSearch = (searchInput: any) => {
  return api.get<PopularTVShowResult>(
    "https://api.themoviedb.org/3/search/tv?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&page=1&query=" +
      searchInput +
      "&page=1&include_adult=false"
  );
};

export const getMovieGenres = () => {
  return api.get<MovieGenres>(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US"
  );
};

export const getTvShowGenres = () => {
  return api.get<MovieGenres>(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US"
  );
};

export const getTvShowsOnGenre = (genreId: number) => {
  return api.get<PopularTVShowResult>(
    "http://api.themoviedb.org/3/discover/tv?api_key=fe33c49063178a9259f21b178b1a7cda&sort_by=popularity.desc&with_genres=" +
      genreId +
      "&page=1"
  );
};

export const getMoviesOnGenre = (genreId: number) => {
  return api.get<PopularMovieResult>(
    "https://api.themoviedb.org/3/discover/movie?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
      genreId
  );
};

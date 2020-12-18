import axios from "axios";
import { PopularMovieResult } from "./types";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
});

export const getPopularMovies = () => {
  return api.get<PopularMovieResult>(
    "popular?api_key=fe33c49063178a9259f21b178b1a7cda&language=en-US&page=1"
  );
};

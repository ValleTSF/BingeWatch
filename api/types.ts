export type PopularMovieResult = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type FirebaseMovieList = {
  FirebaseMovies: FirebaseMovie[];
};

export type FirebaseMovie = {
  backdrop: string;
  overview: string;
  release: string;
  title: string;
};

export enum OriginalLanguage {
  De = "de",
  En = "en",
  Fr = "fr",
  Ko = "ko",
}

// Generated by https://quicktype.io

export type PopularTVShowResult = {
  page: number;
  results: TVShowResult[];
  total_pages: number;
  total_results: number;
};

export type TVShowResult = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

// Generated by https://quicktype.io

export type TVShowDetails = {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: null;
};

export type Genre = {
  id: number;
  name: string;
};

export type TEpisodeToAir = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: null | string;
  vote_average: number;
  vote_count: number;
};

export type Network = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// Generated by https://quicktype.io

export type TVShowSeasonDetails = {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
};

export type Episode = {
  air_date: string;
  episode_number: number;
  crew: Crew[];
  guest_stars: Crew[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: null | string;
  vote_average: number;
  vote_count: number;
};

export type Crew = {
  job?: Job;
  department?: Department;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  character?: string;
  order?: number;
};

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  Directing = "Directing",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export enum Job {
  AdditionalDirectorOfPhotography = "Additional Director of Photography",
  AdditionalStoryboarding = "Additional Storyboarding",
  AnimationDirector = "Animation Director",
  AssistantDirector = "Assistant Director",
  AssistantDirectorOfPhotography = "Assistant Director of Photography",
  Director = "Director",
  KeyAnimation = "Key Animation",
  Lyricist = "Lyricist",
  PropDesigner = "Prop Designer",
  SecondUnitDirector = "Second Unit Director",
  ShortStory = "Short Story",
  Storyboard = "Storyboard",
  SupervisingAnimationDirector = "Supervising Animation Director",
  The2DArtist = "2D Artist",
  The3DAnimator = "3D Animator",
  Writer = "Writer",
}

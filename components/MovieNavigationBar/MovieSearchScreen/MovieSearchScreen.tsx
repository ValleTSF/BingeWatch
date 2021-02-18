import React, { useState } from "react";
import {
  Dimensions,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header, Card } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMovieSearch } from "../../../api/movieApi";
import { PopularMovieResult } from "../../../api/types";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoute } from "../../../navigation/constants";
import * as S from "./styled";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function MovieSearchScreen() {
  const [data, setData] = useState<PopularMovieResult>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const navigation = useNavigation();

  const onChangeSearch = async (searchText: String) => {
    if (!searchText) {
      setData({ page: 0, results: [], total_pages: 0, total_results: 0 });
    }
    const { data } = await getMovieSearch(searchText);
    setData(data);
  };

  const renderMovies = () => {
    const { results } = data;
    const filteredResults = results.filter(
      (m) => m.poster_path !== null && m.backdrop_path !== null
    );
    return (
      <FlatList
        numColumns={2}
        style={{
          width: Dimensions.get("window").width,
        }}
        keyExtractor={(movie) => movie.id.toString()}
        data={filteredResults}
        renderItem={({ item }) => {
          const onPressMovie = () => {
            navigation.navigate(ScreenRoute.MOVIE_DETAILS, { movie: item });
          };
          return (
            <TouchableOpacity onPress={onPressMovie}>
              <Card
                style={{
                  backgroundColor: "#18181b",
                  marginBottom: 50,
                  marginRight: 5,
                  marginLeft: 5,
                }}
                transparent
              >
                <Image
                  style={{ height: 278, width: 185 }}
                  source={{
                    uri: "http://image.tmdb.org/t/p/w185" + item.poster_path,
                  }}
                />
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: "#18181b",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Header
          style={{
            backgroundColor: "#b9042c",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            onChangeText={onChangeSearch}
            autoFocus
            placeholder="Search Movies..."
            placeholderTextColor="#d1d1d4"
            style={{ color: "white" }}
          ></TextInput>
        </Header>
        <S.Container>{renderMovies()}</S.Container>
      </ScrollView>
      <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
    </SafeAreaView>
  );
}

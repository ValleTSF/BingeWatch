import * as React from "react";
import { useState, useEffect } from "react";
import { Image, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "../../components/Themed";
import { getPopularMovies } from "../../api/movieApi";
import * as S from "./styled";
import { PopularMovieResult } from "../../api/types";
import { Card } from "native-base";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoute } from "../../navigation/constants";

export default function PopularMoviesScreen() {
  const [data, setData] = useState<PopularMovieResult>();
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getPopularMovies();
    setData(data);
  };

  if (!data) {
    return (
      <S.Container>
        <Text>Loading</Text>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          width: Dimensions.get("window").width,
        }}
        keyExtractor={(movie) => movie.id.toString()}
        data={data.results}
        renderItem={({ item }) => {
          const onPressMovie = () => {
            navigation.navigate(ScreenRoute.MOVIE_DETAILS, { movie: item });
          };
          return (
            <TouchableOpacity onPress={onPressMovie}>
              <Card
                style={{
                  backgroundColor: "#18181b",
                  margin: 5,
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
    </S.Container>
  );
}

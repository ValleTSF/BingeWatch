import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getPopularTVShows } from "../../api/movieApi";
import { PopularTVShowResult } from "../../api/types";
import { Card } from "native-base";
import { useNavigation } from "@react-navigation/native";
import * as S from "./styled";
import { ScreenRoute } from "../../navigation/constants";

export default function PopularTVShowsScreen() {
  const [data, setData] = useState<PopularTVShowResult>();

  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getPopularTVShows();
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
        style={{
          width: Dimensions.get("window").width,
        }}
        keyExtractor={(show) => show.id.toString()}
        data={data.results}
        renderItem={({ item }) => {
          //   const onPressMovie = () => {
          //     navigation.navigate(ScreenRoute.MOVIE_DETAILS, { movie: item });
          //   };
          return (
            <TouchableOpacity>
              <Card
                style={{
                  backgroundColor: "#18181b",
                  marginBottom: 50,
                  marginRight: 10,
                  marginLeft: 10,
                }}
                transparent
              >
                <S.MovieTitle>{item.name}</S.MovieTitle>
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

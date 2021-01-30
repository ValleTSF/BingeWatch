import { useNavigation } from "@react-navigation/native";
import { Card } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, View, TouchableOpacity, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { getTvShowGenres, getTvShowsOnGenre } from "../../api/movieApi";
import { MovieGenres, PopularTVShowResult } from "../../api/types";
import { ScreenRoute } from "../../navigation/constants";
import * as S from "./styled";

export default function TvShowGenreScreen() {
  const [data, setData] = useState<MovieGenres>();
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getTvShowGenres();
    setData(data);
  };

  const renderGenres = () => {
    const { genres } = data;
    return (
      <FlatList
        numColumns={1}
        keyExtractor={(genre) => genre.id.toString()}
        data={genres}
        renderItem={(item) => {
          const onGenrePress = () => {
            navigation.navigate(ScreenRoute.SELECTED_GENRE_TV_SHOW_SCREEN, {
              genre: item.item.id,
              name: item.item.name,
            });
          };
          return (
            <TouchableOpacity key={item.item.id} onPress={onGenrePress}>
              <View
                style={{
                  margin: 12,
                  borderRadius: 20,
                  backgroundColor: "#b9042c",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <S.GenreText>{item.item.name}</S.GenreText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  if (!data) {
    return (
      <S.Container>
        <S.Header>Loading</S.Header>
      </S.Container>
    );
  }

  return (
    <ScrollView>
      <S.Container>{renderGenres()}</S.Container>
    </ScrollView>
  );
}

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getMovieGenres } from "../../api/movieApi";
import { MovieGenres } from "../../api/types";
import { ScreenRoute } from "../../navigation/constants";
import * as S from "./styled";

export default function MovieGenreScreen() {
  const [data, setData] = useState<MovieGenres>();
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getMovieGenres();
    setData(data);
  };

  const renderGenres = () => {
    const { genres } = data;
    return (
      <FlatList
        numColumns={1}
        style={{}}
        keyExtractor={(genre) => genre.id.toString()}
        data={genres}
        renderItem={(item) => {
          const onGenrePress = () => {
            navigation.navigate(ScreenRoute.SELECTED_GENRE_MOVIE_SCREEN, {
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

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Card, Container, Header } from "native-base";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTvShowsOnGenre } from "../../../api/movieApi";
import { PopularTVShowResult } from "../../../api/types";
import { ScreenRoute } from "../../../navigation/constants";
import * as S from "../styled";

export default function TvShowSelectedGenreScreen(props: any) {
  const { genre, name } = props.route.params;
  const [data, setData] = useState<PopularTVShowResult>();
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const onPressSearch = () => {
    navigation.navigate(ScreenRoute.TV_SHOW_SEARCH_SCREEN);
  };

  const init = async () => {
    const { data } = await getTvShowsOnGenre(genre);
    setData(data);
  };

  const renderTvShows = () => {
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
        keyExtractor={(show) => show.id.toString()}
        data={filteredResults}
        renderItem={({ item }) => {
          const onPressShow = () => {
            navigation.navigate(ScreenRoute.TV_SHOW_DETAILS, { show: item });
          };
          return (
            <TouchableOpacity onPress={onPressShow}>
              <Card
                style={{
                  backgroundColor: "#18181b",
                  marginBottom: 5,
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

  if (!data) {
    return (
      <SafeAreaView
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
          <S.Header>{name}</S.Header>
          <TouchableOpacity style={{ top: 15 }} onPress={onPressSearch}>
            <Feather name="search" size={28} color="#d1d1d1" />
          </TouchableOpacity>
        </Header>
        <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Header
        style={{
          backgroundColor: "#b9042c",
          justifyContent: "space-between",
        }}
      >
        <S.Header>{name}</S.Header>
        <TouchableOpacity style={{ top: 15 }} onPress={onPressSearch}>
          <Feather name="search" size={28} color="#d1d1d1" />
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <S.Container>{renderTvShows()}</S.Container>
      </ScrollView>
      <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
    </SafeAreaView>
  );
}

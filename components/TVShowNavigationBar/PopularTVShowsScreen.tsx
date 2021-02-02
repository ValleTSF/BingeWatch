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
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          width: Dimensions.get("window").width,
        }}
        keyExtractor={(show) => show.id.toString()}
        data={data.results}
        renderItem={({ item }) => {
          const onPressShow = () => {
            navigation.navigate(ScreenRoute.TV_SHOW_DETAILS, { show: item });
          };
          return (
            <TouchableOpacity onPress={onPressShow}>
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

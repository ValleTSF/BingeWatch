import { RouteProp } from "@react-navigation/native";
import { Tab, TabHeading, Tabs, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import {
  getTVShowDetails,
  getTVShowSeasonDetails,
} from "../../../api/movieApi";
import { Season, TVShowDetails, TVShowSeasonDetails } from "../../../api/types";
import { ScreenRoute } from "../../../navigation/constants";
import { RootStackParamList } from "../../../types";
import * as S from "./styled";
import TVShowSeasonTab from "./TVShowSeasonTab";

type Props = {
  route: RouteProp<RootStackParamList, ScreenRoute.TV_SHOWS_SCREEN>;
};

const TVShowDetailsScreen: React.FC<Props> = (props) => {
  const [data, setData] = useState<TVShowDetails>();
  const [seasonDetails, setSeasonDetails] = useState<TVShowSeasonDetails>();
  const { show } = props.route.params;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getTVShowDetails(show.id);
    setData(data);
  };

  if (!data) {
    return (
      <S.Container>
        <Text>Loading</Text>
      </S.Container>
    );
  }

  //   const getTVShowSeasonDetailsData = async (seasonNumber: number) => {
  //     const { data: seasonDetails } = await getTVShowSeasonDetails(
  //       data.id,
  //       seasonNumber
  //     );
  //     setSeasonDetails(seasonDetails);
  //   };

  const renderGenres = () => {
    return data.genres.map((o) => {
      return <S.GenreText style={{ color: "white" }}>{o.name}</S.GenreText>;
    });
  };

  const renderSeasonTabs = () => {
    return data.seasons.map((s) => {
      //   getTVShowSeasonDetailsData(s.season_number);
      return (
        <Tab
          key={s.season_number}
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>{s.season_number}</Text>
            </TabHeading>
          }
        >
          <TVShowSeasonTab seasonNumber={s.season_number} showId={data.id} />
        </Tab>
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#18181b",
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          width: Dimensions.get("window").width,
        }}
      >
        <Image
          style={{ height: 281, width: 500 }}
          source={{
            uri: "http://image.tmdb.org/t/p/w500" + data.backdrop_path,
          }}
        />
        <Text
          style={{
            color: "white",
            position: "absolute",
            top: 210,
            left: 10,
            fontSize: 30,
          }}
        >
          {data.name}
        </Text>
        {renderGenres()}
        <Text
          style={{
            fontSize: 20,
            top: 20,
            left: 20,
            color: "#b9042c",
          }}
        >
          Synposis
        </Text>
        <Text
          style={{
            margin: 20,
            color: "white",
          }}
        >
          {show.overview}
        </Text>
        <Text
          style={{
            fontSize: 20,

            left: 20,
            color: "#b9042c",
          }}
        >
          IMDB
        </Text>
        <Text
          style={{
            left: 20,
            color: "white",
          }}
        >
          {data.vote_average}
        </Text>
        <S.Header>Seasons</S.Header>
        <Tabs style={{ marginTop: 20 }}>{renderSeasonTabs()}</Tabs>
      </ScrollView>
    </View>
  );
};

export default TVShowDetailsScreen;

import { RouteProp } from "@react-navigation/native";
import { auth, firestore } from "firebase";
import { Tab, TabHeading, Tabs, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getTVShowDetails,
  getTVShowSeasonDetails,
} from "../../../api/movieApi";
import { TVShowDetails } from "../../../api/types";
import { ScreenRoute } from "../../../navigation/constants";
import { RootStackParamList } from "../../../types";
import * as S from "./styled";
import TVShowSeasonTab from "./TVShowSeasonTab";

type Props = {
  route: RouteProp<RootStackParamList, ScreenRoute.TV_SHOWS_SCREEN>;
};

const TVShowDetailsScreen: React.FC<Props> = (props) => {
  const user: firebase.User = auth().currentUser;
  const watchlistRef = firestore().collection("Watchlist");
  const { email } = user;
  const [data, setData] = useState<TVShowDetails>();
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
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          backgroundColor: "#18181b",
        }}
      ></View>
    );
  }

  const renderGenres = () => {
    return data.genres.map((o) => {
      return (
        <S.GenreText key={o.id} style={{ color: "white", top: 10 }}>
          {o.name}
        </S.GenreText>
      );
    });
  };

  async function handleAddToWatchList() {
    const watchListSnapshot = await watchlistRef
      .where("userId", "==", email)
      .get();
    const watchlistId = watchListSnapshot.docs[0].id;
    const documentRef = watchlistRef.doc(watchlistId);

    data.seasons.forEach(async (s) => {
      let season = {
        [s.season_number]: {},
      };
      let episodesList: {
        episodeNumber: number;
        episodeName: string;
        season: number;
      }[] = [];
      const { data: seasonData } = await getTVShowSeasonDetails(
        data.id,
        s.season_number
      );
      const { episodes } = seasonData;
      const seasonEpisodes = episodes.filter(
        (e) => e.season_number === s.season_number
      );

      seasonEpisodes.forEach((e) => {
        const episodeObject = {
          episodeNumber: e.episode_number,
          episodeName: e.name,
          season: e.season_number,
          imdb: e.vote_average,
          date: e.air_date,
          overview: e.overview,
          id: e.id,
          stillPath: e.still_path,
        };
        episodesList.push(episodeObject);
        season[s.season_number] = episodesList;
      });

      documentRef.set(
        {
          tvShows: {
            [data.name]: {
              title: data.name,
              overview: show.overview,
              backdrop: "http://image.tmdb.org/t/p/w500" + data.backdrop_path,
              seasons: season,
            },
          },
        },

        { merge: true }
      );
    });
  }

  const renderSeasonTabs = () => {
    return data.seasons.map((s) => {
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
      <StatusBar hidden translucent backgroundColor="transparent" />
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
        <S.AddToWatchListButton onPress={handleAddToWatchList}>
          <S.ButtonText>+</S.ButtonText>
        </S.AddToWatchListButton>
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
        <Tabs style={{ marginTop: 15 }}>{renderSeasonTabs()}</Tabs>
      </ScrollView>
    </View>
  );
};

export default TVShowDetailsScreen;

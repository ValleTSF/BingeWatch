import { Container, Header } from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar, Dimensions, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as S from "./styled";
import firebase from "firebase/app";
import { Episode } from "../../../api/types";
import Swipeout from "react-native-swipeout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TvShowWatchlistDetails(props: any) {
  let startingWatchlist: any[] = [];
  const watchlistRef = firebase.firestore().collection("Watchlist");
  const [splice, setSplice] = useState(false);
  const [tvShowWatchlist, setTvShowWatchlist] = useState([]);
  const [watchlistSnapshot, setWatchlistSnapshot] = useState<any>();
  const user: firebase.User = firebase.auth().currentUser;
  const { email } = user;
  const { showId, showTitle } = props.route.params;

  useEffect(() => {
    init();
  }, []);

  const convertDataToArray = (tvShows: any) => {
    const convertedTvShowList = [];
    for (let tvShow in tvShows) {
      let newShow = {
        backdrop: tvShows[tvShow].backdrop,
        overview: tvShows[tvShow].overview,
        release: tvShows[tvShow].release,
        title: tvShows[tvShow].title,
        id: tvShows[tvShow].id,
        seasons: tvShows[tvShow].seasons,
      };
      convertedTvShowList.push(newShow);
    }
    startingWatchlist = convertedTvShowList;
  };

  const init = () => {
    generateData();
  };

  async function generateData() {
    const watchlistSnapshot = await watchlistRef
      .where("userId", "==", email)
      .get();

    setWatchlistSnapshot(watchlistSnapshot);
    convertDataToArray(watchlistSnapshot.docs[0].data().tvShows);

    setTvShowWatchlist(startingWatchlist);
  }

  const renderEpisodesForSeason = (season: any[]) => {
    return season.map((e) => {
      const handleOnPressWatched = () => {
        const documentRef = watchlistRef.doc(watchlistSnapshot.docs[0].id);
        const FieldValue = firebase.firestore.FieldValue;
        documentRef.set(
          {
            tvShows: {
              [showTitle]: {
                seasons: {
                  [e.season]: FieldValue.arrayRemove({
                    date: e.date,
                    episodeName: e.episodeName,
                    episodeNumber: e.episodeNumber,
                    id: e.id,
                    imdb: e.imdb,
                    overview: e.overview,
                    season: e.season,
                    stillPath: e.stillPath,
                  }),
                },
              },
            },
          },
          { merge: true }
        );
        season.splice(season.indexOf(e), 1);
        setSplice(!splice);
      };

      const swipeButtons = [
        {
          component: (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <MaterialCommunityIcons name="eye" size={40} color="#18181b" />
            </View>
          ),
          backgroundColor: "#18dd22",
          onPress: handleOnPressWatched,
        },
      ];

      return (
        <Swipeout
          autoClose={true}
          right={swipeButtons}
          backgroundColor={"transparent"}
        >
          <S.Card key={e.episodeNumber}>
            <View>
              <Image
                style={{ height: 80, width: 120 }}
                source={{
                  uri: "http://image.tmdb.org/t/p/w200" + e.stillPath,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 17,
                  marginLeft: "1%",
                }}
              >
                {e.episodeName}
              </Text>
              <Text style={{ flex: 1, color: "white", marginLeft: "1%" }}>
                Episode: {e.episodeNumber}
              </Text>
            </View>
          </S.Card>
        </Swipeout>
      );
    });
  };

  const renderData = () => {
    const tvShow = tvShowWatchlist.filter((s) => s.id === showId);
    const { seasons } = tvShow[0];
    let seasonList: any[] = [];

    Object.keys(seasons).forEach((seasonNumber: any) => {
      seasonList.push(seasons[seasonNumber]);
    });

    return seasonList.map((s) => {
      console.log("s", s.length);
      if (s.length < 1) {
        return <View></View>;
      }
      return (
        <View style={{ marginTop: 10, marginBottom: 50, flex: 1 }}>
          <View style={{ marginLeft: "3%" }}>
            <S.Header>Season {s[0].season}</S.Header>
          </View>

          {renderEpisodesForSeason(s)}
        </View>
      );
    });
  };

  if (tvShowWatchlist.length < 1) {
    return (
      <SafeAreaView>
        <Header style={{ backgroundColor: "#b9042c" }}></Header>
        <ScrollView
          style={{
            backgroundColor: "#18181b",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        ></ScrollView>
        <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#18181b",
        width: Dimensions.get("window").width,
      }}
    >
      <Header style={{ backgroundColor: "#b9042c" }}>
        <S.Header>{showTitle}</S.Header>
      </Header>
      <ScrollView>{renderData()}</ScrollView>
      <StatusBar backgroundColor="#b9042c" barStyle="dark-content" />
    </SafeAreaView>
  );
}

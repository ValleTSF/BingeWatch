import React, { useEffect, useState } from "react";
import { Container, Header, Tab, Tabs, TabHeading, Text } from "native-base";
import * as S from "./styled";
import MovieWatchlistTab from "./MovieWatchlistTab";
import TVShowWatchlistTab from "./TvShowWatchlistTab";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

export default function MyWatchlistNavigationBar() {
  const user: firebase.User = firebase.auth().currentUser;
  const { email } = user;
  const watchlistRef = firebase.firestore().collection("Watchlist");
  const [movies, setMovies] = useState();
  const [tvShows, setTvShows] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getWatchlists();
    });
    return unsubscribe;
  }, [navigation]);

  const getWatchlists = async () => {
    const watchlistSnapshot = await watchlistRef
      .where("userId", "==", email)
      .get();
    setMovies(watchlistSnapshot.docs[0].data().movies);
    setTvShows(watchlistSnapshot.docs[0].data().tvShows);
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#b9042c" }}>
        <S.Header>Watchlist</S.Header>
      </Header>
      <Tabs locked>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>Movies</Text>
            </TabHeading>
          }
        >
          <MovieWatchlistTab movies={movies} />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>TV-Shows</Text>
            </TabHeading>
          }
        >
          <TVShowWatchlistTab tvShows={tvShows} />
        </Tab>
      </Tabs>
    </Container>
  );
}

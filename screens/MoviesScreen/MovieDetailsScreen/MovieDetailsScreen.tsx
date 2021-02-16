import { RouteProp } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { Dimensions, Image, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenRoute } from "../../../navigation/constants";
import { RootStackParamList } from "../../../types";
import "firebase/firestore";
import * as S from "./styled";
import firebase from "firebase/app";
import { StatusBar } from "expo-status-bar";

type Props = {
  route: RouteProp<RootStackParamList, ScreenRoute.MOVIE_DETAILS>;
};

const MovieDetailsScreen: React.FC<Props> = (props) => {
  const user: firebase.User = firebase.auth().currentUser;
  const watchlistRef = firebase.firestore().collection("Watchlist");
  const { email } = user;
  const { movie } = props.route.params;

  async function handleAddToWatchList() {
    const watchListSnapshot = await watchlistRef
      .where("userId", "==", email)
      .get();
    const watchlistId = watchListSnapshot.docs[0].id;
    const documentRef = watchlistRef.doc(watchlistId);
    documentRef.set(
      {
        movies: {
          [movie.title]: {
            title: movie.title,
            overview: movie.overview,
            backdrop: "http://image.tmdb.org/t/p/w500" + movie.backdrop_path,
            release: movie.release_date,
          },
        },
      },
      { merge: true }
    );
    ToastAndroid.showWithGravity(
      "Added to Watchlist!",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

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
        contentContainerStyle={{
          width: Dimensions.get("window").width,
          flexShrink: 1,
        }}
      >
        <Image
          style={{ height: 281, width: 500 }}
          source={{
            uri: "http://image.tmdb.org/t/p/w500" + movie.backdrop_path,
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
          {movie.title}
        </Text>
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
          {movie.overview}
        </Text>
        <Text
          style={{
            fontSize: 20,

            left: 20,
            color: "#b9042c",
          }}
        >
          Released
        </Text>
        <Text
          style={{
            left: 20,
            color: "white",
          }}
        >
          {movie.release_date}
        </Text>
      </ScrollView>
    </View>
  );
};

export default MovieDetailsScreen;

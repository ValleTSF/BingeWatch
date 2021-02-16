import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import "react-native-gesture-handler";
import Swipeout from "react-native-swipeout";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MovieWatchlistTab(props: any) {
  let startingWatchlist: any[] = [];
  const [movieWatchlist, setMovieWatchlist] = useState([]);
  const [watchlistSnapshot, setWatchlistSnapshot] = useState<any>();
  const [splicedObject, setSplicedObject] = useState([]);
  const user: firebase.User = firebase.auth().currentUser;
  const { email } = user;
  const watchlistRef = firebase.firestore().collection("Watchlist");

  useEffect(() => {
    init();
  }, [props]);

  const init = () => {
    const { movies } = props;
    getWatchlistSnapshot();
    convertDataToArray(movies);
    setMovieWatchlist(startingWatchlist);
  };

  const sortMovieList = () => {
    movieWatchlist.sort((a, b) => a.title.localeCompare(b.title));
  };

  const getWatchlistSnapshot = async () => {
    setWatchlistSnapshot(await watchlistRef.where("userId", "==", email).get());
  };

  const convertDataToArray = (movies: any) => {
    const convertedMovieList = [];
    for (let movie in movies) {
      let newMovie = {
        backdrop: movies[movie].backdrop,
        overview: movies[movie].overview,
        release: movies[movie].release,
        title: movies[movie].title,
      };
      convertedMovieList.push(newMovie);
    }
    startingWatchlist = convertedMovieList;
  };

  const renderMovieList = () => {
    sortMovieList();
    return movieWatchlist.map((m) => {
      const handleOnPressDelete = () => {
        const documentRef = watchlistRef.doc(watchlistSnapshot.docs[0].id);
        const FieldValue = firebase.firestore.FieldValue;
        documentRef.set(
          {
            movies: {
              [m.title]: FieldValue.delete(),
            },
          },
          { merge: true }
        );
        setSplicedObject(movieWatchlist.splice(movieWatchlist.indexOf(m), 1));
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
          onPress: handleOnPressDelete,
        },
      ];
      return (
        <Swipeout
          autoClose={true}
          right={swipeButtons}
          backgroundColor={"#18181b"}
        >
          <View key={m.title} style={{ marginTop: 10, flexDirection: "row" }}>
            <Image
              style={{ height: 113, width: 150 }}
              source={{
                uri: m.backdrop,
              }}
            />
            <View>
              <Text
                style={{
                  flex: 1,
                  color: "white",
                  marginLeft: 10,
                  fontSize: 17,
                }}
              >
                {m.title}
              </Text>
              <Text style={{ flex: 1, color: "white", marginLeft: 10 }}>
                Release: {m.release}
              </Text>
            </View>
          </View>
        </Swipeout>
      );
    });
  };

  if (movieWatchlist.length < 1) {
    return (
      <View
        style={{
          backgroundColor: "#18181b",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      ></View>
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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          width: Dimensions.get("window").width,
        }}
      >
        {renderMovieList()}
      </ScrollView>
    </View>
  );
}

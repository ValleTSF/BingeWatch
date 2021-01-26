import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import "react-native-gesture-handler";
import Swipeout from "react-native-swipeout";
import "firebase/firestore";
import "firebase/auth";
import { auth, firestore } from "firebase";

export default function TvShowWatchlistTab(props: any) {
  let startingWatchlist: any[] = [];
  const [tvShowWatchlist, setTvShowWatchlist] = useState([]);
  const [watchlistSnapshot, setWatchlistSnapshot] = useState();
  const [splicedObject, setSplicedObject] = useState([]);
  const user: firebase.User = auth().currentUser;
  const { email } = user;
  const watchlistRef = firestore().collection("Watchlist");

  useEffect(() => {
    init();
  }, [props]);

  const init = () => {
    const { tvShows } = props;
    getWatchlistSnapshot();
    convertDataToArray(tvShows);
    setTvShowWatchlist(startingWatchlist);
  };

  const sortMovieList = () => {
    tvShowWatchlist.sort((a, b) => a.title.localeCompare(b.title));
  };

  const getWatchlistSnapshot = async () => {
    setWatchlistSnapshot(await watchlistRef.where("userId", "==", email).get());
  };

  const convertDataToArray = (tvShows: any) => {
    const convertedTvShowList = [];
    for (let tvShow in tvShows) {
      let newShow = {
        backdrop: tvShows[tvShow].backdrop,
        overview: tvShows[tvShow].overview,
        release: tvShows[tvShow].release,
        title: tvShows[tvShow].title,
      };
      convertedTvShowList.push(newShow);
    }
    startingWatchlist = convertedTvShowList;
  };

  const renderMovieList = () => {
    sortMovieList();
    return tvShowWatchlist.map((s) => {
      const handleOnPressDelete = () => {
        const documentRef = watchlistRef.doc(watchlistSnapshot.docs[0].id);
        const FieldValue = firestore.FieldValue;
        documentRef.set(
          {
            tvShows: {
              [s.title]: FieldValue.delete(),
            },
          },
          { merge: true }
        );
        setSplicedObject(tvShowWatchlist.splice(tvShowWatchlist.indexOf(s), 1));
      };

      const swipeButtons = [
        {
          text: "Delete",
          color: "white",
          backgroundColor: "#b9042c",
          onPress: handleOnPressDelete,
        },
      ];
      return (
        <Swipeout
          autoClose={true}
          right={swipeButtons}
          backgroundColor={"#18181b"}
        >
          <View key={s.title} style={{ marginTop: 10, flexDirection: "row" }}>
            <Image
              style={{ height: 113, width: 150 }}
              source={{
                uri: s.backdrop,
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
                {s.title}
              </Text>
            </View>
          </View>
        </Swipeout>
      );
    });
  };

  if (tvShowWatchlist.length < 1) {
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
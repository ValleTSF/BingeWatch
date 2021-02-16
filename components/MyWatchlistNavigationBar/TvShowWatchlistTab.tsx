import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import "react-native-gesture-handler";
import Swipeout from "react-native-swipeout";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoute } from "../../navigation/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TvShowWatchlistTab(props: any) {
  let startingWatchlist: any[] = [];
  const [tvShowWatchlist, setTvShowWatchlist] = useState([]);
  const [watchlistSnapshot, setWatchlistSnapshot] = useState<any>();
  const [splicedObject, setSplicedObject] = useState([]);
  const user: firebase.User = firebase.auth().currentUser;
  const { email } = user;
  const watchlistRef = firebase.firestore().collection("Watchlist");
  const navigation = useNavigation();

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
        id: tvShows[tvShow].id,
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
        const FieldValue = firebase.firestore.FieldValue;
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

      const handleOnPressEpisodes = () => {
        navigation.navigate(ScreenRoute.TV_SHOW_WATCHLIST_DETAILS_SCREEN, {
          showId: s.id,
          showTitle: s.title,
        });
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
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={40}
                color="#18181b"
              />
            </View>
          ),
          backgroundColor: "#dd1818",
          onPress: handleOnPressDelete,
        },
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
              <MaterialCommunityIcons
                name="movie-edit"
                size={40}
                color="#18181b"
              />
            </View>
          ),
          backgroundColor: "#184ddd",
          onPress: handleOnPressEpisodes,
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

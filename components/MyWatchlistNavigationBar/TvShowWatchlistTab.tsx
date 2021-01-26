import React from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import "react-native-gesture-handler";

export default function TvShowWatchlistTab(props: any) {
  const { tvShows } = props;

  const convertDataToArray = () => {
    const showList = [];
    for (let show in tvShows) {
      let newShow = {
        backdrop: tvShows[show].backdrop,
        overview: tvShows[show].overview,
        release: tvShows[show].release,
        title: tvShows[show].title,
      };

      showList.push(newShow);
    }
    return showList;
  };

  console.log();

  const renderMovieList = () => {
    const tvShows = convertDataToArray();
    return tvShows.map((s) => {
      return (
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
        {renderMovieList()}
      </ScrollView>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getTVShowSeasonDetails } from "../../../api/movieApi";
import { TVShowSeasonDetails } from "../../../api/types";

export default function TVShowSeasonTab(props: any) {
  const [data, setData] = useState<TVShowSeasonDetails>();
  const { seasonNumber, showId } = props;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await getTVShowSeasonDetails(showId, seasonNumber);
    setData(data);
  };

  const renderEpisodes = () => {
    return data.episodes.map((e) => {
      return (
        <View
          key={e.episode_number}
          style={{ marginTop: 10, flexDirection: "row" }}
        >
          <Image
            style={{ height: 113, width: 150 }}
            source={{
              uri: "http://image.tmdb.org/t/p/w200" + e.still_path,
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
              {e.name}
            </Text>
            <Text style={{ flex: 1, color: "white", marginLeft: 10 }}>
              Episode: {e.episode_number}
            </Text>
            <Text style={{ flex: 1, color: "white", marginLeft: 10 }}>
              Date: {e.air_date}
            </Text>
            <Text style={{ flex: 1, color: "white", marginLeft: 10 }}>
              IMDB: {e.vote_average}
            </Text>
          </View>
        </View>
      );
    });
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

  return (
    <View style={{ flex: 1, backgroundColor: "#18181b" }}>
      <ScrollView style={{ flex: 1 }}>{renderEpisodes()}</ScrollView>
    </View>
  );
}

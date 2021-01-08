import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
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
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <Image
            key={e.episode_number}
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
      <View style={{ backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>Loading!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView style={{ flex: 1 }}>{renderEpisodes()}</ScrollView>
    </View>
  );
}
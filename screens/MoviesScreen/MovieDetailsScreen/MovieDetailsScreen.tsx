import { RouteProp } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenRoute } from "../../../navigation/constants";
import { RootStackParamList } from "../../../types";

type Props = {
  route: RouteProp<RootStackParamList, ScreenRoute.MOVIE_DETAILS>;
};

const MovieDetailsScreen: React.FC<Props> = (props) => {
  const { movie } = props.route.params;
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

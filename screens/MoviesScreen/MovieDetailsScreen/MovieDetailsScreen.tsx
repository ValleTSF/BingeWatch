import { RouteProp } from "@react-navigation/native";
import { Text, View } from "native-base";
import React from "react";
import { ScreenRoute } from "../../../navigation/constants";
import { RootStackParamList } from "../../../types";

type Props = {
  route: RouteProp<RootStackParamList, ScreenRoute.MOVIE_DETAILS>;
};

const MovieDetailsScreen: React.FC<Props> = (props) => {
  props.route.params.movie;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{props.route.params.movie.title}</Text>
    </View>
  );
};

export default MovieDetailsScreen;

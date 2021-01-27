import React from "react";
import { Container, Header, Tab, Tabs, TabHeading, Text } from "native-base";
import PopularTVShowsScreen from "./PopularTVShowsScreen";
import * as S from "./styled";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoute } from "../../navigation/constants";

export default function TVShowNavigationBar() {
  const navigation = useNavigation();

  const onPressSearch = () => {
    navigation.navigate(ScreenRoute.TV_SHOW_SEARCH_SCREEN);
  };
  return (
    <Container>
      <Header
        style={{ backgroundColor: "#b9042c", justifyContent: "space-between" }}
      >
        <S.Header>TV-Shows</S.Header>
        <TouchableOpacity style={{ top: 15 }} onPress={onPressSearch}>
          <Feather name="search" size={28} color="#d1d1d1" />
        </TouchableOpacity>
      </Header>
      <Tabs>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>Popular</Text>
            </TabHeading>
          }
        >
          <PopularTVShowsScreen />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>Genre</Text>
            </TabHeading>
          }
        ></Tab>
      </Tabs>
    </Container>
  );
}

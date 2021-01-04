import React from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Right,
  Button,
  Left,
} from "native-base";
import PopularMoviesScreen from "./PopularMoviesScreen";
import * as S from "./styled";
import { DrawerActions } from "@react-navigation/native";

export default function MovieNavigationBar(props) {
  return (
    <Container>
      <Header style={{ backgroundColor: "#b9042c" }}>
        <Left>
          <Button transparent onPress={handleBurgerOnPress}>
            <Icon name="menu" />
          </Button>
        </Left>
        <S.Header>Movies</S.Header>
      </Header>
      <Tabs>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#880421" }}>
              <Text>Popular</Text>
            </TabHeading>
          }
        >
          <PopularMoviesScreen />
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

const handleBurgerOnPress = () => {
  props.navigation.dispatch(DrawerActions.openDrawer());
};

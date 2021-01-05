import React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Button,
  Left,
} from "native-base";
import PopularTVShowsScreen from "./PopularTVShowsScreen";
import * as S from "./styled";

export default function TVShowNavigationBar() {
  return (
    <Container>
      <Header style={{ backgroundColor: "#b9042c" }}>
        <S.Header>TV-Shows</S.Header>
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

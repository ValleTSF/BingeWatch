import React from "react";
import { Container, Header, Tab, Tabs, TabHeading, Text } from "native-base";
import PopularMoviesScreen from "./PopularMoviesScreen";
import * as S from "./styled";

export default function MovieNavigationBar() {
  return (
    <Container>
      <Header style={{ backgroundColor: "#b9042c" }}>
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

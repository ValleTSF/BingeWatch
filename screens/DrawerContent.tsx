// @ts-nocheck
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Title, Drawer } from "react-native-paper";
import { ScreenRoute } from "../navigation/constants";
import firebase from "firebase/app";
import "firebase/firestore";

export function DrawerContent(props: any) {
  const user: firebase.User = firebase.auth().currentUser;

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.navigation.navigate(ScreenRoute.LANDING_SCREEN);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Title style={styles.title}>{user.email}</Title>

              <View style={{ marginLeft: 15, flexDirection: "column" }}></View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <Drawer.Item
              onPress={() => {
                props.navigation.navigate(ScreenRoute.MOVIES_SCREEN);
              }}
              icon="movie"
              label="Movies"
            ></Drawer.Item>
            <Drawer.Item
              onPress={() => {
                props.navigation.navigate(ScreenRoute.TV_SHOWS_SCREEN);
              }}
              icon="television"
              label="TV-shows"
            ></Drawer.Item>
            <Drawer.Item
              onPress={() => {
                props.navigation.navigate(ScreenRoute.MY_WATCH_LIST);
              }}
              icon="eye"
              label="My Watchlist"
            ></Drawer.Item>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          onPress={handleSignOut}
          icon="logout"
          label="Sign Out"
        ></Drawer.Item>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

import * as React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { ScreenRoute } from "../navigation/constants";

export function DrawerContent(props: any) {

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://pbs.twimg.com/profile_images/732604136085200896/Ip4YzXfT.jpg",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Ben Affleck</Title>
                <Caption style={styles.caption}>@BenAffleckWasTaken</Caption>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Title style={styles.title}>Watch List</Title>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  16
                </Paragraph>
                <Caption style={styles.caption}>Movies</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  4
                </Paragraph>
                <Caption style={styles.caption}>TV-shows</Caption>
              </View>
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
              label="My Watch List"
            ></Drawer.Item>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item icon="logout" label="Sign Out"></Drawer.Item>
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

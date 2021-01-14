import { Video } from "expo-av";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import * as S from "../styled";

export default function LoginScreen() {
  const { height } = Dimensions.get("screen");
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Video
        source={require("../assets/background.mp4")}
        rate={1.0}
        volume={0}
        isMuted={true}
        resizeMode={"cover"}
        shouldPlay
        isLooping
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          bottom: height * 0.04,
        }}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 300, height: 60 }}
        />
      </View>
    </View>
  );
}

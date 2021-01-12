import React from "react";
import { View, Text, Image, Dimensions, Button } from "react-native";
import { Video } from "expo-av";
import * as S from "./styled";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LoginScreen() {
  const { height } = Dimensions.get("screen");

  const handleSignIn = () => {
    console.log("Sign in!");
  };

  const handleSignUp = () => {
    console.log("Sign up!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Video
        source={require("./assets/background.mp4")}
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
          bottom: height * 0.05,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 300, height: 60 }}
        />
      </View>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <S.LogInButton>
          <S.ButtonText>Log In</S.ButtonText>
        </S.LogInButton>
        <S.SignUpButton>
          <S.ButtonText>Sign up</S.ButtonText>
        </S.SignUpButton>
      </View>
    </View>
  );
}

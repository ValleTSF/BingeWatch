import { Video } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as S from "../styled";
import { TouchableOpacity } from "react-native-gesture-handler";
import "firebase/auth";
import { auth } from "firebase";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoute } from "../../../navigation/constants";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const { height } = Dimensions.get("screen");
  const { control, handleSubmit, errors } = useForm<FormData>();

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const onSubmit = (data: FormData) => {
    console.log("Submit!", data);
    const { email, password } = data;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate(ScreenRoute.MOVIES_SCREEN);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",

          bottom: height * 0.04,
        }}
      >
        <View style={{ marginLeft: 50, marginRight: 50, marginTop: 100 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Email</Text>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required." }}
            render={(props) => (
              <TextInput
                {...props}
                onChangeText={(value) => {
                  props.onChange(value);
                }}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            )}
          />
        </View>
        <View style={{ marginLeft: 50, marginRight: 50, marginTop: 15 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Password</Text>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required." }}
            render={(props) => (
              <TextInput
                {...props}
                secureTextEntry={true}
                onChangeText={(value) => {
                  props.onChange(value);
                }}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            )}
          />
        </View>
        <View style={{ marginLeft: 50 }}>
          <TouchableOpacity>
            <Text style={{ color: "white" }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 50,
            marginRight: 50,
          }}
        >
          <S.LogInButton onPress={handleSubmit(onSubmit)}>
            <S.ButtonText>Log In</S.ButtonText>
          </S.LogInButton>
        </View>
      </View>
    </View>
  );
}

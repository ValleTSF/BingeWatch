// @refresh reset
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDy96Usj0mqQQ5L1bBv2ub8N_iyUNLJ94U",
  authDomain: "bingewatch-12aad.firebaseapp.com",
  projectId: "bingewatch-12aad",
  storageBucket: "bingewatch-12aad.appspot.com",
  messagingSenderId: "247936588447",
  appId: "1:247936588447:web:bd5f580d51abdd0ecbe0aa",
  measurementId: "G-H8KT90PE6D",
};
console.log("initializing Firebase");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

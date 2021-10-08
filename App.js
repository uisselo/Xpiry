import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/auth/login";
import AppStack from "./app/navigation/appStack";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./app/db/config";
db();

export default () => {
  let [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user ? true : false);
    });
    return authListener;
  });
  return (
    <NavigationContainer>
      {isLoggedIn == false ? <Login /> : <AppStack />}
    </NavigationContainer>
  );
};

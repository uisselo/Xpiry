import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/auth/login";
import AppStack from "./app/navigation/appStack";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./app/db/config";
db();

export default () => {
  let [fontsLoaded] = useFonts({
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_700Bold,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user ? true : false);
    });
    return authListener;
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <NavigationContainer>
        {isLoggedIn == false ? <Login /> : <AppStack />}
      </NavigationContainer>
    );
};

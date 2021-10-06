import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app/navigation/appStack";
import AuthStack from "./app/navigation/authStack";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./app/db/config";
db();

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user ? true : false);
    });
    return authListener;
  });
  return (
    <NavigationContainer>
      {isLoggedIn == false ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

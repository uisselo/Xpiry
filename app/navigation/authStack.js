import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppStack from "./appStack";

// screens
import loginScreen from "../screens/auth/login";
import userName from "../screens/auth/userName";

const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={loginScreen} />
      <Stack.Screen name="UserName" component={userName} />
      <Stack.Screen name="Main" component={AppStack} />
    </Stack.Navigator>
  );
};

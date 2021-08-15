import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import homeScreen from "./app/screens/homeScreen";
import all from "./app/screens/categories/all";
import expired from "./app/screens/categories/expired";
import food from "./app/screens/categories/food";
import cosmetics from "./app/screens/categories/cosmetics";
import medicine from "./app/screens/categories/medicine";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <Text>Welcome</Text>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="All" component={all} />
        <Stack.Screen name="Expired" component={expired} />
        <Stack.Screen name="Food" component={food} />
        <Stack.Screen name="Cosmetics" component={cosmetics} />
        <Stack.Screen name="Medicine" component={medicine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

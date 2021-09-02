import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

// screens
import homeScreen from "./app/screens/homeScreen";
import dashboard from "./app/screens/dashboard";
import journal from "./app/screens/journal";
import about from "./app/screens/about";
import all from "./app/screens/categories/all";
import expired from "./app/screens/categories/expired";
import food from "./app/screens/categories/food";
import cosmetics from "./app/screens/categories/cosmetics";
import medicine from "./app/screens/categories/medicine";
import addItem from "./app/screens/addItem";
import page1 from "./app/screens/journal pages/page1";
import page2 from "./app/screens/journal pages/page2";
import page3 from "./app/screens/journal pages/page3";
import { Text } from "react-native";

const HomeStack = createStackNavigator();
const JournalStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// home screen
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={homeScreen} />
      <HomeStack.Screen name="All" component={all} />
      <HomeStack.Screen name="Expired" component={expired} />
      <HomeStack.Screen name="Food" component={food} />
      <HomeStack.Screen name="Cosmetics" component={cosmetics} />
      <HomeStack.Screen name="Medicine" component={medicine} />
      <HomeStack.Screen name="AddItem" component={addItem} />
    </HomeStack.Navigator>
  );
};

// journal screen
const JournalStackScreen = () => {
  return (
    <JournalStack.Navigator screenOptions={{ headerShown: false }}>
      <JournalStack.Screen name="JournalScreen" component={journal} />
      <JournalStack.Screen name="Page1" component={page1} />
      <JournalStack.Screen name="Page2" component={page2} />
      <JournalStack.Screen name="Page3" component={page3} />
    </JournalStack.Navigator>
  );
};

// bottom tab navigation
export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#EA4C4C",
          tabBarInactiveTintColor: "#808080",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={dashboard}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="grid" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalStackScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="file-text" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={about}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="help-circle" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

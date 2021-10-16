import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

// screens
import homeScreen from "../screens/home";
import dashboard from "../screens/dashboard";
import journal from "../screens/journal";
import settings from "../screens/settings";
import about from "../screens/about";
import privacy from "../screens/privacy";
import all from "../screens/categories/all";
import expired from "../screens/categories/expired";
import food from "../screens/categories/food";
import cosmetics from "../screens/categories/cosmetics";
import medicine from "../screens/categories/medicine";
import addItem from "../screens/addItem";
import scanBarcode from "../screens/scanBarcode";
import scannedBarcode from "../screens/addItemWithBarcode";
import page1 from "../screens/journal pages/page1";
import page2 from "../screens/journal pages/page2";
import page3 from "../screens/journal pages/page3";
import item from "../screens/item";

// home screen
const HomeStack = createStackNavigator();
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
      <HomeStack.Screen name="ScanBarcode" component={scanBarcode} />
      <HomeStack.Screen name="ScannedBarcode" component={scannedBarcode} />
      <HomeStack.Screen name="ItemDetails" component={item} />
    </HomeStack.Navigator>
  );
};

// journal screen
const JournalStack = createStackNavigator();
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

// settings screen
const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsScreen" component={settings} />
      <SettingsStack.Screen name="About" component={about} />
      <SettingsStack.Screen name="Privacy" component={privacy} />
    </SettingsStack.Navigator>
  );
};

// bottom tab navigation
const Tab = createBottomTabNavigator();
export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ea4c4c",
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Nunito-SemiBold",
        },
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
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

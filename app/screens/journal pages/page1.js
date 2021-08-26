import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";

function page1({ navigation }) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.vtitle]}></View>
      <View style={[styles.fixToText]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Page1_2")}
          style={[styles.box]}
        >
          <Text style={[styles.text]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 50,
  },
  vtitle: {
    width: 350,
    paddingBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    borderRadius: 30,
    backgroundColor: "pink",
  },
  box: {
    width: 200,
    height: 50,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#EA4C4C",
  },
  content: {
    fontFamily: "Cochin",
    fontSize: 20,
    textShadowRadius: 1,
    margin: 10,
    textAlign: "justify",
    padding: 10,
  },
  fixToText: {
    bottom: 0,
    left: 0,
  },
  link: {
    fontSize: 20,
    textShadowRadius: 1,
    margin: 10,
    fontWeight: "bold",
    textAlign: "justify",
    padding: 10,
    color: "#AEC6CF",
  },
  text: {
    padding: 20,
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    //position: "absolute",
  },
});

export default page1;

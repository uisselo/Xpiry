import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from "react-native";



function about(props) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>About Xpiry</Text>
      <Text style={[styles.about]}>Xpiry is a mobile tracking application for
        expiration dates for food and drug products. This application aims to expand its users'
        knowledge on why it's bad for our health to consume expired goods, and how keeping
        track of products' expiration dates can reduce wastes in our respective households.</Text>


      <View style={styles.fixToText}>
         <TouchableOpacity
        onPress={() => console.log("All")}>
          <Text style={[styles.txt]}>Terms of Use</Text>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={() => console.log("All")}>
          <Text style={[styles.txt]}>Privacy Policy</Text>
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
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: 50,
  },
  title: {
    fontSize: 30,

  },
  about: {
    fontSize: 20,
    textShadowRadius: 1,
    margin: 24,
    textAlign: "justify",
    padding: 50
  },
  fixToText: {
    padding: 20,
    bottom: 0,
    left: 0
  },
  txt:{
   color:"#D90026",
    fontSize: 18,
  }
});


export default about;

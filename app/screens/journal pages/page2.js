// Why we shouldn't consume expired goods

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";

function page2({ navigation }) {
  
  return (
    <View style={[styles.container]}>
      <View style={[styles.vtitle]}>
        <Text style={[styles.title ]}> Why we shouldn't consume expired goods</Text>
        
        
      </View>
      <View style={[styles.fixToText]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Page2_2")}
        style={[
          styles.box,
        ]}
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
  
  box: {
    width: 200,
    height: 50,
    margin: 5,
    borderRadius: 20,    
    backgroundColor: "#EA4C4C",
   
   
  },
   
  fixToText: {
    bottom: 0,
    left: 0,
  },
  
  text: {
    padding: 20,
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
     textAlign: "center"
   //position: "absolute",
  },
});

export default page2;

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function journal(props) {
  return (
    <View style={[styles.container]}>
       <View style={[styles.welcome]}>
        <Text style={{ fontSize: 30 }}>Journal</Text>
      </View> 
      
    
        <TouchableOpacity
        onPress={() => console.log("All")}
        style={[
          styles.box,
        ]}
      >
         <Text style={[styles.text]}>Tips on Medicine Intake</Text>
       
      </TouchableOpacity>
        <TouchableOpacity
        onPress={() => console.log("All")}
        style={[
          styles.box,
        ]}
      >
         <Text style={[styles.text]}>Tips on Medicine Intake</Text>
       
      </TouchableOpacity>
        <TouchableOpacity
        onPress={() => console.log("All")}
        style={[
          styles.box,
        ]}
      >
         <Text style={[styles.text]}>Tips on Medicine Intake</Text>
       
      </TouchableOpacity>
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
   welcome: {
    width: 350,
    paddingBottom: 15,
  },
  box: {
    width: 220,
    height: 170,
    margin: 5,
    borderRadius: 20,
    justifyContent: "center"
  },
  text: {
    padding: 30,
    color: "black",
    fontWeight: "bold",
   // position: "absolute",
  
    backgroundColor: "pink"
  }
});

export default journal;





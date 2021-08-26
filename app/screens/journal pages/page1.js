import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";

function page1(props) {
  
  return (
    <View style={[styles.container]}>
      <View style={[styles.vtitle]}>
        <Text> Tips on Medicine Intake</Text>
        
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
  title: {
    width: 350,
    paddingBottom: 15,
    
  },
  
 
});



export default page1;

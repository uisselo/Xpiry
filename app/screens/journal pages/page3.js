// Reducing Food Wastes

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking  } from "react-native";

function page3(props) {
  
  return (
    <View style={[styles.container]}>
      <View style={[styles.title]}>
        <Text> Reducing Food Wastes</Text>
        
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
 
});

export default page3;

import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

function page3_3(props) {
  return (
    <View style={[styles.container]}>
       <View style={[styles.welcome]}>
        <Text style={{ fontSize: 30 }}> Reducing Food Wastes</Text>
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

export default page3_3;
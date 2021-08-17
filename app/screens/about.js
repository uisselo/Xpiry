import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function about(props) {
  return (
    <View style={[styles.container]}>
      <Text>About</Text>
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
});

export default about;

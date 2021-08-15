import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

function all(props) {
  return (
    <View style={[styles.container]}>
      <Text>All Items</Text>
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

export default all;

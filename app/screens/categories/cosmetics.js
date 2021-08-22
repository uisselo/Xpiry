import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

function cosmetics(props) {
  return (
    <View style={[styles.container]}>
      <Text>Cosmetics</Text>
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

export default cosmetics;

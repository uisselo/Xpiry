import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function addItem(props) {
  return (
    <View style={[styles.container]}>
      <Text>Add new Item</Text>
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

export default addItem;

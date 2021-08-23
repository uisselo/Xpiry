// Why we shouldn't consume expired goods

import React from "react";
import { StyleSheet, View, Text } from "react-native";

function page2(props) {
  return (
    <View style={styles.container}>
      <Text>Why we shouldn't consume expired goods</Text>
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

export default page2;

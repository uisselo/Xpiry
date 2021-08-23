// Tips on Medicine Intake

import React from "react";
import { StyleSheet, View, Text } from "react-native";

function page1(props) {
  return (
    <View style={styles.container}>
      <Text>Tips on Medicine Intake</Text>
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

export default page1;

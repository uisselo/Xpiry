import React from "react";
import { StyleSheet, Text, View } from "react-native";

function about(props) {
  return (
    <View style={styles.container}>
      <View style={{ width: 350 }}>
        <Text style={{ fontSize: 30, marginBottom: 15 }}>About</Text>
        <Text style={{ fontSize: 18 }}>
          Xpiry is a tracking application for food and drug products’ expiration
          dates. This application also aims to expand its users’ knowledge on
          why it’s bad for our health to consume expired goods, and how keeping
          track of products’ expiration dates can reduce wastes in our
          respective households.
        </Text>
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

export default about;

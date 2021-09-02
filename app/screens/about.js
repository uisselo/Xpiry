import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default class about extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: 350 }}>
            <Text style={{ fontSize: 30, marginBottom: 15 }}>About</Text>
            <Text style={{ fontSize: 18 }}>
              Xpiry is a tracking application for food and drug products’
              expiration dates. This application also aims to expand its users’
              knowledge on why it’s bad for our health to consume expired goods,
              and how keeping track of products’ expiration dates can reduce
              wastes in our respective households.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 50,
  },
});

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
              Xpiry is an expiration date tracker application for food and drug
              products. Xpiry also has informative articles concerning expired
              products and its effects to people when consumed.
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

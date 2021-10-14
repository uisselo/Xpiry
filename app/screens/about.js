import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class about extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Text style={styles.header}>About</Text>
            <Text style={styles.baseText}>
              Xpiry is an expiration date tracker application for food and drug
              products. The application also has informative articles concerning
              expired products and its effects to people when consumed.
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
  header: {
    fontSize: widthPercentageToDP(7),
    fontFamily: "NunitoSans_700Bold",
    marginBottom: 15,
  },
  baseText: {
    fontSize: widthPercentageToDP(4.5),
    fontFamily: "NunitoSans_400Regular",
    lineHeight: 30,
    textAlign: "justify"
  },
});

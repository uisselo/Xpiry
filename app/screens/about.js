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
            <Text style={styles.header}>About Xpiry</Text>
            <Text style={styles.baseText}>
              Xpiry is an expiration date tracker application for a variety of
              products. Additional features of the application include an
              inventory management system for your products, and informative
              articles concerning expired products and its effects to people
              when consumed. {"\n\n"}
              This application was created for a capstone project of Information
              Technology students from University of Santo Tomas.
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
    fontFamily: "Nunito-Bold",
    marginBottom: 15,
  },
  baseText: {
    fontSize: widthPercentageToDP(4),
    fontFamily: "Nunito-Regular",
    lineHeight: 30,
    textAlign: "justify",
  },
});

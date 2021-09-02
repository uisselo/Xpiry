import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default class journal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: 350 }}>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Journal</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page1")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                }}
                style={styles.journal}
              />
              <Text style={styles.title}>Tips on Medicine Intake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page2")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1593014290067-93bac771f1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                }}
                style={styles.journal}
              />
              <Text style={styles.title}>
                Why we shouldn't consume expired goods
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page3")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                }}
                style={styles.journal}
              />
              <Text style={styles.title}>Reducing Food Wastes</Text>
            </TouchableOpacity>
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
  journal: {
    height: 130,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    color: "#fff",
    top: 20,
    left: 20,
    right: 20,
  },
});

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../db/config";
db();

export default class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User successfully logged out.");
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: widthPercentageToDP(80) }}>
          <Text style={{ fontSize: 30, alignSelf: "center", marginBottom: 20 }}>
            Settings
          </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => this.props.navigation.navigate("About")}
          >
            <View style={styles.row}>
              <Icon name="help-circle" size={20} color="#000" />
              <Text style={styles.linkLabel}>About</Text>
              <View style={styles.icon}>
                <Icon name="chevron-right" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.linkDivider} />
          <TouchableOpacity style={styles.link}>
            <View style={styles.row}>
              <Icon name="lock" size={20} color="#000" />
              <Text style={styles.linkLabel}>
                Privacy Policy
              </Text>
              <View style={styles.icon}>
                <Icon name="chevron-right" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.linkDivider} />
          <TouchableOpacity style={styles.link}>
            <View style={styles.row}>
              <Icon name="file" size={20} color="#000" />
              <Text style={styles.linkLabel}>
                Terms and Conditions
              </Text>
              <View style={styles.icon}>
                <Icon name="chevron-right" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.linkDivider} />
          <TouchableOpacity style={styles.link} onPress={() => this.logOut()}>
            <View style={styles.row}>
              <Icon name="log-out" size={20} color="#000" />
              <Text style={styles.linkLabel}>Logout</Text>
              <View style={styles.icon}>
                <Icon name="chevron-right" size={20} color="#000" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.linkDivider} />
        </View>
      </View>
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
  link: {
    paddingLeft: 10,
    paddingVertical: 15,
  },
  linkLabel: {
    fontSize: 20,
    paddingLeft: 10,
  },
  linkDivider: {
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
  },
  icon: {
    position: "absolute",
    right: 0,
    paddingRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

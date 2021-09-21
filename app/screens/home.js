import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../db/config";
db();

export default class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { userProfile: [], modalVisible: false };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          userId: user.uid,
          userName: user.displayName,
          mobileNum: user.phoneNumber,
        };
        if (this._isMounted) {
          this.setState({ userProfile: userData });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Modal
            hasBackdrop={true}
            backdropColor="#000"
            onBackdropPress={() => this.setState({ modalVisible: false })}
            isVisible={this.state.modalVisible}
          >
            <View style={styles.modal}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate("ScanBarcode");
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text
                    style={{
                      color: "#ea4c4c",
                    }}
                  >
                    Scan Barcode
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate("AddItem");
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    Add manually
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.header}>
            <Text style={{ fontSize: 20 }}>Welcome</Text>
            <Text style={{ fontSize: 30 }}>
              {this.state.userProfile.userName}
            </Text>
          </View>

          <TouchableOpacity // all items
            style={[
              styles.box,
              {
                backgroundColor: "#4aa3ba",
              },
            ]}
            onPress={() => this.props.navigation.navigate("All")}
          >
            <Text style={styles.text}>All Items</Text>
            <Image
              source={{ uri: "https://i.imgur.com/L3JFbmd.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // expired items
            style={[
              styles.box,
              {
                backgroundColor: "#a8896c",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Expired")}
          >
            <Text style={styles.text}>Expired Items</Text>
            <Image
              source={{ uri: "https://i.imgur.com/YjKWeo4.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // food category
            style={[
              styles.box,
              {
                backgroundColor: "#ffd2a5",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Food")}
          >
            <Text style={styles.text}>Food</Text>
            <Image
              source={{ uri: "https://i.imgur.com/tCeuzKA.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // cosmetics category
            style={[
              styles.box,
              {
                backgroundColor: "#ffb6b9",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Cosmetics")}
          >
            <Text style={styles.text}>Cosmetics</Text>
            <Image
              source={{ uri: "https://i.imgur.com/ogwnOqn.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // medicine category
            style={[
              styles.box,
              {
                backgroundColor: "#61b292",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Medicine")}
          >
            <Text style={styles.text}>Medicine</Text>
            <Image
              source={{ uri: "https://i.imgur.com/3kq4QjT.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // add item
            style={[
              styles.box,
              {
                backgroundColor: "#fff",
                borderColor: "#8AC6D1",
                borderWidth: 3,
              },
            ]}
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Text style={[styles.text, { color: "#6C6C6C" }]}>Add Item</Text>
            <Image
              source={{ uri: "https://i.imgur.com/dlU2ozJ.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
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
  box: {
    width: 170,
    height: 170,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  text: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    top: 0,
  },
  header: {
    width: 350,
    paddingBottom: 15,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  modal: {
    width: 350,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

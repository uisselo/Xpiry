import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../db/config";
db();

export default class expired extends Component {
  constructor(props) {
    super(props);
    this.state = { itemList: [] };
    _isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(firebase.auth().currentUser.uid);
    const expired = db.collection("Items").where("fromUser", "==", userRef);
    expired.onSnapshot((docs) => {
      const items = [];
      docs.forEach((doc) => {
        const data = doc.data();
        const fbd = data.expiryDate.toDate();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const ed =
          fbd.getDate() +
          " " +
          monthNames[fbd.getMonth()] +
          " " +
          fbd.getFullYear();
        if (Date.now() / 1000 >= doc.data().expiryDate.seconds) {
          items.push({
            id: doc.id,
            name: data.itemName,
            category: data.itemCategory,
            expiryDate: ed,
            barcode: data.barcodeNumber,
            quantity: data.quantity,
          });
        }
      });
      if (this._isMounted) {
        this.setState({ itemList: items });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 30 }}>Expired Items</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.itemList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  this.props.navigation.navigate("ItemDetails", { item: item })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.category === "Food" ? (
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
                      }}
                      style={{ width: 30, height: 30 }}
                    />
                  ) : item.category === "Cosmetics" ? (
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/2413/2413171.png",
                      }}
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/656/656019.png",
                      }}
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                  <View style={{ marginLeft: 20 }}>
                    <Text>{item.name}</Text>
                    <Text style={styles.status}>Expired</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  title: {
    marginBottom: 10,
    width: 350,
    alignSelf: "center",
  },
  item: {
    width: 350,
    height: 70,
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignSelf: "center",
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
  status: {
    color: "#ea4c4c",
  },
});

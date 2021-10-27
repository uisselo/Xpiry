import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../db/config";
db();

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], expiredItems: [] };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(firebase.auth().currentUser.uid);
    const expired = db.collection("Items").where("fromUser", "==", userRef);
    expired.onSnapshot((docs) => {
      const items = [];
      const expiredItems = [];
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
        if (Date.now() / 1000 <= doc.data().expiryDate.seconds) {
          items.push({
            id: doc.id,
            name: data.itemName,
            category: data.itemCategory,
            expiryDate: ed,
            barcode: data.barcodeNumber,
            quantity: data.quantity,
          });
        } else if (Date.now() / 1000 >= doc.data().expiryDate.seconds) {
          expiredItems.push({
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
        this.setState({ items: items, expiredItems: expiredItems });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <View style={styles.dataContainer}>
          <TouchableOpacity style={styles.data}>
            <Text style={[styles.baseText, styles.dataNum]}>
              {
                this.state.expiredItems.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "D")
                ).length
              }
            </Text>
            <Text style={[styles.baseText, styles.dataLabel]}>
              Expired Items Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.data}>
            <Text style={[styles.baseText, styles.dataNum]}>
              {
                this.state.expiredItems.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
                ).length
              }
            </Text>
            <Text style={[styles.baseText, styles.dataLabel]}>
              Expired Items this Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.data}>
            <Text style={[styles.baseText, styles.dataNum]}>
              {
                this.state.items.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
                ).length
              }
            </Text>
            <Text style={[styles.baseText, styles.dataLabel]}>
              Items that will Expire this Week
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 50,
  },
  header: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: widthPercentageToDP(7),
    fontFamily: "Nunito-Bold",
  },
  baseText: {
    fontSize: widthPercentageToDP(3.75),
    fontFamily: "Nunito-SemiBold",
  },
  dataContainer: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
  },
  data: {
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
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
  dataNum: {
    fontSize: widthPercentageToDP(7),
    alignSelf: "flex-end",
    paddingBottom: 20,
  },
  dataLabel: {
    fontSize: widthPercentageToDP(5),
  },
});

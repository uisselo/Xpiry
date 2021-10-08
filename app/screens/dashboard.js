import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
  Animated,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TabView, SceneMap } from "react-native-tab-view";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../db/config";
import { ScrollView } from "react-native-gesture-handler";
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
              Items that will Expire in a Week
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
    fontSize: 30,
    fontFamily: "NunitoSans_700Bold",
  },
  baseText: {
    fontFamily: "NunitoSans_600SemiBold",
  },
  dataContainer: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
  },
  data: {
    height: 100,
    borderRadius: 10,
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
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    right: 20,
  },
  dataLabel: {
    fontSize: 20,
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 0,
    paddingBottom: 20,
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

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../db/config";
db();

export default class item extends Component {
  constructor(props) {
    super(props);
    const { item } = this.props.route.params;
    this.state = {
      itemName: item.name,
      itemExpirationDate: new Date(item.expiryDate),
      itemQty: item.quantity,
      itemConsumedQty: item.consumedQuantity,
      itemBarcode: item.barcode,
      modalVisible: false,
    };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onUnarchive() {
    if (this._isMounted) {
      firebase
        .firestore()
        .collection("Items")
        .doc(this.props.route.params.item.id)
        .update({ isArchived: false })
        .then(() => {
          console.log("Item successfully unacrhived!");
          Alert.alert("Success", "Item successfully unarchived.", [
            {
              text: "OK",
              onPress: () => {
                console.log("Alert closed.");
                this.setState({ modalVisible: false });
                this.props.navigation.navigate("All");
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onConfirmDelete() {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Alert closed.");
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            this.onDelete();
            this.props.navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  }

  onDelete() {
    if (this._isMounted) {
      firebase
        .firestore()
        .collection("Items")
        .doc(this.props.route.params.item.id)
        .delete()
        .then(() => {
          console.log("Item successfully deleted!");
          Alert.alert("Success", "Item successfully deleted.", [
            {
              text: "OK",
              onPress: () => {
                console.log("Alert closed.");
                this.props.navigation.navigate("Archive");
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const { item } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={{ width: widthPercentageToDP(80) }}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: widthPercentageToDP(7),
                fontFamily: "Nunito-Bold",
              }}
            >
              Item Details
            </Text>
          </View>
          <TouchableWithoutFeedback style={styles.box}>
            <Text
              style={{
                fontSize: widthPercentageToDP(5),
                fontFamily: "Nunito-SemiBold",
                width: widthPercentageToDP(40),
              }}
            >
              {this.state.itemName}
            </Text>
            <Text style={[styles.baseText, styles.qty]}>
              {this.state.itemQty - this.state.itemConsumedQty}
              {this.state.itemQty - this.state.itemConsumedQty === 0
                ? null
                : this.state.itemQty - this.state.itemConsumedQty > 1
                ? " Items Left"
                : " Item Left"}
            </Text>
            <Text
              style={[styles.baseText, { fontSize: widthPercentageToDP(5) }]}
            >
              {item.category}
            </Text>
            {moment(item.expiryDate, "DD-MMM-YYYY").isSameOrBefore(
              Date.now(),
              "D"
            ) ? (
              <Text style={[styles.baseText, { color: "#ea4c4c" }]}>
                Expired on {item.expiryDate}{" "}
                {moment(item.expiryDate, "DD-MMM-YYYY").isSame(
                  Date.now(),
                  "D"
                ) ? (
                  <Text style={[styles.baseText, styles.smallText]}>
                    (Today)
                  </Text>
                ) : (
                  <Text style={[styles.baseText, styles.smallText]}>
                    ({moment(item.expiryDate, "DD-MMM-YYYY").fromNow(true)} Ago)
                  </Text>
                )}
              </Text>
            ) : (
              <Text style={[styles.baseText, { color: "#ea4c4c" }]}>
                Expires on {item.expiryDate}
              </Text>
            )}
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.box}>
            <Text
              style={[styles.baseText, { fontSize: widthPercentageToDP(5) }]}
            >
              {!this.state.itemBarcode
                ? "This item has no barcode"
                : this.state.itemBarcode}
            </Text>
            <Text style={[styles.baseText, { color: "#ea4c4c" }]}>
              Barcode Number
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.box}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  styles.baseText,
                  { fontSize: widthPercentageToDP(5), alignSelf: "center" },
                ]}
              >
                Items
              </Text>
              <Text
                style={[
                  styles.baseText,
                  styles.smallText,
                  { alignSelf: "center" },
                ]}
              >
                {this.state.itemConsumedQty} of {this.state.itemQty} Consumed
              </Text>
            </View>
            <ProgressBar
              progress={this.state.itemConsumedQty / this.state.itemQty}
              color={"#ea4c4c"}
              style={{ marginTop: 20 }}
            />
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.fixedBtn, { paddingRight: 5 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                ]}
                onPress={() => this.onUnarchive()}
              >
                <Text
                  style={[
                    styles.baseText,
                    {
                      color: "#ea4c4c",
                    },
                  ]}
                >
                  Unarchive
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.fixedBtn, { paddingLeft: 5 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                ]}
                onPress={() => this.onConfirmDelete()}
              >
                <Text
                  style={[
                    styles.baseText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginBottom: 10,
    width: widthPercentageToDP(80),
    alignSelf: "center",
  },
  baseText: {
    fontFamily: "Nunito-Regular",
    fontSize: widthPercentageToDP(3.75),
  },
  modal: {
    width: widthPercentageToDP(80),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
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
  box: {
    width: widthPercentageToDP(80),
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 5,
    justifyContent: "flex-start",
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
  qty: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "#fff",
    backgroundColor: "#ea4c4c",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  smallText: {
    color: "#555",
    fontSize: widthPercentageToDP(2.75),
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingTop: 2,
  },
  input: {
    borderRadius: 10,
    padding: 10,
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
    justifyContent: "center",
  },
  fixedBtn: {
    width: widthPercentageToDP(40),
  },
  btn: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  fixedBtnModal: {
    width: widthPercentageToDP(35),
  },
  btnModal: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

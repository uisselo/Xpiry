import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import SelectCategory from "react-native-picker-select";
import DatePicker from "react-native-modal-datetime-picker";
import NumericInput from "react-native-numeric-input";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../db/config";
db();

export default class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemCategory: "",
      itemExpirationDate: new Date(),
      itemQty: 0,
      itemBarcode: "",
      datePickerVisible: false,
    };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSubmit() {
    const { itemName, itemCategory, itemExpirationDate, itemQty, itemBarcode } =
      this.state;
    const db = firebase.firestore();
    const id = db.collection("Items").doc().id;
    const item = {
      itemId: id,
      itemName: itemName,
      itemCategory: itemCategory,
      expiryDate: itemExpirationDate,
      barcodeNumber: itemBarcode,
      quantity: itemQty,
      fromUser: db.doc("Users/" + firebase.auth().currentUser.uid),
    };
    if (this._isMounted) {
      db.collection("Items")
        .doc(id)
        .set(item)
        .then(() => {
          Alert.alert("Success", "Item has been added to database.", [
            {
              text: "OK",
              onPress: () => {
                console.log("Alert closed.");
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

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Text style={{ fontSize: 30 }}>Add new Item</Text>

            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              value={this.state.itemName}
              onChangeText={(itemName) => this.setState({ itemName })}
              placeholder="Enter product name"
            />

            <Text style={styles.label}>Item Category</Text>
            <View style={styles.input}>
              <SelectCategory
                style={{ inputAndroid: { color: "black" } }}
                useNativeAndroidPickerStyle={false}
                value={this.state.itemCategory}
                onValueChange={(itemCategory) =>
                  this.setState({ itemCategory })
                }
                placeholder={{ label: "Choose Category", value: null }}
                items={[
                  { label: "Food", value: "Food" },
                  { label: "Cosmetics", value: "Cosmetics" },
                  { label: "Medicine", value: "Medicine" },
                ]}
              />
            </View>

            <Text style={styles.label}>Expiration Date</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => this.setState({ datePickerVisible: true })}
            >
              <Text
                editable={false}
                value={this.state.itemExpirationDate.toLocaleDateString()}
                placeholder="Expiration Date"
              >
                {this.state.itemExpirationDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <DatePicker
              isVisible={this.state.datePickerVisible}
              mode="date"
              onConfirm={(date) => {
                console.log("Date picked:", date);
                this.setState({
                  datePickerVisible: false,
                  itemExpirationDate: date,
                });
              }}
              onCancel={() => this.setState({ datePickerVisible: false })}
            />

            <Text style={styles.label}>Quantity</Text>
            <NumericInput
              value={this.state.itemQty}
              onChange={(itemQty) => this.setState({ itemQty })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              minValue={0}
              totalWidth={widthPercentageToDP(50)}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="#000"
              borderColor="#fff"
              containerStyle={styles.input}
              inputStyle={{
                backgroundColor: "#fff",
              }}
              iconStyle={{
                color: "#fff",
              }}
              rightButtonBackgroundColor="#ea4c4c"
              leftButtonBackgroundColor="#ea4c4c"
            />

            <Text style={styles.label}>Barcode Number</Text>
            <TextInput
              style={styles.input}
              value={this.state.itemBarcode}
              onChangeText={(itemBarcode) => this.setState({ itemBarcode })}
              placeholder="Enter barcode number"
            />

            <View style={[styles.row, { marginTop: 15 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                ]}
                onPress={() => this.props.navigation.navigate("ScanBarcode")}
              >
                <Text
                  style={{
                    fontSize: 20,
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
                onPress={() => this.onSubmit()}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
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
  input: {
    height: 40,
    borderRadius: 10,
    padding: 10,
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
  label: {
    fontSize: 15,
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    height: 40,
    width: widthPercentageToDP(39),
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

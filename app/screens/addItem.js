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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { itemName, itemCategory, itemExpirationDate, itemQty, itemBarcode } =
      this.state;
    const db = firebase.firestore().collection("Items");
    const item = {
      name: itemName,
      category: itemCategory,
      expirationDate: itemExpirationDate,
      quantity: itemQty,
      barcode: itemBarcode,
    };
    db.add(item)
      .then(() => {
        Alert.alert("Success", "Item has been added to database.", [
          {
            text: "OK",
            onPress: () => {
              console.log("Alert closed.");
              this.props.navigation.goBack();
            },
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: 350 }}>
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
            <View style={styles.row}>
              <View style={[styles.input, { width: 230 }]}>
                <TextInput
                  placeholder="Expiration Date"
                  editable={false}
                  value={this.state.itemExpirationDate.toLocaleDateString()}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    fontSize: 15,
                    width: 110,
                    color: "#fff",
                    borderColor: "#ea4c4c",
                    backgroundColor: "#ea4c4c",
                  },
                ]}
                onPress={() => this.setState({ datePickerVisible: true })}
              >
                <Text style={{ color: "#fff" }}>Select Date</Text>
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
            </View>

            <Text style={styles.label}>Quantity</Text>
            <NumericInput
              value={this.state.itemQty}
              onChange={(itemQty) => this.setState({ itemQty })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              minValue={0}
              totalWidth={230}
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
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
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
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

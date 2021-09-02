import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SelectCategory from "react-native-picker-select";
import DatePicker from "@react-native-community/datetimepicker";
import NumericInput from "react-native-numeric-input";

export default class addItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemQty: 0,
      itemBarcode: "",
    };
  }

  render() {
    // const [itemName, onChangeItemName] = useState(null);
    // const [barcodeNum, onChangeBarcodeNum] = useState(null);
    // const [date, setDate] = useState(new Date());
    // const [itemQty, onChangeItemQty] = useState(null);

    // const onChange = (event, selectedDate) => {
    //   const currentDate = selectedDate || date;
    //   setDate(currentDate);
    // };

    const placeholder = {
      label: "Choose category",
      value: null,
    };

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
                onValueChange={(value) => console.log(value)}
                placeholder={placeholder}
                items={[
                  { label: "Food", value: "Food" },
                  { label: "Cosmetics", value: "Cosmetics" },
                  { label: "Medicine", value: "Medicine" },
                ]}
              />
            </View>

            {/* <Text style={styles.label}>Expiration Date</Text>
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            /> */}

            <Text style={styles.label}>Quantity</Text>
            <NumericInput
              value={this.state.itemQty}
              onChange={(itemQty) => this.setState({ itemQty })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              minValue={0}
              totalWidth={240}
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
              rightButtonBackgroundColor="#EA4C4C"
              leftButtonBackgroundColor="#EA4C4C"
            />

            <Text style={styles.label}>Barcode Number</Text>
            <TextInput
              style={styles.input}
              value={this.state.itemBarcode}
              onChangeText={(itemBarcode) => this.setState({ itemBarcode })}
              placeholder="Enter barcode number"
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.btnScan}>
                <Text style={{ fontSize: 20, color: "#EA4C4C" }}>
                  Scan Barcode
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave}>
                <Text style={{ fontSize: 20, color: "#fff" }}>Save</Text>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btnScan: {
    height: 40,
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EA4C4C",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSave: {
    height: 40,
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EA4C4C",
    backgroundColor: "#EA4C4C",
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SelectCategory from "react-native-picker-select";
import DatePicker from "@react-native-community/datetimepicker";
import NumericInput from "react-native-numeric-input";

function addItem(props) {
  const [itemName, onChangeItemName] = useState(null);
  const [barcodeNum, onChangeBarcodeNum] = useState(null);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const pickerStyle = {
    inputIOS: {
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
    },
  };

  const placeholder = {
    label: "Choose category",
    value: null,
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: 350 }}>
          <Text style={{ fontSize: 30 }}>Add new Item</Text>

          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeItemName}
            value={itemName}
            placeholder="Enter product name"
          ></TextInput>

          <Text style={styles.label}>Item Category</Text>
          <SelectCategory
            onValueChange={(value) => console.log(value)}
            style={pickerStyle}
            placeholder={placeholder}
            items={[
              { label: "Food", value: "Food" },
              { label: "Cosmetics", value: "Cosmetics" },
              { label: "Medicine", value: "Medicine" },
            ]}
          />

          <Text style={styles.label}>Expiration Date</Text>
          <DatePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />

          <Text style={styles.label}>Quantity</Text>
          <NumericInput
            value={React.value}
            onChange={(value) => React.useState({ value })}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={240}
            totalHeight={40}
            iconSize={25}
            step={1}
            valueType="real"
            rounded
            textColor="#000"
            borderColor="#fff"
            inputStyle={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 20,
              },
              shadowRadius: 20,
              shadowOpacity: 0.05,
            }}
            iconStyle={{
              color: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 10,
                height: 20,
              },
              shadowRadius: 20,
              shadowOpacity: 0.05,
            }}
            rightButtonBackgroundColor="#EA4C4C"
            leftButtonBackgroundColor="#EA4C4C"
          />

          <Text style={styles.label}>Barcode Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBarcodeNum}
            value={barcodeNum}
            placeholder="Enter barcode number"
          ></TextInput>

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

export default addItem;

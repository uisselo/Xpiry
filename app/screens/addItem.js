import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

function addItem(props) {
  const [text, onChangeText] = React.useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={{ fontSize: 30 }}>Add new Item</Text>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter product name"
        ></TextInput>
        <Text style={styles.label}>Item Category</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Java", value: "java" },
            { label: "Javascript", value: "js" },
          ]}
          style={styles.input}
        />
        <Text style={styles.label}>Expiration Date</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Select Date"
        ></TextInput>
        <Text style={styles.label}>Barcode Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter barcode number"
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: 50,
  },
  form: {
    width: 350,
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
});

export default addItem;

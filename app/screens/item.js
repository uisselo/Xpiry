import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={{ width: 350 }}>
          <TouchableWithoutFeedback style={[styles.box, { height: 130 }]}>
            <View style={styles.row}>
              <View style={{ width: 200 }}>
                <Text style={{ fontSize: 25 }}>{item.name}</Text>
              </View>
              <Text style={styles.qty}>
                {item.quantity}{" "}
                {item.quantity === 0
                  ? ""
                  : item.quantity > 1
                  ? "Items"
                  : "Item"}
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>{item.category}</Text>
            <Text style={{ color: "#ea4c4c" }}>
              Expires on {item.expirationDate}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={[styles.box, { height: 100 }]}>
            <Text style={{ fontSize: 25 }}>{item.barcode}</Text>
            <Text style={{ color: "#ea4c4c" }}>Barcode Number</Text>
          </TouchableWithoutFeedback>
          <View style={[styles.row, { marginTop: 10 }]}>
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
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
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
  box: {
    width: 350,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  qty: {
    color: "#fff",
    backgroundColor: "#ea4c4c",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "flex-start",
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

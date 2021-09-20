import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DatePicker from "react-native-modal-datetime-picker";
import NumericInput from "react-native-numeric-input";
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
      itemBarcode: item.barcode,
      datePickerVisible: false,
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

  onSave() {
    const { itemName, itemExpirationDate, itemQty, itemBarcode } = this.state;
    if (this._isMounted) {
      firebase
        .firestore()
        .collection("Items")
        .doc(this.props.route.params.item.id)
        .update({
          name: itemName,
          expirationDate: itemExpirationDate,
          quantity: itemQty,
          barcode: itemBarcode,
        })
        .then(() => {
          this.setState({
            itemName: itemName,
            itemQty: itemQty,
            itemBarcode: itemBarcode,
          });
          console.log("Item successfully updated!");
          Alert.alert("Success", "Item successfully updated.", [
            {
              text: "OK",
              onPress: () => {
                console.log("Alert closed.");
                this.setState({ modalVisible: false });
              },
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                this.props.navigation.goBack();
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
        <View style={{ width: 350 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignSelf: "center",
                marginTop: Platform.OS === "ios" ? 50 : 0,
              }}
            >
              <View style={styles.modal}>
                <Text style={{ fontSize: 30, marginBottom: 10 }}>
                  Update Item
                </Text>
                <Text style={{ marginVertical: 5 }}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.itemName}
                  onChangeText={(itemName) => this.setState({ itemName })}
                  placeholder={item.name}
                />
                <Text style={{ marginVertical: 5 }}>Expiration Date</Text>
                <View style={styles.row}>
                  <View style={[styles.input, { width: 200 }]}>
                    <TextInput
                      editable={false}
                      value={this.state.itemExpirationDate.toLocaleDateString()}
                      placeholder={item.expiryDate}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      {
                        fontSize: 15,
                        width: 100,
                        color: "#fff",
                        alignSelf: "center",
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
                    date={new Date(item.expiryDate)}
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
                <Text style={{ marginVertical: 5 }}>Quantity</Text>
                <NumericInput
                  value={this.state.itemQty}
                  onChange={(itemQty) => this.setState({ itemQty })}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  minValue={0}
                  totalWidth={200}
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
                <Text style={{ marginVertical: 5 }}>Barcode Number</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.itemBarcode}
                  onChangeText={(itemBarcode) => this.setState({ itemBarcode })}
                  placeholder={item.barcode}
                />
                <View style={[styles.row, { marginTop: 10 }]}>
                  <TouchableOpacity
                    style={[
                      styles.btnModal,
                      { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                    ]}
                    onPress={() => this.setState({ modalVisible: false })}
                  >
                    <Text
                      style={{
                        color: "#ea4c4c",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.btnModal,
                      { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                    ]}
                    onPress={() => this.onSave()}
                  >
                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableWithoutFeedback style={[styles.box, { height: 130 }]}>
            <View style={styles.row}>
              <View style={{ width: 200 }}>
                <Text style={{ fontSize: 25 }}>
                  {this.state.itemName}
                </Text>
              </View>
              <Text style={styles.qty}>
                {this.state.itemQty}
                {item.quantity === 0
                  ? ""
                  : item.quantity > 1
                  ? " Items"
                  : " Item"}
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>{item.category}</Text>
            <Text style={{ color: "#ea4c4c" }}>
              Expires on {item.expiryDate}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={[styles.box, { height: 100 }]}>
            <Text style={{ fontSize: 25 }}>{this.state.itemBarcode}</Text>
            <Text style={{ color: "#ea4c4c" }}>Barcode Number</Text>
          </TouchableWithoutFeedback>
          <View style={[styles.row, { marginTop: 10 }]}>
            <TouchableOpacity
              style={[
                styles.btn,
                { borderColor: "#ea4c4c", backgroundColor: "#fff" },
              ]}
              onPress={() => this.setState({ modalVisible: true })}
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
              onPress={() => this.onDelete()}
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
  modal: {
    width: 350,
    height: 450,
    justifyContent: "center",
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
  input: {
    height: 40,
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
  btn: {
    height: 40,
    width: 170,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnModal: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

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
import SelectCategory from "react-native-picker-select";
import { ProgressBar } from "react-native-paper";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DatePicker from "react-native-modal-datetime-picker";
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
      itemCategory: item.category,
      itemExpirationDate: new Date(item.expiryDate),
      itemQty: item.quantity,
      itemConsumedQty: item.consumedQuantity,
      itemBarcode: item.barcode,
      datePickerVisible: false,
      editModalVisible: false,
      consumeModalVisible: false,
    };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onConsume() {
    if (this._isMounted) {
      firebase
        .firestore()
        .collection("Items")
        .doc(this.props.route.params.item.id)
        .update({
          consumedQty: this.state.itemConsumedQty,
        })
        .then(() => {
          this.setState({
            itemConsumedQty: this.state.itemConsumedQty,
          });
          this.setState({ consumeModalVisible: false });
          console.log("Item successfully updated!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onSave() {
    const { itemName, itemCategory, itemExpirationDate, itemQty, itemBarcode } =
      this.state;
    if (itemQty == 0) {
      Alert.alert("Failed", "Quantity cannot be zero (0).", [
        {
          text: "OK",
          onPress: () => {
            console.log("Alert closed.");
          },
        },
      ]);
    } else {
      if (this._isMounted) {
        firebase
          .firestore()
          .collection("Items")
          .doc(this.props.route.params.item.id)
          .update({
            itemName: itemName,
            itemCategory: itemCategory,
            expiryDate: itemExpirationDate,
            quantity: itemQty,
            barcodeNumber: itemBarcode,
          })
          .then(() => {
            this.setState({
              itemName: itemName,
              itemCategory: itemCategory,
              itemQty: itemQty,
              itemBarcode: itemBarcode,
            });
            console.log("Item successfully updated!");
            Alert.alert("Success", "Item successfully updated.", [
              {
                text: "OK",
                onPress: () => {
                  console.log("Alert closed.");
                  this.setState({ editModalVisible: false });
                },
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  onArchive() {
    if (this._isMounted) {
      firebase
        .firestore()
        .collection("Items")
        .doc(this.props.route.params.item.id)
        .update({ isArchived: true })
        .then(() => {
          console.log("Item successfully archived!");
          Alert.alert("Success", "Item successfully archived.", [
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
          <Modal // update item modal
            hasBackdrop={true}
            backdropColor="#000"
            onBackdropPress={() => this.setState({ editModalVisible: false })}
            isVisible={this.state.editModalVisible}
            statusBarTranslucent
          >
            <View style={styles.modal}>
              <View style={{ width: widthPercentageToDP(70) }}>
                <Text
                  style={{
                    fontSize: widthPercentageToDP(7),
                    fontFamily: "Nunito-SemiBold",
                    marginBottom: 10,
                  }}
                >
                  Update Item
                </Text>
                <Text style={[styles.baseText, { marginVertical: 5 }]}>
                  Item Name
                </Text>
                <TextInput
                  style={[styles.baseText, styles.input]}
                  value={this.state.itemName}
                  onChangeText={(itemName) => this.setState({ itemName })}
                  placeholder={item.name}
                />
                <Text style={[styles.baseText, { marginVertical: 5 }]}>
                  Item Category
                </Text>
                <View style={styles.input}>
                  <SelectCategory
                    style={{
                      inputAndroid: {
                        color: "black",
                        fontFamily: "Nunito-Regular",
                        fontSize: widthPercentageToDP(3.75),
                      },
                      inputIOS: {
                        fontFamily: "Nunito-Regular",
                        fontSize: widthPercentageToDP(3.75),
                      },
                    }}
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
                      { label: "Other", value: "Other" },
                    ]}
                  />
                </View>
                <Text style={[styles.baseText, { marginVertical: 5 }]}>
                  Expiration Date
                </Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => this.setState({ datePickerVisible: true })}
                >
                  <Text
                    editable={false}
                    value={this.state.itemExpirationDate.toLocaleDateString()}
                    placeholder={item.expiryDate}
                    style={styles.baseText}
                  >
                    {this.state.itemExpirationDate.toLocaleDateString()}
                  </Text>
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
                <Text style={[styles.baseText, { marginVertical: 5 }]}>
                  Quantity
                </Text>
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
                  inputStyle={[
                    styles.baseText,
                    {
                      backgroundColor: "#fff",
                    },
                  ]}
                  iconStyle={{
                    color: "#fff",
                  }}
                  rightButtonBackgroundColor="#ea4c4c"
                  leftButtonBackgroundColor="#ea4c4c"
                />
                <Text style={[styles.baseText, { marginVertical: 5 }]}>
                  Barcode Number
                </Text>
                <TextInput
                  style={[styles.baseText, styles.input]}
                  value={this.state.itemBarcode}
                  onChangeText={(itemBarcode) => this.setState({ itemBarcode })}
                  placeholder={item.barcode}
                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={[styles.fixedBtnModal, { paddingRight: 5 }]}>
                    <TouchableOpacity
                      style={[
                        styles.btnModal,
                        { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                      ]}
                      onPress={() => this.setState({ editModalVisible: false })}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          {
                            color: "#ea4c4c",
                          },
                        ]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.fixedBtnModal, { paddingLeft: 5 }]}>
                    <TouchableOpacity
                      style={[
                        styles.btnModal,
                        { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                      ]}
                      onPress={() => this.onSave()}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          {
                            color: "#fff",
                          },
                        ]}
                      >
                        Save Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal // condume modal
            hasBackdrop={true}
            backdropColor="#000"
            onBackdropPress={() =>
              this.setState({ consumeModalVisible: false })
            }
            isVisible={this.state.consumeModalVisible}
            statusBarTranslucent
          >
            <View style={[styles.modal, { width: widthPercentageToDP(60) }]}>
              <View style={{ width: widthPercentageToDP(50) }}>
                <NumericInput
                  value={this.state.itemConsumedQty}
                  onChange={(itemConsumedQty) =>
                    this.setState({ itemConsumedQty })
                  }
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  minValue={0}
                  maxValue={this.state.itemQty}
                  totalWidth={widthPercentageToDP(50)}
                  totalHeight={40}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="#000"
                  borderColor="#fff"
                  containerStyle={styles.input}
                  inputStyle={[
                    styles.baseText,
                    {
                      backgroundColor: "#fff",
                      alignSelf: "center",
                    },
                  ]}
                  iconStyle={{
                    color: "#fff",
                  }}
                  rightButtonBackgroundColor="#ea4c4c"
                  leftButtonBackgroundColor="#ea4c4c"
                />
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      borderColor: "#ea4c4c",
                      backgroundColor: "#ea4c4c",
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => this.onConsume()}
                >
                  <Text
                    style={[
                      styles.baseText,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
              {this.state.itemCategory}
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
                    ({moment(item.expiryDate, "DD-MMM-YYYY").fromNow()})
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
          <TouchableOpacity style={styles.box}>
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
              style={{ marginVertical: 20 }}
            />
            <TouchableOpacity
              style={[
                styles.btn,
                { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
              ]}
              onPress={() => this.setState({ consumeModalVisible: true })}
            >
              <Text
                style={[
                  styles.baseText,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Consume
              </Text>
            </TouchableOpacity>
            {moment(item.expiryDate, "DD-MMM-YYYY").isSameOrBefore(
              Date.now(),
              "D"
            ) ? (
              <Text
                style={[styles.baseText, styles.smallText, { marginTop: 10 }]}
              >
                Attention! This product has reached its expiration date. Further
                consumption is not recommended.
              </Text>
            ) : null}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.fixedBtn, { paddingRight: 5 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                ]}
                onPress={() => this.setState({ editModalVisible: true })}
              >
                <Text
                  style={[
                    styles.baseText,
                    {
                      color: "#ea4c4c",
                    },
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.fixedBtn, { paddingLeft: 5 }]}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                ]}
                onPress={() => this.onArchive()}
              >
                <Text
                  style={[
                    styles.baseText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Archive
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
  progress: {
    position: "absolute",
    top: 25,
    right: 20,
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
    padding: 8,
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
    padding: 8,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

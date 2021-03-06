import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../db/config";
import { LinearGradient } from "expo-linear-gradient";
db();

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      expiredItems: [],
      EITModalVisible: false,
      EIWModalVisible: false,
      EIMModalVisible: false,
      IWEWModalVisible: false,
    };
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
            isArchived: data.isArchived,
            consumedQuantity: data.consumedQty,
          });
        } else if (Date.now() / 1000 >= doc.data().expiryDate.seconds) {
          expiredItems.push({
            id: doc.id,
            name: data.itemName,
            category: data.itemCategory,
            expiryDate: ed,
            barcode: data.barcodeNumber,
            quantity: data.quantity,
            isArchived: data.isArchived,
            consumedQuantity: data.consumedQty,
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
        <Modal // expired items today modal
          hasBackdrop={true}
          backdropColor="#000"
          onBackdropPress={() => this.setState({ EITModalVisible: false })}
          isVisible={this.state.EITModalVisible}
          statusBarTranslucent
        >
          <View style={styles.modal}>
            <View style={{ width: widthPercentageToDP(70) }}>
              <View
                style={{
                  width: widthPercentageToDP(68),
                  alignSelf: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: widthPercentageToDP(5),
                    fontFamily: "Nunito-Bold",
                  }}
                >
                  Expired Items Today
                </Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.expiredItems.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "D")
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        item.isArchived == true
                          ? this.props.navigation.navigate("ItemArchived", {
                              item: item,
                            })
                          : this.props.navigation.navigate("ItemDetails", {
                              item: item,
                            });
                        this.setState({ EITModalVisible: false });
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.category === "Food" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/fast-food.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Cosmetics" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/cosmetic.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Medicine" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/capsules.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/expand.png")}
                              style={styles.logo}
                            />
                          </View>
                        )}
                        <View style={{ marginLeft: 20 }}>
                          <Text
                            style={[
                              styles.baseText,
                              {
                                fontFamily: "Nunito-SemiBold",
                                fontSize: widthPercentageToDP(4),
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                          <Text style={[styles.baseText, styles.smallText]}>
                            Expired Today
                          </Text>
                          {item.isArchived == true ? (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Archived
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Unarchived
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(68),
                        paddingTop: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          { fontSize: widthPercentageToDP(5) },
                        ]}
                      >
                        No Items Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal // expired items this week modal
          hasBackdrop={true}
          backdropColor="#000"
          onBackdropPress={() => this.setState({ EIWModalVisible: false })}
          isVisible={this.state.EIWModalVisible}
          statusBarTranslucent
        >
          <View style={styles.modal}>
            <View style={{ width: widthPercentageToDP(70) }}>
              <View
                style={{
                  width: widthPercentageToDP(68),
                  alignSelf: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: widthPercentageToDP(5),
                    fontFamily: "Nunito-Bold",
                  }}
                >
                  Expired Items this Week
                </Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.expiredItems.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        item.isArchived == true
                          ? this.props.navigation.navigate("ItemArchived", {
                              item: item,
                            })
                          : this.props.navigation.navigate("ItemDetails", {
                              item: item,
                            });
                        this.setState({ EIWModalVisible: false });
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.category === "Food" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/fast-food.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Cosmetics" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/cosmetic.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Medicine" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/capsules.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/expand.png")}
                              style={styles.logo}
                            />
                          </View>
                        )}
                        <View style={{ marginLeft: 20 }}>
                          <Text
                            style={[
                              styles.baseText,
                              {
                                fontFamily: "Nunito-SemiBold",
                                fontSize: widthPercentageToDP(4),
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                          {moment(item.expiryDate, "DD-MMM-YYYY").isSame(
                            Date.now(),
                            "D"
                          ) ? (
                            <Text style={[styles.baseText, styles.smallText]}>
                              Expired Today
                            </Text>
                          ) : (
                            <Text style={[styles.baseText, styles.smallText]}>
                              Expired for{" "}
                              {moment(item.expiryDate, "DD-MMM-YYYY").fromNow(
                                true
                              )}
                            </Text>
                          )}
                          {item.isArchived == true ? (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Archived
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Unarchived
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(68),
                        paddingTop: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          { fontSize: widthPercentageToDP(5) },
                        ]}
                      >
                        No Items Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal // expired items this month modal
          hasBackdrop={true}
          backdropColor="#000"
          onBackdropPress={() => this.setState({ EIMModalVisible: false })}
          isVisible={this.state.EIMModalVisible}
          statusBarTranslucent
        >
          <View style={styles.modal}>
            <View style={{ width: widthPercentageToDP(70) }}>
              <View
                style={{
                  width: widthPercentageToDP(68),
                  alignSelf: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: widthPercentageToDP(5),
                    fontFamily: "Nunito-Bold",
                  }}
                >
                  Expired Items this Month
                </Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.expiredItems.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "M")
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        item.isArchived == true
                          ? this.props.navigation.navigate("ItemArchived", {
                              item: item,
                            })
                          : this.props.navigation.navigate("ItemDetails", {
                              item: item,
                            });
                        this.setState({ EIMModalVisible: false });
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.category === "Food" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/fast-food.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Cosmetics" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/cosmetic.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Medicine" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/capsules.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/expand.png")}
                              style={styles.logo}
                            />
                          </View>
                        )}
                        <View style={{ marginLeft: 20 }}>
                          <Text
                            style={[
                              styles.baseText,
                              {
                                fontFamily: "Nunito-SemiBold",
                                fontSize: widthPercentageToDP(4),
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                          {moment(item.expiryDate, "DD-MMM-YYYY").isSame(
                            Date.now(),
                            "D"
                          ) ? (
                            <Text style={[styles.baseText, styles.smallText]}>
                              Expired Today
                            </Text>
                          ) : (
                            <Text style={[styles.baseText, styles.smallText]}>
                              Expired for{" "}
                              {moment(item.expiryDate, "DD-MMM-YYYY").fromNow(
                                true
                              )}
                            </Text>
                          )}
                          {item.isArchived == true ? (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Archived
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Unarchived
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(68),
                        paddingTop: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          { fontSize: widthPercentageToDP(5) },
                        ]}
                      >
                        No Items Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal // items that will expire this week modal
          hasBackdrop={true}
          backdropColor="#000"
          onBackdropPress={() => this.setState({ IWEWModalVisible: false })}
          isVisible={this.state.IWEWModalVisible}
          statusBarTranslucent
        >
          <View style={styles.modal}>
            <View style={{ width: widthPercentageToDP(70) }}>
              <View
                style={{
                  width: widthPercentageToDP(68),
                  alignSelf: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: widthPercentageToDP(5),
                    fontFamily: "Nunito-Bold",
                  }}
                >
                  Expiring Items this Week
                </Text>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.items.filter((item) =>
                  moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        item.isArchived == true
                          ? this.props.navigation.navigate("ItemArchived", {
                              item: item,
                            })
                          : this.props.navigation.navigate("ItemDetails", {
                              item: item,
                            });
                        this.setState({ IWEWModalVisible: false });
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {item.category === "Food" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/fast-food.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Cosmetics" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/cosmetic.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : item.category === "Medicine" ? (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/capsules.png")}
                              style={styles.logo}
                            />
                          </View>
                        ) : (
                          <View style={styles.fixedLogo}>
                            <Image
                              source={require("../assets/logos/expand.png")}
                              style={styles.logo}
                            />
                          </View>
                        )}
                        <View style={{ marginLeft: 20 }}>
                          <Text
                            style={[
                              styles.baseText,
                              {
                                fontFamily: "Nunito-SemiBold",
                                fontSize: widthPercentageToDP(4),
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                          <Text style={[styles.baseText, styles.smallText]}>
                            Expires on {item.expiryDate}
                          </Text>
                          <Text
                            style={[
                              styles.baseText,
                              styles.smallText,
                              { color: "#ea4c4c" },
                            ]}
                          >
                            {moment(Date.now()).to(
                              item.expiryDate,
                              "DD-MMM-YYYY",
                              "D"
                            )}{" "}
                            Left
                          </Text>
                          {item.isArchived == true ? (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Archived
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.baseText,
                                styles.smallText,
                                { color: "#ea4c4c" },
                              ]}
                            >
                              Unarchived
                            </Text>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(68),
                        paddingTop: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          { fontSize: widthPercentageToDP(5) },
                        ]}
                      >
                        No Items Found
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.boxRow}>
          {[
            {
              id: "data01",
              link: { EITModalVisible: true },
              colors: ["#eee600", "#ffd300", "#ffb347"],
              time: "Today",
              data: this.state.expiredItems.filter((item) =>
                moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "D")
              ).length,
              label: "Expired Items",
            },
            {
              id: "data02",
              link: { EIWModalVisible: true },
              colors: ["#ff8a8a", "#ff6961", "#d9381e"],
              time: "This Week",
              data: this.state.expiredItems.filter((item) =>
                moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
              ).length,
              label: "Expired Items",
            },
            {
              id: "data03",
              link: { EIMModalVisible: true },
              colors: ["#a4de02", "#76ba1b", "#4c9a2a"],
              time: "This Month",
              data: this.state.expiredItems.filter((item) =>
                moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "M")
              ).length,
              label: "Expired Items",
            },
            {
              id: "data04",
              link: { IWEWModalVisible: true },
              colors: ["#58cced", "#3895d3", "#1261a0"],
              time: "This Week",
              data: this.state.items.filter((item) =>
                moment(item.expiryDate, "DD-MMM-YYYY").isSame(Date.now(), "W")
              ).length,
              label: "Expiring Items",
            },
          ].map((data) => {
            return (
              <View style={styles.fixedBox} key={data.id}>
                <TouchableOpacity onPress={() => this.setState(data.link)}>
                  <LinearGradient colors={data.colors} style={styles.box}>
                    <Text style={styles.dataTime}>{data.time}</Text>
                    <Text style={[styles.baseText, styles.dataNum]}>
                      {data.data}
                    </Text>
                    <Text style={styles.dataLabel}>{data.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}
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
    fontSize: widthPercentageToDP(7),
    fontFamily: "Nunito-Bold",
  },
  baseText: {
    fontSize: widthPercentageToDP(3.75),
    fontFamily: "Nunito-SemiBold",
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
  item: {
    width: widthPercentageToDP(68),
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
  fixedLogo: {
    width: widthPercentageToDP(8),
    aspectRatio: 1,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  },
  smallText: {
    color: "#555",
    fontSize: widthPercentageToDP(2.75),
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingTop: 2,
  },
  fixedBox: {
    width: widthPercentageToDP(40),
    aspectRatio: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  box: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    justifyContent: "center",
    padding: 20,
  },
  boxRow: {
    width: widthPercentageToDP(80),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bgTitle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  dataTime: {
    fontSize: widthPercentageToDP(3.5),
    fontFamily: "Nunito-Bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  dataNum: {
    fontSize: widthPercentageToDP(15),
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  dataLabel: {
    fontSize: widthPercentageToDP(3.25),
    fontFamily: "Nunito-SemiBoldItalic",
    textTransform: "uppercase",
    color: "#fff",
  },
});

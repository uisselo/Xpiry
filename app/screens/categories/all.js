import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../db/config";
db();

export default class all extends Component {
  constructor(props) {
    super(props);
    this.state = { itemList: [], inMemoryItems: [] };
    _isMounted = false;
  }

  searchItem = (value) => {
    const filteredItems = this.state.inMemoryItems.filter((item) => {
      let itemLowercase = item.name.toLowerCase();
      let searchTermLowercase = value.toLowerCase();
      return itemLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ itemList: filteredItems });
  };

  componentDidMount() {
    this._isMounted = true;
    const db = firebase.firestore();
    const userRef = db.collection("Users").doc(firebase.auth().currentUser.uid);
    const allItems = db.collection("Items").where("fromUser", "==", userRef);
    allItems.onSnapshot((docs) => {
      const items = [];
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
          });
        }
      });
      if (this._isMounted) {
        this.setState({ itemList: items, inMemoryItems: items });
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
          <Text style={styles.title}>All Items</Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Item"
            onChangeText={(value) => this.searchItem(value)}
            style={styles.baseText}
          />
          <View style={styles.searchIcon}>
            <Icon name="search" size={20} color="#c7c7cd" />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.itemList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  this.props.navigation.navigate("ItemDetails", { item: item })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.category === "Food" ? (
                    <View style={styles.fixedLogo}>
                      <Image
                        source={require("../../assets/logos/fast-food.png")}
                        style={styles.logo}
                      />
                    </View>
                  ) : item.category === "Cosmetics" ? (
                    <View style={styles.fixedLogo}>
                      <Image
                        source={require("../../assets/logos/cosmetic.png")}
                        style={styles.logo}
                      />
                    </View>
                  ) : (
                    <View style={styles.fixedLogo}>
                      <Image
                        source={require("../../assets/logos/capsules.png")}
                        style={styles.logo}
                      />
                    </View>
                  )}
                  <View style={{ marginLeft: 20 }}>
                    <Text style={styles.baseText}>{item.name}</Text>
                    <Text style={[styles.baseText, styles.expiryDate]}>
                      Expires on {item.expiryDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  width: widthPercentageToDP(80),
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  header: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: widthPercentageToDP(7),
    fontFamily: "NunitoSans_700Bold",
  },
  baseText: {
    fontSize: widthPercentageToDP(3.75),
    fontFamily: "NunitoSans_400Regular",
  },
  searchBar: {
    width: widthPercentageToDP(80),
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.05,
    elevation: 2,
    flexDirection: "row",
  },
  searchIcon: {
    position: "absolute",
    right: 0,
    paddingRight: 20,
  },
  item: {
    width: widthPercentageToDP(80),
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
  expiryDate: {
    color: "#ea4c4c",
  },
});

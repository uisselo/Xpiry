import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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

export default class cosmetics extends Component {
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
    const cosmetics = db
      .collection("Items")
      .where("fromUser", "==", userRef)
      .where("itemCategory", "==", "Cosmetics");
    cosmetics.onSnapshot((docs) => {
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
        <View style={styles.title}>
          <Text style={{ fontSize: 30 }}>Cosmetics</Text>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Item"
            onChangeText={(value) => this.searchItem(value)}
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
                <Text>{item.name}</Text>
                <Text style={styles.expiryDate}>
                  Expiration on {item.expiryDate}
                </Text>
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
                <Text style={{ fontSize: 20 }}>No Items Found</Text>
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
  title: {
    width: widthPercentageToDP(80),
    alignSelf: "center",
  },
  searchBar: {
    width: widthPercentageToDP(80),
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    height: 40,
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
    height: 70,
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
  expiryDate: {
    color: "#ea4c4c",
  },
});

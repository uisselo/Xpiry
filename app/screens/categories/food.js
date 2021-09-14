import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../db/config";
db();

export default class food extends Component {
  constructor(props) {
    super(props);
    this.state = { itemList: [] };
    _isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const food = firebase
      .firestore()
      .collection("Items")
      .where("category", "==", "Food");
    food.onSnapshot((docs) => {
      const items = [];
      docs.forEach((doc) => {
        const data = doc.data();
        const fbd = data.expirationDate.toDate();
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
        items.push({
          id: doc.id,
          name: data.name,
          category: data.category,
          expirationDate: ed,
          quantity: data.quantity,
          barcode: data.barcode,
        });
      });
      if (this._isMounted) {
        this.setState({ itemList: items });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
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
                <Text style={styles.expirationDate}>
                  Expiration on {item.expirationDate}
                </Text>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{ width: 350, marginBottom: 10, marginHorizontal: 5 }}
              >
                <Text style={{ fontSize: 30 }}>Food</Text>
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
  item: {
    width: 350,
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
  expirationDate: {
    color: "#ea4c4c",
  },
});

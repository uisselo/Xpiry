import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default class medicine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: 350 }}>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>Medicine</Text>
            <TouchableOpacity style={styles.item}>
              <Text>Pancit Canton</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Century Tuna</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Chicken Noodles</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Sardines</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Mang Tomas</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Heinz Ketchup</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Bearbrand Sterilized Milk</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text>Almond Milk</Text>
              <Text style={styles.expirationDate}>
                Expiration on 16 June 2023
              </Text>
            </TouchableOpacity>
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
  item: {
    height: 70,
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    justifyContent: "center",
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
    color: "#EA4C4C",
  },
});

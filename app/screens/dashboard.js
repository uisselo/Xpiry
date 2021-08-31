import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function dashboard(props) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ width: 350 }}>
          <Text style={{ fontSize: 30, marginBottom: 15 }}>Dashboard</Text>
          <View style={styles.dataContainer}>
            <TouchableOpacity style={styles.data}>
              <Text style={styles.dataNum}>4</Text>
              <Text style={styles.dataLabel}>Expired Items Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.data}>
              <Text style={styles.dataNum}>11</Text>
              <Text style={styles.dataLabel}>Expired Items This Week</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, marginVertical: 15 }}>
            Expired Items Today
          </Text>
          <TouchableOpacity style={styles.item}>
            <Text>Pancit Canton</Text>
            <Text style={styles.itemStatus}>Expired</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Century Tuna</Text>
            <Text style={styles.itemStatus}>Expired</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Biogesic</Text>
            <Text style={styles.itemStatus}>Expired</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text>Dove Lotion</Text>
            <Text style={styles.itemStatus}>Expired</Text>
          </TouchableOpacity>
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
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: {
    height: 100,
    width: 170,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
    elevation: 2
  },
  dataNum: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    right: 10,
  },
  dataLabel: {
    color: "#EA4C4C",
    position: "absolute",
    left: 10,
    bottom: 0,
    paddingBottom: 10,
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
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
    elevation: 2
  },
  itemStatus: {
    color: "#EA4C4C",
  },
});
export default dashboard;

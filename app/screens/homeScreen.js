import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function homeScreen({ navigation }) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity // all items
        style={[
          styles.box,
          {
            backgroundColor: "#4aa3ba",
          },
        ]}
        onPress={() => navigation.navigate("All")}
      >
        <Text style={[styles.text]}>All Items</Text>
        <Image
          source={{ uri: "https://i.imgur.com/L3JFbmd.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity // expired items
        style={[
          styles.box,
          {
            backgroundColor: "#a8896c",
          },
        ]}
        onPress={() => navigation.navigate("Expired")}
      >
        <Text style={[styles.text]}>Expired Items</Text>
        <Image
          source={{ uri: "https://i.imgur.com/YjKWeo4.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity // food category
        style={[
          styles.box,
          {
            backgroundColor: "#ffd2a5",
          },
        ]}
        onPress={() => navigation.navigate("Food")}
      >
        <Text style={[styles.text]}>Food</Text>
        <Image
          source={{ uri: "https://i.imgur.com/tCeuzKA.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity // cosmetics category
        style={[
          styles.box,
          {
            backgroundColor: "#ffb6b9",
          },
        ]}
        onPress={() => navigation.navigate("Cosmetics")}
      >
        <Text style={[styles.text]}>Cosmetics</Text>
        <Image
          source={{ uri: "https://i.imgur.com/ogwnOqn.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity // medicine category
        style={[
          styles.box,
          {
            backgroundColor: "#61b292",
          },
        ]}
        onPress={() => navigation.navigate("Medicine")}
      >
        <Text style={[styles.text]}>Medicine</Text>
        <Image
          source={{ uri: "https://i.imgur.com/3kq4QjT.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity // add item
        style={[
          styles.box,
          {
            backgroundColor: "#fff",
            borderColor: "#8AC6D1",
            borderWidth: 3,
          },
        ]}
      >
        <Text style={[styles.text, { color: "#6C6C6C" }]}>Add Item</Text>
        <Image
          source={{ uri: "https://i.imgur.com/dlU2ozJ.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>
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
  box: {
    width: 170,
    height: 170,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  text: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
    position: "absolute",
    top: 0,
  },
  icon: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
});

export default homeScreen;

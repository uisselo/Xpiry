import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../../db/config";
db();

function userName({ navigation }) {
  const [userName, setUserName] = useState();

  const setName = () => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: userName,
      })
      .then(() => {
        console.log("Update successful!");
        navigation.navigate("TabNavi");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setUserName}
      />
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderColor: "#ea4c4c",
              backgroundColor: "#ea4c4c",
              marginTop: 10,
            },
          ]}
          onPress={setName}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            Complete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  input: {
    flexDirection: "row",
    height: 40,
    width: 350,
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
    width: 350,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default userName;

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../db/config";
db();

function login({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [code, setCode] = useState();

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber("+63" + phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => {
        console.log(user.additionalUserInfo.isNewUser);
        user.additionalUserInfo.isNewUser == true
          ? navigation.navigate("UserName")
          : navigation.navigate("Main");
      })
      .catch((err) => console.log(err));
  };

  if (!verificationId) {
    return (
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
          attemptInvisibleVerification={true}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          style={{ flex: 1 }}
        >
          <View style={{ width: 350, marginBottom: 20 }}>
            <Text style={{ fontSize: 30, marginBottom: 5 }}>Welcome</Text>
            <Text>Enter your phone number to proceed.</Text>
          </View>
          <View style={styles.input}>
            <TextInput editable={false} style={styles.phCode}>
              +63 |
            </TextInput>
            <TextInput
              style={styles.numInput}
              placeholder="Phone number"
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCompleteType="tel"
            />
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  borderColor: "#ea4c4c",
                  backgroundColor: "#ea4c4c",
                  marginVertical: 10,
                },
              ]}
              onPress={sendVerification}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          style={{ flex: 1 }}
        >
          <TextInput
            style={styles.input}
            placeholder="Confirmation Code"
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  borderColor: "#ea4c4c",
                  backgroundColor: "#ea4c4c",
                  marginVertical: 10,
                },
              ]}
              onPress={confirmCode}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    width: widthPercentageToDP(80),
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
  phCode: {
    flexDirection: "row",
  },
  numInput: {
    marginLeft: 5,
    flex: 1,
  },
  btn: {
    height: 40,
    width: widthPercentageToDP(80),
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

export default login;

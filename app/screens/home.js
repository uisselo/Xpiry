import React, { Component, createRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { db } from "../db/config";
db();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      userName: "",
      addItemOptionsModal: false,
      registerModal: false,
      expoPushToken: "",
      notification: false,
    };
    this.notificationListener = createRef();
    this.responseListener = createRef();
    _isMounted = false;
  }

  registerNewUser() {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: this.state.userName,
      })
      .then(() => {
        console.log("Update Successful.");
        this.setState({ registerModal: false });
        firebase
          .firestore()
          .collection("Users")
          .doc(user.uid)
          .set(
            {
              userId: user.uid,
              userName: user.displayName,
              mobileNum: user.phoneNumber,
            },
            { merge: true }
          )
          .then(() => {
            console.log("User added to DB.");
            const userData = {
              userId: user.uid,
              userName: user.displayName,
              mobileNum: user.phoneNumber,
            };
            if (this._isMounted) {
              this.setState({ userProfile: userData });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      if (token) {
        firebase
          .firestore()
          .doc("Users/" + firebase.auth().currentUser.uid)
          .set({ expoToken: token }, { merge: true });
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#ff231f7c",
      });
    }

    return token;
  };

  async componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName == null) {
          this.setState({ registerModal: true });
        } else {
          const userData = {
            userId: user.uid,
            userName: user.displayName,
            mobileNum: user.phoneNumber,
          };
          if (this._isMounted) {
            this.setState({ userProfile: userData });
          }
        }
      }
    });
    await this.registerForPushNotificationsAsync().then((token) =>
      this.setState({ expoPushToken: token })
    );
    this.notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        this.setState({ notification: notification })
      );
    this.responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      Notifications.removeNotificationSubscription(
        this.notificationListener.current
      );
      Notifications.removeNotificationSubscription(
        this.responseListener.current
      );
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Modal // register new user modal
            hasBackdrop={true}
            backdropColor="#000"
            onBackdropPress={() => {
              Alert.alert("Please enter your name.", [
                { text: "OK", onPress: () => console.log("Alert closed.") },
              ]);
            }}
            isVisible={this.state.registerModal}
            statusBarTranslucent
          >
            <View style={[styles.modal, { height: 150 }]}>
              <TextInput
                style={styles.input}
                value={this.state.userName}
                onChangeText={(userName) => this.setState({ userName })}
                placeholder="Enter your name"
              />
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    borderColor: "#ea4c4c",
                    backgroundColor: "#ea4c4c",
                    alignSelf: "center",
                    marginHorizontal: 0,
                    marginTop: 15,
                  },
                ]}
                onPress={() => {
                  this.registerNewUser();
                  this.setState({ registerModal: false });
                }}
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
          </Modal>
          <Modal // add item options modal
            hasBackdrop={true}
            backdropColor="#000"
            onBackdropPress={() =>
              this.setState({ addItemOptionsModal: false })
            }
            isVisible={this.state.addItemOptionsModal}
            statusBarTranslucent
          >
            <View style={styles.modal}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate("ScanBarcode");
                    this.setState({ addItemOptionsModal: false });
                  }}
                >
                  <Text
                    style={{
                      color: "#ea4c4c",
                    }}
                  >
                    Scan Barcode
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate("AddItem");
                    this.setState({ addItemOptionsModal: false });
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    Add manually
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.header}>
            <Text style={{ fontSize: 20 }}>Welcome</Text>
            <Text style={{ fontSize: 30 }}>
              {this.state.userProfile.userName}
            </Text>
          </View>

          <TouchableOpacity // all items
            style={[
              styles.box,
              {
                backgroundColor: "#4aa3ba",
              },
            ]}
            onPress={() => this.props.navigation.navigate("All")}
          >
            <Text style={styles.text}>All Items</Text>
            <Image
              source={{ uri: "https://i.imgur.com/eHsbCtJ.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // expired items
            style={[
              styles.box,
              {
                backgroundColor: "#a8896c",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Expired")}
          >
            <Text style={styles.text}>Expired Items</Text>
            <Image
              source={{ uri: "https://i.imgur.com/YjKWeo4.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // food category
            style={[
              styles.box,
              {
                backgroundColor: "#ffd2a5",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Food")}
          >
            <Text style={styles.text}>Food</Text>
            <Image
              source={{ uri: "https://i.imgur.com/tCeuzKA.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // cosmetics category
            style={[
              styles.box,
              {
                backgroundColor: "#ffb6b9",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Cosmetics")}
          >
            <Text style={styles.text}>Cosmetics</Text>
            <Image
              source={{ uri: "https://i.imgur.com/ogwnOqn.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity // medicine category
            style={[
              styles.box,
              {
                backgroundColor: "#61b292",
              },
            ]}
            onPress={() => this.props.navigation.navigate("Medicine")}
          >
            <Text style={styles.text}>Medicine</Text>
            <Image
              source={{ uri: "https://i.imgur.com/3kq4QjT.png" }}
              style={styles.logo}
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
            onPress={() => this.setState({ addItemOptionsModal: true })}
          >
            <Text style={[styles.text, { color: "#6C6C6C" }]}>Add Item</Text>
            <Image
              source={{ uri: "https://i.imgur.com/dlU2ozJ.png" }}
              style={styles.logo}
            />
          </TouchableOpacity>
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
  box: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(23),
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
  header: {
    width: widthPercentageToDP(80),
    paddingBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  modal: {
    width: widthPercentageToDP(80),
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
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
  input: {
    height: 40,
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    height: 40,
    width: widthPercentageToDP(34),
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

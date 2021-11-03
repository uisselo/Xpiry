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
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { db } from "../db/config";
db();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "Welcome to Xpiry!",
    body: "Have fun exploring the app!",
  },
  trigger: {
    seconds: 30,
  },
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "These items will expire soon",
    body: "Check items that will expire this week!",
  },
  trigger: {
    repeats: true,
    weekday: 1, // Sunday
    hour: 8,
    minute: 0,
  },
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log("Received a notification in the background!");
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      userName: "",
      modalVisible: false,
      expoPushToken: "",
      notification: false,
    };
    this.notificationListener = createRef();
    this.responseListener = createRef();
    _isMounted = false;
  }

  registerNewUser() {
    const user = firebase.auth().currentUser;
    this.state.userName == null || this.state.userName == ""
      ? Alert.alert("Failed", "Please enter your name.", [
          {
            text: "OK",
            onPress: () => {
              console.log("Alert closed.");
            },
          },
        ])
      : user
          .updateProfile({
            displayName: this.state.userName,
          })
          .then(() => {
            console.log("Update Successful.");
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
        const userData = {
          userId: user.uid,
          userName: user.displayName,
          mobileNum: user.phoneNumber,
        };
        if (this._isMounted) {
          this.setState({ userProfile: userData });
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
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        this.props.navigation.navigate("Dashboard");
      });

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
    if (firebase.auth().currentUser.displayName == null) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{ flex: 1 }}
          >
            <TextInput
              style={[styles.input, styles.baseText]}
              value={this.state.userName}
              onChangeText={(userName) => this.setState({ userName })}
              placeholder="Enter your name"
            />
            <View style={styles.bottom}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    borderColor: "#ea4c4c",
                    backgroundColor: "#ea4c4c",
                    marginVertical: 10,
                    marginHorizontal: 0,
                    width: widthPercentageToDP(80),
                  },
                ]}
                onPress={() => this.registerNewUser()}
              >
                <Text
                  style={[
                    styles.baseText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Complete
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    } else
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Modal // add item options modal
              hasBackdrop={true}
              backdropColor="#000"
              onBackdropPress={() => this.setState({ modalVisible: false })}
              isVisible={this.state.modalVisible}
              statusBarTranslucent
            >
              <View style={styles.modal}>
                <View style={styles.row}>
                  <View style={[styles.fixedBtn, { paddingRight: 5 }]}>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        { borderColor: "#ea4c4c", backgroundColor: "#fff" },
                      ]}
                      onPress={() => {
                        this.props.navigation.navigate("ScanBarcode");
                        this.setState({ modalVisible: false });
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          {
                            color: "#ea4c4c",
                          },
                        ]}
                      >
                        Scan Barcode
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.fixedBtn, { paddingLeft: 5 }]}>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        { borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
                      ]}
                      onPress={() => {
                        this.props.navigation.navigate("AddItem");
                        this.setState({ modalVisible: false });
                      }}
                    >
                      <Text
                        style={[
                          styles.baseText,
                          {
                            color: "#fff",
                          },
                        ]}
                      >
                        Add manually
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={styles.header}>
              <Text
                style={[styles.baseText, { fontSize: widthPercentageToDP(5) }]}
              >
                Welcome!
              </Text>
              <Text
                style={{
                  fontSize: widthPercentageToDP(7),
                  fontFamily: "Nunito-Bold",
                }}
              >
                {this.state.userProfile.userName}
              </Text>
            </View>
            <View style={styles.boxRow}>
              <View style={[styles.fixedBox, { paddingRight: 5 }]}>
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
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/grocery.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.fixedBox, { paddingLeft: 5 }]}>
                <TouchableOpacity // expired items
                  style={[
                    styles.box,
                    {
                      backgroundColor: "#C14545",
                    },
                  ]}
                  onPress={() => this.props.navigation.navigate("Expired")}
                >
                  <Text style={styles.text}>Expired Items</Text>
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/expired.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxRow}>
              <View style={[styles.fixedBox, { paddingRight: 5 }]}>
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
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/fast-food.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.fixedBox, { paddingLeft: 5 }]}>
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
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/cosmetic.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.boxRow}>
              <View style={[styles.fixedBox, { paddingRight: 5 }]}>
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
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/capsules.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.fixedBox, { paddingLeft: 5 }]}>
                <TouchableOpacity // add item
                  style={[
                    styles.box,
                    {
                      backgroundColor: "#fff",
                      borderColor: "#F29C1E",
                      borderWidth: 3,
                    },
                  ]}
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <Text style={[styles.text, { color: "#6C6C6C" }]}>
                    Add Item
                  </Text>
                  <View style={styles.fixedLogo}>
                    <Image
                      source={require("../assets/logos/add-to-basket.png")}
                      style={styles.logo}
                    />
                  </View>
                </TouchableOpacity>
              </View>
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
    alignItems: "center",
    paddingVertical: 50,
  },
  baseText: {
    fontFamily: "Nunito-Regular",
    fontSize: widthPercentageToDP(3.75),
  },
  text: {
    padding: 10,
    color: "#fff",
    position: "absolute",
    top: 0,
    fontSize: widthPercentageToDP(4),
    fontFamily: "Nunito-Regular",
  },
  header: {
    width: widthPercentageToDP(80),
    paddingBottom: 15,
  },
  fixedBox: {
    width: widthPercentageToDP(40),
    aspectRatio: 1,
    paddingVertical: 5,
  },
  box: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    justifyContent: "center",
  },
  boxRow: {
    width: widthPercentageToDP(80),
    flexDirection: "row",
  },
  fixedLogo: {
    width: widthPercentageToDP(15),
    aspectRatio: 1,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  },
  modal: {
    width: widthPercentageToDP(80),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 30,
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
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fixedBtn: {
    width: widthPercentageToDP(35),
  },
  btn: {
    padding: 10,
    width: "100%",
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

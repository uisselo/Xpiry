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
    title: "Expired Items Today",
    body: "See items that expired today!",
  },
  trigger: {
    hour: 19,
    minute: 45,
    repeats: true,
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
              {[
                {
                  id: "category01",
                  bg: "#4aa3ba",
                  label: "All Items",
                  link: "All",
                  logo: require("../assets/logos/grocery.png"),
                  text: "#fff",
                },
                {
                  id: "category02",
                  bg: "#c14545",
                  label: "Expired Items",
                  link: "Expired",
                  logo: require("../assets/logos/expired.png"),
                  text: "#fff",
                },
                {
                  id: "category03",
                  bg: "#ffd2a5",
                  label: "Food",
                  link: "Food",
                  logo: require("../assets/logos/fast-food.png"),
                  text: "#fff",
                },
                {
                  id: "category04",
                  bg: "#ffb6b9",
                  label: "Cosmetics",
                  link: "Cosmetics",
                  logo: require("../assets/logos/cosmetic.png"),
                  text: "#fff",
                },
                {
                  id: "category05",
                  bg: "#61b292",
                  label: "Medicine",
                  link: "Medicine",
                  logo: require("../assets/logos/capsules.png"),
                  text: "#fff",
                },
                {
                  id: "category06",
                  bg: "#404969",
                  label: "Others",
                  link: "Others",
                  logo: require("../assets/logos/expand.png"),
                  text: "#fff",
                },
                {
                  id: "category07",
                  bg: "#ff7f5b",
                  label: "Archive",
                  link: "Archive",
                  logo: require("../assets/logos/folders.png"),
                  text: "#fff",
                },
              ].map((category) => {
                return (
                  <View style={styles.fixedBox} key={category.id}>
                    <TouchableOpacity
                      style={[
                        styles.box,
                        {
                          backgroundColor: category.bg,
                        },
                      ]}
                      onPress={() =>
                        this.props.navigation.navigate(category.link)
                      }
                    >
                      <Text style={[styles.text, { color: category.text }]}>
                        {category.label}
                      </Text>
                      <View style={styles.fixedLogo}>
                        <Image source={category.logo} style={styles.logo} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <View style={styles.fixedBox}>
                <TouchableOpacity // add item
                  style={[
                    styles.box,
                    {
                      backgroundColor: "#fff",
                      borderColor: "#f29c1e",
                      borderWidth: 3,
                    },
                  ]}
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <Text style={[styles.text, { color: "#6c6c6c" }]}>
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
    padding: 5,
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
    flexWrap: "wrap",
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
    padding: 8,
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

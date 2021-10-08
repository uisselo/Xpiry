import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export default class journal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ width: widthPercentageToDP(80) }}>
            <Text style={{ fontSize: 30 }}>Journal</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page1")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2860&q=80",
                }}
                style={styles.journal}
              />
              <View style={styles.bgTitle}>
                <Text style={styles.title}>Tips on Medicine Intake</Text>
                <Text>
                  Discusses the importance of medicine intake and the danger of
                  consuming expired medicine.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page2")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1593014290067-93bac771f1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                }}
                style={styles.journal}
              />
              <View style={styles.bgTitle}>
                <Text style={styles.title}>Expired Food</Text>
                <Text>
                  Discusses the danger in consuming expired food and its side
                  effects. Read tips on food safety.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Page3")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                }}
                style={styles.journal}
              />
              <View style={styles.bgTitle}>
                <Text style={styles.title}>Reducing Food Wastes</Text>
                <Text>
                  Read information about food waste and find ways on how you can
                  reduce it in your household.
                </Text>
              </View>
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
  journal: {
    height: heightPercentageToDP(30),
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 0.05,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  bgTitle: {
    position: "absolute",
    backgroundColor: "#f3f3f3",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

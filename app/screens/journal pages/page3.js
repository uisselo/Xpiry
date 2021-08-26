// Reducing Food Wastes

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";

function page3(props) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ width: 350 }}>
          <Text>Page 3</Text>
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
    paddingTop: 50,
  },
});

export default page3;

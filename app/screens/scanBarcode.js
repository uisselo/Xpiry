import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarcodeMask from "react-native-barcode-mask";

function scanBarcode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status == "granted");
  };

  useEffect(() => {
    askForCameraPermission();
    return () => {
      setScanned(false);
    };
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type: " + type + "\nData: " + data);
    navigation.navigate("ScannedBarcode", { data: data });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={[styles.baseText, { margin: 10 }]}>
          No access to camera
        </Text>
        <TouchableOpacity
          style={[
            styles.btn,
            { width: 100, borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
          ]}
          onPress={() => askForCameraPermission()}
        >
          <Text
            style={[
              styles.baseText,
              {
                color: "#fff",
              },
            ]}
          >
            Allow Camera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <BarcodeMask width={widthPercentageToDP(70)} showAnimatedLine={false} />
    </BarCodeScanner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  baseText: {
    fontFamily: "Nunito-Regular",
    fontSize: widthPercentageToDP(3.5),
  },
  description: {
    alignSelf: "center",
    textAlign: "center",
    width: widthPercentageToDP(80),
    color: "white",
    fontFamily: "Nunito-SemiBold",
    fontSize: widthPercentageToDP(5),
  },
  btn: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default scanBarcode;

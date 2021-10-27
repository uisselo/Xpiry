import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.container}>
      <View
        style={{
          width: widthPercentageToDP(80),
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Text style={[styles.baseText, { fontSize: widthPercentageToDP(5) }]}>
          Place the Barcode inside the area.
        </Text>
        <Text style={styles.baseText}>Scanning will start automatically.</Text>
      </View>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 30,
          }}
        />
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
  baseText: {
    fontFamily: "Nunito-Regular",
    fontSize: widthPercentageToDP(3.5),
  },
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    width: widthPercentageToDP(70),
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#e5e5e5",
  },
  btn: {
    // height: 40,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default scanBarcode;

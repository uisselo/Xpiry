import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    navigation.navigate("ScannedBarcode", { data: data });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <TouchableOpacity
          style={[
            styles.btn,
            { width: 100, borderColor: "#ea4c4c", backgroundColor: "#ea4c4c" },
          ]}
          onPress={() => askForCameraPermission()}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            Allow Camera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={{ fontSize: 30, marginTop: 20, marginBottom: 10 }}>
        {text}
      </Text>
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
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#e5e5e5",
  },
  btn: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default scanBarcode;

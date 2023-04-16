import { StatusBar } from 'expo-status-bar';
import { useFonts } from "expo-font";
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {useState, useEffect} from "react";
import {BarCodeScanner} from "expo-barcode-scanner";
import {Provider} from "react-redux";

import Main from "./src/Main";
import store from "./src/store";



export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(null);


  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  if(!fontsLoaded) {
    return null;
  }

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

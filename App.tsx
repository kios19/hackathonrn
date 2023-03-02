import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Ship } from "./src/navigation/ship";
import { getPersistor, getStore } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";

import * as eva from '@eva-design/eva';

const myStore = getStore();
const myPersistor = getPersistor();

const MyStack = () => {
  return (
    <>
        <NativeBaseProvider>
        <Provider store={myStore}>
          <Ship />
          </Provider>
        </NativeBaseProvider>
        
    </>
  );
};

export default function App( {navigation}) {
  return <MyStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

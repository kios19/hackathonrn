import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import { pagedata } from "../types"; 
import styles from "../styles/style";

interface Props {
  navigation: any;
}


const ViewMachine: React.FC<Props> = ({ navigation}) => {
  const data = useSelector((state: { pagedata: pagedata }) => state.pagedata);
  const [editedData, setEditedData] = useState(data);

  const handleModelChange = (value: string) => {
    setEditedData({ ...editedData, model: value });
  };

  const handleWeightChange = (value: string) => {
    setEditedData({ ...editedData, weight: value });
  };

  const handlePrintEditedData = async () => {
    // Load data from AsyncStorage
    const storedData = await AsyncStorage.getItem("inventoryitems");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    // Find the index of the item with the matching model and weight
    const index = parsedData.findIndex(
      (item: any) =>
        item.model === editedData.model && item.weight === editedData.weight
    );

    // Remove the item from the array if it exists
    if (index !== -1) {
      const updatedData = [...parsedData];
      updatedData.splice(index, 1);

      // Stringify the updated data and save it back to AsyncStorage
      const stringifiedData = JSON.stringify(updatedData);
      await AsyncStorage.setItem("inventoryitems", stringifiedData);
    }

    navigation.push("Home")
  };

  const handleAttributeChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const newAttributes = [...editedData.attributes];
    newAttributes[index][key] = value;
    setEditedData({ ...editedData, attributes: newAttributes });
  };

  return (
    <VStack style={styles.pageDefaults}>
      <HStack style={styles.topbar}>
        <Text bold fontSize="lg">
          Details
        </Text>
      </HStack>

      <FormControl.Label>Model name</FormControl.Label>
      <Input
        bg="#e5fbff"
        isDisabled={true}
        variant="filled"
        placeholder="Model"
        style={{
          width: "0%",
          borderRadius: 10,
        }}
        value={editedData.model}
        onChangeText={handleModelChange}
      />

      <FormControl.Label>Weight</FormControl.Label>
      <Input
        bg="#e5fbff"
        variant="filled"
        placeholder="Weight"
        isDisabled={true}
        style={{
          width: "0%",
          borderRadius: 10,
        }}
        value={editedData.weight}
        onChangeText={handleWeightChange}
      />
      <Box>
        {data.attributes.map((attribute, index) => {
          return (
            <Box key={index}>
              {Object.entries(attribute).map(([key, value]) => {
                return (
                  <VStack space={2} style={{ marginTop: "5%" }} key={key}>
                    {/* <Text>{key}:</Text>
                    <Text>{value}</Text> */}
                    <FormControl.Label>{key}</FormControl.Label>
                    <Input
                    isDisabled={true}
                      bg="#e5fbff"
                      variant="filled"
                      placeholder="Attribute name"
                      style={{
                        borderRadius: 10,
                      }} 
                      value={value}
                      onChangeText={(newValue) =>
                        handleAttributeChange(index, key, newValue)
                      }
                    />
                  </VStack>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Button colorScheme="blue" style={styles.loginbutton} onPress={handlePrintEditedData}>Delete item</Button>
    </VStack>
  );
};

export default ViewMachine;

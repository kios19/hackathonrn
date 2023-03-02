import React, { useState, useEffect } from "react";
import styles from "../../styles/style";
import { View, ScrollView } from "react-native";
import {
  HStack,
  Button,
  Input,
  VStack,
  Text,
  Box,
  Select,
  Progress,
  IconButton,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChildComponentProps {
  updateVariable: (value: number) => void;
  updateAttributes: (value: Array<any>) => void;
  attributes: Array<string>;
  base: Record<string, any>;
  getHome: () => void;
}

function Step3(props: ChildComponentProps) {
  const [inputs, setInputs] = useState<string[]>([""]);
  const attributesData: Array<any> = [];
  var inventory: any[] = [];

  const getInventory = async () => {
    try {
      const value = await AsyncStorage.getItem("inventorytype");
      if (value !== null) {
        //return JSON.parse(value);
        inventory = JSON.parse(value);

      }
      console.log("nothing found"); // Return default inventory if no data found
    } catch (error) {
      console.log(error);
    }
  };

  const saveInventory = async (inventory) => {
    try {
      await AsyncStorage.setItem("inventorytype", JSON.stringify(inventory));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {

    if (attributesData.length < props.attributes.length) {
      console.log("🚩🚩🚩🚩🚩🚩🚩🚩");
    } else {
      const temp = { ...props.base, attributes: attributesData };
      inventory.push(temp);
      await saveInventory(inventory);
      props.getHome();
    }
  };

  const handleAttributeChange = (value: string, attribute: string) => {
    const attributeObj = { [attribute]: value };
    attributesData.push(attributeObj);
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <VStack style={styles.pageDefaults}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack style={styles.topbar}>
          <Text fontSize="sm">Specify the type of input for the attribute</Text>
        </HStack>

        <VStack>
          {props.attributes.map((attribute, index) => (
            <Box key={index}>
              <Select
                minWidth="200"
                accessibilityLabel={`Choose ${attribute} type`}
                placeholder={`choose ${attribute} type`}
                onValueChange={(value) =>
                  handleAttributeChange(value, attribute)
                }
                mt="1"
              >
                <Select.Item label="Text" value="text" />
                <Select.Item label="Number" value="number" />
                <Select.Item label="Date" value="date" />
                <Select.Item label="Checkbox" value="checkbox" />
              </Select>
            </Box>
          ))}
        </VStack>

        <Button
          variant="solid"
          colorScheme="blue"
          onPress={handleSubmit}
          style={{ marginBottom: "130%", marginTop: "10%" }}
        >
          Save
        </Button>
      </ScrollView>
    </VStack>
  );
}

export default Step3;

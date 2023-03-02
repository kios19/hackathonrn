import React, { useState } from "react";
import styles from "../../styles/style";
import { View, ScrollView } from "react-native";
import {
  HStack,
  Button,
  Input,
  VStack,
  Text,
  Progress,
  IconButton,
} from "native-base";
import { Add } from "@expo/vector-icons";

interface ChildComponentProps {
  updateVariable: (value: number) => void;
  updateAttributes: (value: array) => void;
}

function Step2(props: ChildComponentProps) {
  const [inputs, setInputs] = useState<string[]>([""]);
  const [step, setSteps] = useState(10);

  const handleInputChange = (text: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleSubmit = () => {
    console.log(inputs);
    props.updateAttributes(inputs)
    props.updateVariable(99)
  };

  return (
    <VStack style={styles.pageDefaults}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <HStack style={styles.topbar}>
        <Text fontSize="sm">Add Attributes for the item</Text>
        <Button 
        onPress={handleAddInput}
        size="sm"
         variant={"ghost"}>
          Add
        </Button>
      </HStack>

      
      <VStack space={3} style={{ width: "100%", marginBottom: 20 }}>
        {inputs.map((value, index) => (
          <Input
            bg="#e5fbff"
            variant="filled"
            placeholder="Attribute name"
            style={{
              borderRadius: 10,
            }}
            key={index}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        ))}
        
      </VStack>
      
      <Button
        variant="solid"
        colorScheme="blue"
        onPress={handleSubmit}
        style={{ marginBottom: '130%' }}
      >
        Save
      </Button>
      

      </ScrollView>
    </VStack>
  );
};

export default Step2;

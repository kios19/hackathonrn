import React, { useState } from "react";
import styles from "../styles/style";
import { View, TextInput, Button, ScrollView } from "react-native";
import { HStack, Input, VStack, Text, Progress } from "native-base";
import Step1 from "../home/steps/step1";
import Step2 from "../home/steps/step2";
import Step3 from "../home/steps/step3";

interface Props {
  navigation: any;
}

interface Attribute {
  name: string;
  value: string;
}

interface Base {
  [key: string]: string;
}

const NewInventory: React.FC<Props> = ({ navigation }) => {
  const [steps, setSteps] = useState<number>(33.3);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [base, setBase] = useState<Base>({});


  const updateVariable = (value: number): void => setSteps(value);

  const updateBase = (value: Base): void => setBase(value);

  const updateAttributes = (value: Attribute[]): void => setAttributes(value);

  const getHome = (): void => navigation.push("Home");


  return (
    <VStack style={styles.pageDefaults}>
      <HStack style={styles.topbar}>
        <Text bold fontSize="lg">
          Create new machine type
        </Text>
      </HStack>

      <View style={styles.progressHolder}>
        <Progress colorScheme="emerald" value={steps} mx="4" />
      </View>

      <ScrollView>
        {steps == 33.3 ? (
          <Step1 
          updateVariable={updateVariable}
          updateBase={updateBase}
           />
        ) : steps == 66 ? (
          <Step2
            updateVariable={updateVariable}
            updateAttributes={updateAttributes}
          />
        ) : (
          <Step3
            attributes={attributes}
            updateVariable={updateVariable}
            base={base}
            updateAttributes={updateAttributes}
            getHome={getHome}
          />
        )}
      </ScrollView>
    </VStack>
  );
};

export default NewInventory;

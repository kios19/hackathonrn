import React, { useState } from "react";
import styles from "../../styles/style";
import { View, Platform } from "react-native";
import {
  HStack,
  Input,
  VStack,
  Text,
  Progress,
  FormControl,
  Button,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { steps } from "../../globals";

interface ChildComponentProps {
  updateVariable: (value: number) => void;
  updateBase: (value: Record<string, unknown>) => void;
}

function Step1(props: ChildComponentProps) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [weight, setWeight] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameerror, setNameerror] = useState(false);
  const [modelerror, setModelerror] = useState(false);
  const [weighterror, setWeighterror] = useState(false);

  const onChange = (event: Event, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    setDate(date.toLocaleDateString());
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const validate = () => {
    if (name.length <= 0) {
      setNameerror(true);
    }
    if (model.length <= 0) {
      setModelerror(true);
    }
    if (weight.length <= 0) {
      setWeighterror(true);
    } else {
      var og = {
        name: name,
        model: model,
        weight: weight,
        manufacture_date: date,
      };
      props.updateBase(og);
      props.updateVariable(66);
    }
  };
  return (
    <VStack style={styles.pageDefaults}>
      <HStack style={styles.topbar}>
        <Text fontSize="sm">Specifications</Text>
      </HStack>

      <VStack>
        <FormControl isRequired isInvalid={nameerror}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            placeholder="Title of machine"
            value={name}
            bg="#e5fbff"
            onChangeText={setName}
            variant="filled"
            style={{
              borderRadius: 10,
            }}
          ></Input>
          <FormControl.ErrorMessage>
            please check username.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={modelerror}>
          <FormControl.Label>Model</FormControl.Label>
          <Input
            placeholder="Model of machine"
            value={model}
            bg="#e5fbff"
            onChangeText={setModel}
            variant="filled"
            style={{
              borderRadius: 10,
            }}
          ></Input>
          <FormControl.ErrorMessage>
            please check model.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={weighterror}>
          <FormControl.Label>Weight</FormControl.Label>
          <Input
            placeholder="Name of machine"
            value={weight.toString()}
            bg="#e5fbff"
            onChangeText={setWeight}
            variant="filled"
          ></Input>
          <FormControl.ErrorMessage>
            please check weight.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl>
          <FormControl.Label>Manufacture Date</FormControl.Label>
          <View>
            <View>
              <Button size="sm" variant="subtle" onPress={showDatepicker}>
                Pick date
              </Button>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <FormControl.ErrorMessage>
            please check Date.
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          isLoading={loading}
          size="md"
          variant="solid"
          colorScheme="blue"
          style={styles.loginbutton}
          onPress={() => {
            validate();
          }}
        >
          Proceed
        </Button>
      </VStack>
    </VStack>
  );
}

export default Step1;

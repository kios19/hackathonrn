import React, { useState, useEffect } from "react";
import styles from "../styles/style";
import { View,  Pressable, Platform } from "react-native";
import {
  Button,
  HStack,
  Input,
  VStack,
  Text,
  Progress,
  Select,
  Checkbox,
  Box,
  FormControl,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

interface Props {
  navigation: any;
}



const NewMachine: React.FC<Props> = ({ navigation }) => {
  const [types, setTypes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedname, setSelectedname] = useState("Select a category");
  const [attributes, setAttributes] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");

  const showDatepicker = () => {
    showMode("date");
  };

  const getItems = async () => {
    try {
      const value = await AsyncStorage.getItem("inventoryitems");
      if (value !== null) {
        var temp = JSON.parse(value);
        setItems(temp);
      }
    } catch (error) {
      console.log(error);
      //return inventory; // Return default inventory if error occurs
    }
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const saveItems = async (tems) => {
    try {
      await AsyncStorage.setItem("inventoryitems", JSON.stringify(tems));
      navigation.push("Home");
    } catch (error) {
      console.log(error);
    }
  };

  const getInventory = async () => {
    try {
      const value = await AsyncStorage.getItem("inventorytype");
      if (value !== null) {
        var temp = JSON.parse(value);
        setTypes(temp);
      }
      console.log(types); // Return default inventory if no data found
    } catch (error) {
      console.log(error);
      //return inventory; // Return default inventory if error occurs
    }
  };

  const handleAttributeChange = (value: string) => {
    // const attributeObj = { [attribute]: value };
    // attributesData.push(attributeObj);

    setSelectedname(value.name);
    setAttributes(value);
    setSelected(true);
  };


  useEffect(() => {
    getInventory();
    getItems();
  }, []);

  return (
    <VStack style={styles.pageDefaults}>
      <HStack style={styles.topbar}>
        <Text bold fontSize="lg">
          New Machine
        </Text>
      </HStack>

      <Box>
        <FormControl.Label isRequired>Pick machine type</FormControl.Label>
        <Select
          minWidth="200"
          bg="#e5fbff"
          variant="filled"
          selectedValue={selectedname}
          style={{
            borderRadius: 10,
          }}
          //accessibilityLabel={`Choose ${attribute} type`}
          placeholder={selectedname}
          onValueChange={(value) => handleAttributeChange(value)}
          mt="1"
        >
          {types.map((value, index) => (
            <Select.Item label={value.name} value={value} />
          ))}
        </Select>

        <Pressable onPress={()=> navigation.push("New")}>
        <HStack style={styles.addType}>
          <Ionicons name="add-circle-outline" size={30} color="green" />
          <Text bold fontSize="xs">
            add new type
          </Text>
        </HStack>
        </Pressable>
      </Box>

      {selected ? (
        <VStack>
          {attributes["attributes"].map((value, index) => {
            const key = Object.keys(value)[0];
            return (
              <FormControl isRequired>
                <FormControl.Label>
                  {"Fill " + Object.keys(value)[0]}
                </FormControl.Label>
                {value[key] == "text" ? (
                  <Input
                    placeholder={Object.keys(value)[0]}
                    value={formValues[key] || ""}
                    bg="#e5fbff"
                    //onChangeText={setName}
                    onChangeText={(text) => {
                      console.log(value[key]);
                      setFormValues({ ...formValues, [key]: text });
                    }}
                    variant="filled"
                    //bg="#e0f1fd"
                    style={{
                      borderRadius: 10,
                    }}
                  ></Input>
                ) : value[key] == "number" ? (
                  <Input
                    placeholder={Object.keys(value)[0]}
                    value={formValues[key] || ""}
                    bg="#e5fbff"
                    //onChangeText={setName}
                    onChangeText={(text) => {
                      console.log(value[key]);
                      setFormValues({ ...formValues, [key]: text });
                    }}
                    variant="filled"
                    //bg="#e0f1fd"
                    style={{
                      borderRadius: 10,
                    }}
                  ></Input>
                ) : value[key] == "date" ? (
                  <View>
                    <View>
                      <Button
                        size="sm"
                        variant="subtle"
                        onPress={showDatepicker}
                      >
                        Pick date
                      </Button>
                    </View>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        //is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || date;
                          setShow(Platform.OS === "ios");
                          setDate(selectedDate);
                          console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️");
                          var ini = Object.keys(value)[0];
                          setFormValues({ ...formValues, [key]: selectedDate });
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <Checkbox
                    value={key}
                    my={2}
                    isChecked={formValues[key]}
                    onChange={(isChecked) =>
                      setFormValues((prevState) => ({
                        ...prevState,
                        [key]: isChecked ? true : false,
                      }))
                    }
                  >
                    {key}
                  </Checkbox>
                )}

                <FormControl.ErrorMessage>
                  please check username.
                </FormControl.ErrorMessage>
              </FormControl>
            );
          })}
        </VStack>
      ) : (
        <></>
      )}

      <Button
        //isLoading={loading}
        isDisabled={!selected}
        size="md"
        variant="solid"
        colorScheme="blue"
        style={styles.loginbutton}
        onPress={async () => {
          var obj = {
            type: attributes.name,
            model: attributes.model,
            weight: attributes.weight,
          };

          var things = [];
          things.push(formValues);
          obj["attributes"] = things;

          const temp = [...items, obj];
          console.log(temp);
          await saveItems(temp);
        }}
      >
        Proceed
      </Button>
    </VStack>
  );
};

export default NewMachine;

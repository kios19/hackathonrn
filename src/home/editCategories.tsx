import React, { useState, useEffect } from "react";
import styles from "../styles/style";
import {
  Button,
  HStack,
  Input,
  VStack,
  Text,
  Select,
  Divider,
  Box,
  Pressable,
  FormControl,
  ScrollView,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Attribute {
  [key: string]: string;
}

interface InventoryType {
  name: string;
  weight: string;
  model: string;
  attributes: Attribute[];
}


interface Props {
  navigation: any
}

const EditCategory: React.FC<Props> = ({ navigation }) => {
  const [types, setTypes] = useState<InventoryType[]>([]);

  const [weight, setWeight] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [attributeType, setAttributeType] = useState<string>("");
  const [newAttributeType, setNewAttributeType] = useState<string>("Select attribute type");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [showAddAttribute, setShowAddAttribute] = useState<boolean>(false);

  const getInventory = async () => {
    try {
      const value = await AsyncStorage.getItem("inventorytype");
      if (value !== null) {
        var temp = JSON.parse(value);
        setTypes(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  const handleWeightChange = (value: string, index: number) => {
    let newTypes = [...types];
    newTypes[index] = { ...newTypes[index], weight: value };
    setTypes(newTypes);
    setWeight(value);
  };

  const handleModelChange = (value: string, index: number) => {
    let newTypes = [...types];
    newTypes[index] = { ...newTypes[index], model: value };
    setTypes(newTypes);
    setModel(value);
  };

  const handleAttributeChange = (
    value: string,
    key: string,
    index: number
  ) => {
    let newTypes = [...types];
    newTypes[index] = {
      ...newTypes[index],
      attributes: [{ [key]: value }],
    };
    setTypes(newTypes);
    setAttributeType(value);
  };

  const handleAttributeDelete = (key: string, index: number) => {
    let newTypes = [...types];
    let newAttributes = [...newTypes[index].attributes];
    newAttributes = newAttributes.filter(
      (attribute) => !attribute.hasOwnProperty(key)
    );
    newTypes[index].attributes = newAttributes;
    setTypes(newTypes);
  };

  const handleNewAttributeAdd = (index: number) => {
    if (newAttributeType && newAttributeValue) {
      let newTypes = [...types];
      let newAttributes = [...newTypes[index].attributes];
      newAttributes.push({
        [newAttributeValue]: newAttributeType,
      });
      newTypes[index].attributes = newAttributes;
      setTypes(newTypes);
      setNewAttributeType("");
      setNewAttributeValue("");
      setShowAddAttribute(false);
    }
  };

  const saveInventory = async () => {
    try {
      const jsonValue = JSON.stringify(types);
      await AsyncStorage.setItem("inventorytype", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack style={styles.pageDefaults}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack style={styles.topbar}>
          <Text bold fontSize="lg">
            Edit Categories
          </Text>
        </HStack>

        {types.map((value, index) => (
          <VStack key={index}>
            <Text bold fontSize="md" style={{ marginTop: 40 }}>
              {value.name}
            </Text>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />

            <FormControl.Label>Weight</FormControl.Label>
            <Input
              placeholder={Object.keys(value)[0]}
              value={weight || value.weight}
              bg="#e5fbff"
              onChangeText={(text) => handleWeightChange(text, index)}
              variant="filled"
              style={{
                borderRadius: 10,
              }}
            ></Input>

            <FormControl.Label>Model</FormControl.Label>
            <Input
              placeholder={Object.keys(value)[0]}
              value={model || value.model}
              bg="#e5fbff"
              onChangeText={(text) => handleModelChange(text, index)}
              variant="filled"
              style={{
                borderRadius: 10,
              }}
            ></Input>

            <Box
              bg="green"
              rounded="lg"
              style={styles.attributebox}
              borderColor="coolGray.200"
              //borderWidth="1"
            >
              <Text
                bold
                style={{
                  color: "grey",
                  alignSelf: "flex-start",
                  marginLeft: "1%",
                }}
              >
                attributes
              </Text>
              <Divider />
              {value.attributes.map((attribute, attrIndex) => (
                <React.Fragment key={attrIndex}>
                  {Object.entries(attribute).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <FormControl.Label
                        style={{ alignSelf: "flex-start", marginLeft: "5%" }}
                      >
                        {key}
                      </FormControl.Label>
                      <HStack style={styles.attributecontainer}>
                        <Select
                          minWidth="90%"
                          width="95%"
                          bg="#e5fbff"
                          accessibilityLabel={`Choose ${attribute} type`}
                          placeholder={value}
                          onValueChange={(value) =>
                            handleAttributeChange(value, key, index)
                          }
                          mt="1"
                        >
                          <Select.Item label="Text" value="text" />
                          <Select.Item label="Number" value="number" />
                          <Select.Item label="Date" value="date" />
                          <Select.Item label="Checkbox" value="checkbox" />
                        </Select>
                        <Pressable
                          onPress={() => handleAttributeDelete(key, index)}
                        >
                          <Ionicons
                            name="remove-circle"
                            size={32}
                            color="red"
                          />
                        </Pressable>
                      </HStack>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}

              {showAddAttribute && (
                <VStack space={2} style={styles.addContainer}>
                  <Select
                    minWidth="95%"
                    width="95%"
                    bg="#e5fbff"
                    accessibilityLabel="Select attribute type"
                    placeholder={newAttributeType}
                    onValueChange={(value) => setNewAttributeType(value)}
                    mt="1"
                  >
                    <Select.Item label="Text" value="text" />
                    <Select.Item label="Number" value="number" />
                    <Select.Item label="Date" value="date" />
                    <Select.Item label="Checkbox" value="checkbox" />
                  </Select>
                  <Input
                    width="95%"
                    bg="#e5fbff"
                    placeholder="Enter attribute name"
                    value={newAttributeValue}
                    onChangeText={(text) => setNewAttributeValue(text)}
                  />
                  <Button
                    size="sm"
                    style={{ width: "95%" }}
                    variant="solid"
                    colorScheme="blue"
                    onPress={() => handleNewAttributeAdd(index)}
                    isDisabled={!newAttributeType || !newAttributeValue}
                  >
                    Add
                  </Button>
                </VStack>
              )}

              <Button
                size="sm"
                style={{ width: "95%", marginTop: 20 }}
                variant="subtle"
                colorScheme="blue"
                onPress={() => setShowAddAttribute(true)}
              >
                ADD NEW ATTRIBUTE
              </Button>
            </Box>
          </VStack>
        ))}

        <Button
          size="md"
          variant="solid"
          colorScheme="blue"
          style={styles.savebutton}
          onPress={async () => {
            await saveInventory();
            navigation.push("Home")
          }}
        >
          SAVE CHANGES
        </Button>
      </ScrollView>
    </VStack>
  );
};

export default EditCategory;

import styles from "../styles/style";
import {
  VStack,
  Text,
  HStack,
  Avatar,
  Button,
  Box,
  Pressable,
  HamburgerIcon,
  ScrollView,
  Input,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import React, { useState, useRef, useCallback } from "react";
import { Image, SectionList, View, RefreshControl } from "react-native";
//@ts-ignore
import Drawer from "react-native-drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";

interface Category {
  name: string;
}

interface Item {
  model: string;
  type: string;
  weight: string;
  manufacture_date: string;
}

interface InventoryType {
  name: string;
}

interface Props {
  navigation: any;
}

const Landing: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState([]);
  const [sectioneditems, setSectionedItems] = useState<SectionedItem[]>([]);
  const [isopen, setIsOpen] = useState(false);
  const [myTypes, setMyTypes] = useState([]);
  const drawerRef = useRef<Drawer>(null);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  // Function to retrieve categories from Async Storage
  const getCategories = async (): Promise<Category[]> => {
    try {
      const categories = await AsyncStorage.getItem("categories");
      if (categories !== null) {
        setCategories(JSON.parse(categories));
        return JSON.parse(categories);
      }
      return []; // return an empty array if no categories exist
    } catch (error) {
      console.log(error);
      return []; // return an empty array if there's an error
    }
  };

  const onRefresh = React.useCallback(() => {
    getItems();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getInventoryData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("inventory");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      setInventory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("inventoryitems");
      if (value !== null) {
        const temp = JSON.parse(value);
        setItems(temp);
        const obResult = temp.reduce((acc: any, cur: Item) => {
          const { type, manufacture_date, ...other } = cur;
          const date = Date.parse(manufacture_date);
          if (!acc[type]) {
            acc[type] = {
              title: type,
              data: [{ ...other, manufacture_date: date }],
            };
          } else {
            acc[type].data.push({ ...other, manufacture_date: date });
          }
          return acc;
        }, {});
        const obFinal = Object.values(obResult);
        setSectionedItems(obFinal);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getMyTypes = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("inventorytype");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      const uniqueTypes = data.reduce((acc: string[], cur: InventoryType) => {
        if (!acc.includes(cur.name)) {
          acc.push(cur.name);
        }
        return acc;
      }, []);
      setMyTypes(uniqueTypes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  interface Category {
    name: string;
  }

  const newInventory = () => {
    navigation.push("New");
  };
  const newMachine = () => {
    navigation.push("Newmachine");
  };

  const editCategory = () => {
    navigation.navigate("Editcategories");
  };

  const openDrawer = () => {
    drawerRef.current.open();
    setIsOpen(true);
  };

  const closeDrawer = () => {
    console.log("pressed");
    drawerRef.current.close();
    setIsOpen(false);
  };

  function filterButton(text: string) {
    AsyncStorage.getItem("inventoryitems").then(async (value) => {
      // Parse the value to an object
      const inventory = JSON.parse(value);

      const filteredModels = inventory.filter((item) =>
        item.model.includes(text)
      );
      console.log(text);

      console.log(filteredModels);

      try {
        const value = await AsyncStorage.getItem("inventoryitems");
        if (value !== null) {
          const temp = JSON.parse(value);
          const chainsawItems = temp.filter((item) => item.type.includes(text));
          setItems(chainsawItems);
          const obResult = chainsawItems.reduce((acc, cur) => {
            const { type, ...other } = cur;
            if (!acc[type]) {
              acc[type] = {
                title: type,
                data: [other],
              };
            } else {
              acc[type].data.push(other);
            }
            return acc;
          }, {});

          const obFinal = Object.values(obResult);
          setSectionedItems(obFinal);
          closeDrawer();
        } else {
          console.log("nothing found");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  useEffect(() => {
    getCategories();
    getInventoryData();
    getItems();
    getMyTypes();
  }, []);

  return (
    <Drawer
      type="static"
      ref={drawerRef}
      content={
        <VStack>
          <VStack
            space={2}
            style={{
              marginTop: 40,
              width: "100%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <HStack style={styles.closebar}>
              <Text bold>Menu</Text>
              <Pressable onPress={closeDrawer}>
                <Ionicons name="close-circle-outline" size={30} color="black" />
              </Pressable>
            </HStack>
            {myTypes.length > 0 ? (
              <HStack>
                <Text bold style={styles.drawerheader}>
                  Filter by Category
                </Text>
              </HStack>
            ) : (
              <Box></Box>
            )}

            {myTypes.map((value, index) => (
              <Button
                variant="subtle"
                colorScheme="blue"
                onPress={() => {
                  filterButton(value);
                }}
                style={{ width: "80%" }}
              >
                {value}
              </Button>
            ))}

            <Box style={styles.drawerheader}>
              <Text bold>Register New</Text>
            </Box>

            <Button
              variant="subtle"
              colorScheme="blue"
              onPress={newInventory}
              style={{ width: "80%" }}
            >
              New Category
            </Button>

            <Button
              variant="subtle"
              colorScheme="blue"
              onPress={newMachine}
              style={{ width: "80%" }}
            >
              New Machine
            </Button>

            <Box style={styles.drawerheader}>
              <Text bold>Manage Inventory</Text>
            </Box>

            <Button
              variant="subtle"
              colorScheme="blue"
              onPress={editCategory}
              style={{ width: "80%" }}
            >
              Edit Categories
            </Button>
          </VStack>
        </VStack>
      }
      openDrawerOffset={100}
      //styles={drawerStyles}
      tweenHandler={Drawer.tweenPresets.parallax}
    >
      <VStack style={styles.pageDefaults}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <HStack style={styles.topbar}>
            <HStack space={3} style={styles.menuholder}>
              <Pressable
                onPress={() => {
                  if (isopen) {
                    closeDrawer();
                  } else {
                    openDrawer();
                  }
                }}
              >
                <Ionicons name="menu-outline" size={30} color="black" />
              </Pressable>
              <Text bold fontSize="lg">
                My Inventory
              </Text>
            </HStack>

            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
          </HStack>

          <VStack style={{ marginBottom: 20 }}>
            <Input
              //bg="#e5fbff"
              variant="underlined"
              placeholder="Search for machine type"
              style={{
                borderRadius: 20,
              }}
              onChangeText={(text) => {
                AsyncStorage.getItem("inventoryitems").then(async (value) => {
                  // Parse the value to an object
                  const inventory = JSON.parse(value);

                  const filteredModels = inventory.filter((item) =>
                    item.model.includes(text)
                  );
                  console.log(text);

                  console.log(filteredModels);

                  try {
                    const value = await AsyncStorage.getItem("inventoryitems");
                    if (value !== null) {
                      const temp = JSON.parse(value);
                      const chainsawItems = temp.filter((item) =>
                        item.type.includes(text)
                      );
                      setItems(chainsawItems);
                      const obResult = chainsawItems.reduce((acc, cur) => {
                        const { type, ...other } = cur;
                        if (!acc[type]) {
                          acc[type] = {
                            title: type,
                            data: [other],
                          };
                        } else {
                          acc[type].data.push(other);
                        }
                        return acc;
                      }, {});

                      const obFinal = Object.values(obResult);
                      console.log(obFinal);
                      setSectionedItems(obFinal);
                      console.log("***********");
                    } else {
                      console.log("nothing found");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                });
              }}
            />
          </VStack>

          <VStack style={{ marginBottom: 40, marginTop: 30 }}>
            {sectioneditems.length <= 0 ? (
              <VStack space={4} style={styles.empty}>
                <Ionicons name="file-tray-outline" size={30} color="black" />
                <Text bold>Nothing to show</Text>
              </VStack>
            ) : (
              <SectionList
                sections={sectioneditems}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      dispatch({
                        type: "ADD_PAGEDATA",
                        payload: item,
                      });
                      navigation.navigate("View");
                    }}
                  >
                    <Box
                      borderRadius="lg"
                      bg={"#e5fbff"}
                      style={[styles.cardItem, styles.shadowProp]}
                      alignSelf="center"
                    >
                      <HStack
                        space={5}
                        style={{ alignContent: "space-between", width: "100%" }}
                      >
                        <Image
                          resizeMethod="auto"
                          resizeMode="contain"
                          style={{ width: 190, height: 120 }}
                          source={{
                            uri: "https://github.com/kios19/assets/blob/master/vecteezy_bulldozer-construction-machinery-vector-isometric_-removebg-preview.png?raw=true",
                          }}
                        />
                        <VStack alignItems="flex-end">
                          <Text bold fontSize="md">
                            {item.model}
                          </Text>
                          <Text
                            color={"gray.400"}
                            fontSize="sm"
                          >{`weight: ${item.weight} kg`}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Pressable>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text bold fontSize="md" style={styles.header}>
                    {title}
                  </Text>
                )}
              />
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Drawer>
  );
};

export default Landing;

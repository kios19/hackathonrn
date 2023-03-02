import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import Testa from "../auth/test";
import Login from "../auth/login";
import Landing from "../home/landing";
import NewInventory from "../home/newinventory";
import NewMachine from "../home/newmachine";
import EditCategory from "../home/editCategories";
import ViewMachine from "../home/viewMachine";

const Stack = createNativeStackNavigator();

export function Ship() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="New"
          component={NewInventory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Newmachine"
          component={NewMachine}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Editcategories"
          component={EditCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewMachine}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Test" component={Testa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
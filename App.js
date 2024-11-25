import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AgregarDestinos from "./Pages/AgregarDestinos";
import DestinoDetalles from "./Pages/DestinoDetalles";
import Home from "./Pages/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AgregarDestinos" component={AgregarDestinos} />
        <Stack.Screen name="DestinoDetalles" component={DestinoDetalles} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

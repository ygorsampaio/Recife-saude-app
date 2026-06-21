// App.js
//
// Ponto de entrada do app. Configura a navegação entre as 3 telas:
// Home (lista de unidades) -> Detalhes -> Historico

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Detalhes from "./screens/Detalhes";
import Historico from "./screens/Historico";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#0B6E4F" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: "Saúde Recife" }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: "Detalhes da Unidade" }} />
        <Stack.Screen name="Historico" component={Historico} options={{ title: "Meu Histórico" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

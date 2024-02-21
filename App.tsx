import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsList from "./components/ContactsList";
import ContactDetails from "./components/ContactDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactsList"
          component={ContactsList}
          options={{ title: "Contacts List" }}
        />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{ title: "Contact Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

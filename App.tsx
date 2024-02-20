import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  SectionList,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMovies = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      console.log("json", json);
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// <View style={styles.container}>
//   <Text>Open up App.js to start working on your ass!</Text>

// </View>

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsList from "./components/ContactsList";
import ContactDetails from "./components/ContactDetails";
import ChatRoom from "./components/ChatRoom";
import { connect } from "./lib/ws.client";
import { SocketProvider } from "./lib/ws.context";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const Stack = createNativeStackNavigator();

export default function App() {
  let [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const connection = connect();
    setSocket(connection);
    return () => {
      connection.close();
    };
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("event", (data) => {
      console.log("data", data);
    });
  }, [socket]);
  return (
    <SocketProvider socket={socket}>
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
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{ title: "Chat Room" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}

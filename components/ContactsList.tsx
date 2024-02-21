import {
  View,
  SectionList,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

export default function ContactsList({ navigation }) {
  let [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          // fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log("data.length", data.length);
          console.log("contact", contact);
          let sortedContacts = data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          setContacts(sortedContacts);
        }
      }
    })();
  }, []);
  const gap = 8;

  return (
    <View className="flex-1 pt-5">
      <Text className="text-xl text-blue-500 text-center">Your Contacts:</Text>

      <FlatList
        className="w-4/5 pt-10 flex self-center"
        data={contacts}
        renderItem={({ item }) => (
          <TouchableHighlight
            className="flex items-center flex-row-reverse bg-gray-300 rounded-md my-1"
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <View>
              <Text style={{ padding: 10, height: 44 }}>{item.name}</Text>
              <Text style={{ padding: 10, height: 44 }}>
                {item.phoneNumbers?.length ? item.phoneNumbers[0].number : ""}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

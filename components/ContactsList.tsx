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
  let [filter, setFilter] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          // fields: [Contacts.Fields.Emails],
          sort: Contacts.SortTypes.FirstName,
          name: filter,
        });

        if (data.length > 0) {
          console.log("data.length", data.length);
          // let sortedContacts = data.sort(function (a, b) {
          //   if (a.name < b.name) {
          //     return -1;
          //   }
          //   if (a.name > b.name) {
          //     return 1;
          //   }
          //   return 0;
          // });
          setContacts(data);
        }
      }
    })();
  }, [filter]);

  return (
    <View className="flex items-center flex-1 pt-5">
      <Text className="text-xl text-blue-500 text-center py-5 font-bold">
        Your Contacts:
      </Text>
      <TextInput
        className="text-lg text-blue-500 text-center border-black rounded-md border h-12 w-4/5 mb-5"
        placeholder="Type here to filter"
        onChangeText={setFilter}
        defaultValue={filter}
      />
      <FlatList
        className="w-4/5 pt-5 flex self-center"
        data={contacts}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <View className="flex items-center justify-between flex-row bg-gray-300 rounded-md my-1">
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

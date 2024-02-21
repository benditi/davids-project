import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default function ContactsList({ navigation }) {
  let [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  let [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          sort: Contacts.SortTypes.FirstName,
          name: filter,
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, [filter]);

  return (
    <View className="flex items-center h-full pt-5">
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
        className="w-4/5 flex self-center"
        data={contacts}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <View className="flex items-center justify-between flex-row bg-gray-300 rounded-md my-1">
              <Text style={{ padding: 10, height: 44 }}>
                {item.name.length > 24 ? item.name.substring(0, 24) : item.name}
              </Text>
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

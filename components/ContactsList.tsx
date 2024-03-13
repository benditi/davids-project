import {
  View,
  Text,
  TextInput,
  SectionList,
  TouchableHighlight,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Contacts from "expo-contacts";
import { twMerge } from "tailwind-merge";

export type GroupedContacts = { title: string; data: Contacts.Contact[] }[];

export default function ContactsList({ navigation }) {
  let [contacts, setContacts] = useState<GroupedContacts>([]);
  let [filter, setFilter] = useState("");
  let [isButtonShown, setIsButtonShown] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          sort: Contacts.SortTypes.FirstName,
          name: filter,
        });
        let groupedData: Record<string, Contacts.Contact[]> = data.reduce(
          (acc, item) => {
            let firstString = item.name.trim()[0];
            acc[firstString] = acc[firstString]
              ? [...acc[firstString], item]
              : [item];
            return acc;
          },
          {}
        );
        let sectionedData: { title: string; data: Contacts.Contact[] }[] = [];
        for (let key in groupedData) {
          sectionedData.push({ title: key, data: groupedData[key] });
        }
        if (data.length > 0) {
          setContacts(sectionedData);
        }
      }
    })();
  }, [filter]);
  let scrollRef = useRef(null);
  return (
    <View className="flex items-center h-full pt-5">
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ChatRoom");
        }}
        className="bg-blue-500 h-12 rounded-lg flex flex-row items-center justify-center"
      >
        <>
          <Text className="text-white texl-lg font-semibold px-3">
            Chat Room
          </Text>
        </>
      </TouchableHighlight>
      <Text className="text-xl text-blue-500 text-center py-5 font-bold">
        Your Contacts:
      </Text>
      <TextInput
        className="text-lg text-blue-500 text-center border-black rounded-md border h-12 w-4/5 mb-5"
        placeholder="Type here to filter"
        onChangeText={setFilter}
        defaultValue={filter}
      />

      <SectionList
        ref={scrollRef}
        onScrollBeginDrag={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.y;
          if (contentOffset > 0) {
            setIsButtonShown(true);
          }
        }}
        onScrollEndDrag={() => {
          setTimeout(() => setIsButtonShown(false), 2000);
        }}
        className="w-4/5 flex self-center"
        sections={contacts}
        renderSectionHeader={({ section }) => (
          <Text className="font-bold text-left py-2 px-2">{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <View className="flex items-center justify-between flex-row bg-gray-300 rounded-md my-1">
              <Text style={{ padding: 10, height: 44 }}>
                {item.name?.length > 24
                  ? item.name.substring(0, 24)
                  : item.name}
              </Text>
              <Text style={{ padding: 10, height: 44 }}>
                {item.phoneNumbers?.length ? item.phoneNumbers[0].number : ""}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
      <TouchableHighlight
        className={twMerge(
          "h-12 w-12 flex justify-center items-center shadow-xl absolute bottom-5 rounded-full bg-white",
          !isButtonShown && "hidden"
        )}
        onPress={() =>
          scrollRef.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0 })
        }
      >
        <Text>
          <Image source={require("../assets/icon-top-arrow-16.png")} />
        </Text>
      </TouchableHighlight>
    </View>
  );
}

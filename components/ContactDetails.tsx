import { View, Text, Button } from "react-native";
import * as Contacts from "expo-contacts";
import { formatAddress } from "../lib/utils";

type ContactDetailsProps = {
  navigation: any;
  route: {
    params: {
      contact: Contacts.Contact;
    };
  };
};

export default function ContactDetails({
  navigation,
  route,
}: ContactDetailsProps) {
  console.log("route", route);
  let { contact } = route.params;
  console.log("contact.emails", contact.emails);

  return (
    <View className="py-5 flex items-center">
      <View className="w-40 pb-5">
        <Button
          onPress={() => {
            navigation.navigate("ContactsList");
          }}
          title="Back"
        ></Button>
      </View>
      <Text className="text-xl font-bold text-blue-500 text-center">
        {contact.name}
      </Text>
      <View className="w-full px-2 pt-5 text-lg">
        {contact.phoneNumbers?.length
          ? contact.phoneNumbers.map((phone, index) => (
              <Text>
                Phone {index + 1}: {phone.number}
              </Text>
            ))
          : null}
        {contact.addresses?.length
          ? contact.addresses.map((address, index) => (
              <Text>
                Address {index + 1}: {formatAddress(address)}
              </Text>
            ))
          : null}
      </View>
    </View>
  );
}

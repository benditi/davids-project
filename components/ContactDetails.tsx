import { View, Text, Button, Image } from "react-native";
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
  console.log("contact.image", contact.image);

  return (
    <View className="py-5 flex items-center px-4">
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
      {contact.imageAvailable && (
        <Image
          source={{ uri: contact.image.uri, height: 100, width: 100 }}
          className="rounded-full mt-5"
        />
      )}
      <View className="w-full pt-5 ">
        {contact.phoneNumbers?.length
          ? contact.phoneNumbers.map((phone, index) => (
              <Text key={phone.id} className="text-lg">
                Phone {index + 1}: {phone.number}
              </Text>
            ))
          : null}
        {contact.addresses?.length
          ? contact.addresses.map((address, index) => (
              <Text key={address.id} className="text-lg">
                Address {index + 1}: {formatAddress(address)}
              </Text>
            ))
          : null}
      </View>
    </View>
  );
}
import { View, Text, Button } from "react-native";
import * as Contacts from "expo-contacts";

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
  console.log("contact", contact);

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
      <Text className="text-xl text-blue-500 text-center">{contact.name}</Text>
    </View>
  );
}

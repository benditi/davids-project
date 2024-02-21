import { View, Text, Image, TouchableHighlight } from "react-native";
import * as Contacts from "expo-contacts";
import { formatAddress } from "../lib/utils";
import { DataField } from "./DataField";

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
  let { contact } = route.params;
  return (
    <View className="py-5 flex items-center px-4 h-full">
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
              <DataField
                fieldName={`Phone ${index + 1}`}
                data={phone.number}
                key={phone.id}
              />
            ))
          : null}
        {contact.addresses?.length
          ? contact.addresses.map((address, index) => (
              <DataField
                fieldName={`Address ${index + 1}`}
                data={formatAddress(address)}
                key={address.id}
              />
            ))
          : null}
        {contact.company && (
          <DataField fieldName="Company" data={contact.company} />
        )}
        {contact.jobTitle && (
          <DataField fieldName="Job Title" data={contact.jobTitle} />
        )}
      </View>
      <View className="w-40 absolute bottom-10">
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("ContactsList");
          }}
          className="bg-blue-500 h-12 rounded-lg flex flex-row items-center justify-center"
        >
          <>
            <Image
              source={require("../assets/left-arrow.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <Text className="text-white texl-lg font-semibold px-3">Back</Text>
          </>
        </TouchableHighlight>
      </View>
    </View>
  );
}

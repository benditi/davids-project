import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Button,
} from "react-native";
import * as Contacts from "expo-contacts";
import { formatAddress } from "../lib/utils";
import { DataField } from "./DataField";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef } from "react";

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
  useEffect(() => {
    (async () => {
      let permissions = await Camera.requestCameraPermissionsAsync();
      console.log("permissions", permissions);
    })();
  }, []);
  let cameraRef: React.MutableRefObject<Camera> = useRef(null);
  let onPictureSaved = (photo) => {
    console.log(photo);
  };
  return (
    <View className="py-5 flex items-center px-4 h-full">
      <Text className="text-xl font-bold text-blue-500 text-center pb-5">
        {contact.name}
      </Text>
      {contact.imageAvailable && (
        <Image
          source={{ uri: contact.image.uri, height: 100, width: 100 }}
          className="rounded-full mb-5"
        />
      )}
      <Camera
        style={{ height: 120, width: 120 }}
        type={CameraType.back}
        onCameraReady={() => {}}
        ref={cameraRef}
      ></Camera>
      <Button
        title="Take Picture"
        onPress={() => {
          cameraRef.current.takePictureAsync({
            onPictureSaved,
          });
        }}
      />
      <ScrollView className="w-full [height:400px] flex-grow-0">
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
        {contact.emails?.length
          ? contact.emails.map((email, index) => (
              <DataField
                fieldName={`Email ${index + 1}`}
                data={email.email}
                key={email.id}
              />
            ))
          : null}
        {contact.company && (
          <DataField fieldName="Company" data={contact.company} />
        )}
        {contact.jobTitle && (
          <DataField fieldName="Job Title" data={contact.jobTitle} />
        )}
      </ScrollView>
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

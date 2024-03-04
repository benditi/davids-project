import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  Button,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as NativeContacts from "react-native-contacts";
import { formatAddress } from "../lib/utils";
import { DataField } from "./DataField";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";

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
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      let permissions = await Camera.requestCameraPermissionsAsync();
    })();
  }, []);
  let cameraRef: React.MutableRefObject<Camera> = useRef(null);
  let onPictureSaved = async (picture: CameraCapturedPicture) => {
    console.log(picture);
    try {
      let permissions = await Contacts.requestPermissionsAsync();
      if (!permissions.granted) {
        console.log("permissions denied", permissions);

        return;
      }

      await updateContactPicture(picture);
    } catch (error) {
      console.log("error", error);
    }
  };
  let updateContactPicture = async (picture: CameraCapturedPicture) => {
    contact;
    const updatedContact: Partial<NativeContacts.Contact> & {
      recordID: string;
    } = {
      recordID: contact.id,
      // [Contacts.Fields.Image]: picture,
      // [Contacts.Fields.ImageAvailable]: true,
    };
    // because of android
    console.log("updatedContact", updatedContact);
    await NativeContacts.updateContact(updatedContact);
    // await Contacts.presentFormAsync(contact.id, contact, {
    //   allowsEditing: true,
    // });
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
      <View>
        <Camera
          className="h-40 w-40 rounded-full"
          type={type}
          onCameraReady={() => {}}
          ref={cameraRef}
        ></Camera>
      </View>
      <Button
        title="Take Picture"
        onPress={() => {
          cameraRef.current.takePictureAsync({
            onPictureSaved,
          });
        }}
      />
      <Button
        title={"Switch to " + (type === CameraType.back ? "front" : "back")}
        onPress={() => {
          setType((prevState) =>
            prevState === CameraType.back ? CameraType.front : CameraType.back
          );
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

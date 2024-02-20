import { View, Text, Button } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>My Profile</Text>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="To Home"
      ></Button>
    </View>
  );
}

import {
  View,
  SectionList,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

export default function HomeScreen({ navigation }) {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop: 22,
      paddingHorizontal: 20,
      gap: 20,
      alignItems: "center",
    },
    button: {
      backgroundColor: "green",
    },
    container: {
      flex: 1,
      paddingTop: 22,
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: "rgba(247,247,247,1.0)",
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Text className="text-xl text-red-500">This is home screen</Text>
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="To Profile"
      ></Button>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />

        <Text style={{ fontSize: 96 }}>If you like</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />

        <Text style={{ fontSize: 96 }}>Scrolling down</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 96 }}>What's the best</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />

        <Text style={{ fontSize: 96 }}>Framework around?</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />

        <Text style={{ fontSize: 80 }}>React Native</Text>
      </ScrollView>
    </View>
  );
}

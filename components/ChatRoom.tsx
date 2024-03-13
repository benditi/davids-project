import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

export default function ChatRoom({ navigation }) {
  let demoChats = [
    { id: "1", name: "Dave", message: "Hi, I'm david" },
    { id: "2", name: "Robert", message: "Nice to mmet U david, I'm Robert" },
  ];
  return (
    <View className="py-5 flex items-center px-4 h-full justify-between">
      <Text>Chat Room</Text>
      <View>
        {demoChats.map((chat) => (
          <View key={chat.id} className="flex flex-row items-center gap-1">
            <Text className="font-bold">{chat.name}:</Text>
            <Text>{chat.message}</Text>
          </View>
        ))}
      </View>
      <TextInput
        className="text-lg text-blue-500 text-center border-black rounded-md border h-12 w-4/5 mb-5"
        placeholder="Type here"
        // onChangeText={setFilter}
        // defaultValue={filter}
      />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ContactsList");
        }}
        className="bg-blue-500 h-12 rounded-lg flex flex-row items-center justify-center"
      >
        <>
          <Text className="text-white texl-lg font-semibold px-3">Back</Text>
        </>
      </TouchableHighlight>
    </View>
  );
}

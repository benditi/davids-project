import { View, Text } from "react-native";

export const DataField = ({
  fieldName,
  data,
}: {
  fieldName: string;
  data: string;
}) => {
  return (
    <View className="flex">
      <Text className="text-sm text-gray-500">{fieldName}:</Text>
      <Text className="text-lg text-left">{data}</Text>
    </View>
  );
};

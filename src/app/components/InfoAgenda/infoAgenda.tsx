import { View, Text } from "react-native";

type InfoAgendaProps = {
  title: string;
  info: string | undefined;
  icon?: any;
};

export function InfoAgenda({ info, title, icon }: InfoAgendaProps) {
  return (
    <View className="flex-row gap-4 items-center mt-2">
      {icon}
      <View className="flex-row">
        <Text className="font-bold">{title}: </Text>
        <Text>{info}</Text>
      </View>
    </View>
  );
}

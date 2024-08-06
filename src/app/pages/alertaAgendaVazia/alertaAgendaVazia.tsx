import { View, Text, Image } from "react-native";
import Constants from "expo-constants";
import { useUserStorage } from "@/store/user";
import ImgVazia from "@/assets/agendaVazia.svg";

export default function AlertaAgendaVazia() {
  const { userData } = useUserStorage();

  return (
    <View
      className="flex-1 bg-white justify-center items-center gap-10"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <Text className="text-xl font-titulo">Bairro: {userData?.bairro}</Text>
      <View className="flex-1 justify-end items-center">
        <ImgVazia width={350} height={250} />
      </View>
      <Text className="text-5xl font-titulo text-red-700">Ooops!</Text>
      <View className="flex-1 items-center ">
        <Text className="text-4xl font-titulo text-Cgray-300 text-center">
          Ainda não há {"\n"}disponibilidade para a{"\n"}sua região.
        </Text>
      </View>
    </View>
  );
}

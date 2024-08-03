import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { UserAgendaProps } from "@/app/pages/agendamento/agendamento";
import firebase from "firebase/compat";
import { formatData, getDayWeek } from "@/utils/AgendaData";
import { AgendaStackParamList } from "@/routes/AppRoutes/stackagenda";

export type CardAgendaProps = {
  id: string;
  date: firebase.firestore.Timestamp;
  diaAgendamento: string;
  diaSemana: string;
  horaAgendamento: string;
  status: string;
  tipoServico: string;
  idVihicle?: string;
  userAgendamento: UserAgendaProps;
};

interface Agedamento {
  agendamento: CardAgendaProps;
}

export function CardAgenda({ agendamento }: Agedamento) {
  const navigation = useNavigation<NavigationProp<AgendaStackParamList>>();

  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between border border-l-8 rounded-md border-green-600 py-4 px-3"
      onPress={() => navigation.navigate("DetalheAgenda", { agendamento })}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-[10px] h-[10px] bg-gray-400 rounded-full" />
        <View>
          <Text className="font-bold">{formatData(agendamento?.date)}</Text>
          <Text className="font-semibold">
            {getDayWeek(agendamento?.date).toLocaleUpperCase()}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-8 items-center">
        <Text className="font-titulo text-green-600">
          {agendamento.status.toLocaleUpperCase()}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-titulo text-lg">08:00</Text>
          <FontAwesome5 name="arrow-circle-right" size={24} color="green" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

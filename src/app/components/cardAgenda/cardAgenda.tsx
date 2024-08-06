import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { UserAgendaProps } from "@/app/pages/agendamento/agendamento";
import firebase from "firebase/compat";
import { formatData, getDayWeek } from "@/utils/AgendaData";
import { AgendaStackParamList } from "@/routes/AppRoutes/stackagenda";
import { TabHomeParamList } from "@/routes/AppRoutes/app.routes";
import clsx from "clsx";
import { STATUS } from "@/app/pages/detalheAgenda/detalheAgenda";

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

const statusColors: { [key: string]: string } = {
  [STATUS.AGENDADO]: "#f97316",
  [STATUS.CONFIRMADO]: "#1199EE",
  [STATUS.ATENDIDO]: "#16a34a",
  [STATUS.CANCELADO]: "#dc2626",
};

export function CardAgenda({ agendamento }: Agedamento) {
  const navigation = useNavigation<NavigationProp<AgendaStackParamList>>();

  const EstiloCorCondicional = (tag: string) => {
    if (agendamento.status === STATUS.AGENDADO) {
      return `${tag}-orange-500`;
    }
    if (agendamento.status === STATUS.CONFIRMADO) {
      return `${tag}-Cblue-300`;
    }
    if (agendamento.status === STATUS.ATENDIDO) {
      return `${tag}-green-600`;
    }
    if (agendamento.status === STATUS.CANCELADO) {
      return `${tag}-red-600`;
    }
  };

  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between border border-l-8 rounded-md border-zinc-700 py-4 px-3 mb-4"
      onPress={() => navigation.navigate("DetalheAgenda", { agendamento })}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`w-[10px] h-[10px] rounded-full ${EstiloCorCondicional("bg")} `}
        />
        <View>
          <Text className="font-bold">{formatData(agendamento?.date)}</Text>
          <Text className="font-semibold">
            {getDayWeek(agendamento?.date).toLocaleUpperCase()}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-8 items-center">
        <Text className={`font-titulo ${EstiloCorCondicional("text")}`}>
          {agendamento.status.toLocaleUpperCase()}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-titulo text-lg">08:00</Text>
          <FontAwesome5
            name="arrow-circle-right"
            size={24}
            color={statusColors[agendamento.status]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

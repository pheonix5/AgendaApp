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
import { theme } from "@/theme/theme";

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

// const statusColors: { [key: string]: string } = {
//   [STATUS.AGENDADO]: "#f97316",
//   [STATUS.CONFIRMADO]: "#1199EE",
//   [STATUS.ATENDIDO]: "#16a34a",
//   [STATUS.CANCELADO]: "#dc2626",
// };

export function CardAgenda({ agendamento }: Agedamento) {
  const navigation = useNavigation<NavigationProp<AgendaStackParamList>>();

  // const EstiloCorCondicional = (tag: string) => {
  //   if (agendamento.status === "agendado") {
  //     return `${tag}-orange-500`;
  //   }
  //   if (agendamento.status === "confirmado") {
  //     return `${tag}-Cblue-300`;
  //   }
  //   if (agendamento.status === "atendido") {
  //     return `${tag}-green-600`;
  //   }
  //   if (agendamento.status === "cancelado") {
  //     return `${tag}-red-600`;
  //   }
  // };

  return (
    <TouchableOpacity
      className="w-full flex-row items-center justify-between border border-l-8 rounded-md border-slate-700 py-4 px-3 mb-4"
      onPress={() => navigation.navigate("DetalheAgenda", { agendamento })}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={clsx(
            "w-[10px] h-[10px] rounded-full",
            agendamento.status === STATUS.AGENDADO && "bg-orange-500",
            agendamento.status === STATUS.CONFIRMADO && "bg-Cblue-300",
            agendamento.status === STATUS.ATENDIDO && "bg-green-600",
            agendamento.status === STATUS.CANCELADO && "bg-red-600"
          )}
        />
        <View>
          <Text className="font-bold text-Cgray-300">
            {formatData(agendamento?.date)}
          </Text>
          <Text className="font-semibold text-Cgray-300">
            {getDayWeek(agendamento?.date).toLocaleUpperCase()}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-8 items-center">
        <Text
          className={clsx(
            "font-titulo",
            agendamento.status === STATUS.AGENDADO && "text-orange-500",
            agendamento.status === STATUS.CONFIRMADO && "text-Cblue-300",
            agendamento.status === STATUS.ATENDIDO && "text-green-600",
            agendamento.status === STATUS.CANCELADO && "text-red-600"
          )}
        >
          {agendamento.status.toLocaleUpperCase()}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-titulo text-lg text-Cgray-300">08:00</Text>
          <FontAwesome5 name="arrow-circle-right" size={24} color="#334155" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

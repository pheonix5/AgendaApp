import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Agenda from "@/app/pages/agenda";
import Agendamento from "@/app/pages/agendamento/agendamento";
import { DiasProps, HorarioProps } from "@/utils/AgendaData";
import DetalheAgenda from "@/app/pages/detalheAgenda/detalheAgenda";
import { CardAgendaProps } from "@/app/components/cardAgenda/cardAgenda";

export type AgendaStackParamList = {
  Agenda: undefined;
  Agendamento: {
    horario: HorarioProps;
    dia?: DiasProps;
    indexHora: number;
    indexDia: number;
  };
  DetalheAgenda: { agendamento: CardAgendaProps };
};

const Stack = createNativeStackNavigator<AgendaStackParamList>();

export default function StackAgenda() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        contentStyle: {
          paddingTop: 25,
        },
      }}
    >
      <Stack.Screen name="Agenda" component={Agenda} />

      <Stack.Screen name="Agendamento" component={Agendamento} />

      <Stack.Screen name="DetalheAgenda" component={DetalheAgenda} />
    </Stack.Navigator>
  );
}

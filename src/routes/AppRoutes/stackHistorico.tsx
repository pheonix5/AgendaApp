import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Agenda from "@/app/pages/agenda";
import Agendamento from "@/app/pages/agendamento/agendamento";
import { DiasProps, HorarioProps } from "@/utils/AgendaData";
import DetalheAgenda from "@/app/pages/detalheAgenda/detalheAgenda";
import { CardAgendaProps } from "@/app/components/cardAgenda/cardAgenda";
import MeusAgendamentos from "@/app/pages/meusAgendamentos/meusAgendamentos";

export type AgendaStackParamList = {
  MeusAgendamentos: undefined;
  DetalheAgenda: { agendamento: CardAgendaProps };
};

const Stack = createNativeStackNavigator<AgendaStackParamList>();

export default function StackHistorico() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        contentStyle: {
          paddingTop: 25,
        },
      }}
    >
      <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentos} />

      <Stack.Screen name="DetalheAgenda" component={DetalheAgenda} />
    </Stack.Navigator>
  );
}

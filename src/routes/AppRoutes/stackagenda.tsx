import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/app/pages/login/login";

import Agenda from "@/app/pages/agenda/agenda";
import Agendamento from "@/app/pages/agendamento/agendamento";
import { DiasProps, HorarioProps } from "@/utils/AgendaData";


export type AgendaStackParamList = {
  Agenda: undefined;
  Agendamento: {horario: HorarioProps, dia?: DiasProps, indexHora?: number};
}


const Stack = createNativeStackNavigator<AgendaStackParamList>();

export default function StackAgenda() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        contentStyle: {
          paddingTop: 25
        }
      }}
    >

      <Stack.Screen
        name="Agenda"
        component={Agenda}
      />

      <Stack.Screen
        name="Agendamento"
        component={Agendamento}
      />
    </Stack.Navigator>
  )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/app/pages/login/login";
import Agenda from "@/app/pages/agenda/agenda";


const Stack = createNativeStackNavigator();

export default function StackAgenda(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        
        contentStyle:{
          paddingTop: 25
        }
      }}
    >

      <Stack.Screen 
        name="Agenda"
        component={Agenda}
      />
    </Stack.Navigator>
  )
}
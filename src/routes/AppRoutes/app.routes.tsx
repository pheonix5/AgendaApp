import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { MaterialCommunityIcons } from '@expo/vector-icons';
import StackAgenda from "./stackagenda";
import Perfil from "@/app/pages/perfil/perfil";

const Tab = createBottomTabNavigator();

export default function TabHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#BE1522',
        tabBarInactiveTintColor: '#121212',
        tabBarLabelStyle: {
          fontSize: 15,
          color: "#121212",
          fontWeight: '500'
        },
        tabBarHideOnKeyboard: true,
      }}
    >

      <Tab.Screen
        name="StackAgenda"
        component={StackAgenda}
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="calendar-plus" color={color} size={size} />
          }
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="account-edit" color={color} size={size} />
          }
        }}
      />
    </Tab.Navigator>
  )
}
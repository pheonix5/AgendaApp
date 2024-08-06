import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import StackAgenda from "./stackagenda";
import Perfil from "@/app/pages/perfil/perfil";
import StackHistorico from "./stackHistorico";

export type TabHomeParamList = {
  StackAgenda: undefined;
  Perfil: undefined;
  StackHistorico: undefined;
};

const Tab = createBottomTabNavigator<TabHomeParamList>();

export default function TabHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#334155",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#67e8f9",
        tabBarInactiveTintColor: "#f5f5f5",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="StackAgenda"
        component={StackAgenda}
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="calendar-plus"
                color={color}
                size={size}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="StackHistorico"
        component={StackHistorico}
        options={{
          title: "Agendamentos",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="list-ul" color={color} size={22} />;
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-edit"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

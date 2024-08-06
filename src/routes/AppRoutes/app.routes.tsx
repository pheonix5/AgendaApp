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
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#BE1522",
        tabBarInactiveTintColor: "#121212",
        tabBarLabelStyle: {
          fontSize: 15,
          color: "#121212",
          fontWeight: "500",
        },
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
            return <FontAwesome name="list-ul" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

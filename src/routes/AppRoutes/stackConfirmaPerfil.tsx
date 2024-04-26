import { TouchableOpacity, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useUserStorage } from '@/store/user';

import { theme } from "@/theme/theme";
import ConfirmaPerfil from '@/app/pages/confirmaPerfil/confirmaPerfil';

import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export function StackConfirmaPerfil() {

  const { logout } = useUserStorage();


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () =>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={logout}
            className="flex-row gap-2 items-center border border-Cblue-500 p-1 px-2 rounded-md"
          >
            <Text className="font-medium text-Cblue-500">Sair</Text>
            <MaterialIcons name="logout" size={24} color={theme.color.Cblue[500]} />
          </TouchableOpacity>
      }}>

      <Stack.Screen
        options={{
          title: "Concluir Cadastro", headerTintColor: theme.color.Cblue[500]
        }}
        name="Confirma Cep"
        component={ConfirmaPerfil}
      />
      
    </Stack.Navigator>
  )
}


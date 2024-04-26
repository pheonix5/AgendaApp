import { useEffect } from "react";

import { useUserStorage } from "../store/user";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabHome from "./AppRoutes/app.routes";
import ConfirmaPerfil from "@/app/pages/confirmaPerfil/confirmaPerfil";
import { AuthRoutes } from "./AuthRoutes/auth.routes";

const Stack = createNativeStackNavigator();


export default function Routes() {
  const { userData, getUserAsyncStorage } = useUserStorage();

  useEffect(() => {
    getUserAsyncStorage()
  }, [])


  // cep vazio + email cadastado + comprovante não enviado
  if (userData?.cep === '' && userData?.email !== '' && userData?.adressSend === false) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen options={{ title: "Concluir Cadastro" }} name="Confirma Cep" component={ConfirmaPerfil} />
      </Stack.Navigator>
    )
  }


  return userData?.cep ? <TabHome /> : <AuthRoutes />
}
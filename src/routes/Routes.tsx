import { useEffect, useState } from "react"

import { useUserStorage } from "../store/user";

import { AuthRoutes } from "./AuthRoutes/auth.routes";

import TabHome from "./AppRoutes/app.routes";
import { StackConfirmaPerfil } from "./AppRoutes/stackConfirmaPerfil";
import { ActivityIndicator, View } from "react-native";
import { theme } from "@/theme/theme";

export default function Routes() {
  const [loading, setLoading] = useState(true)
  const { userData, getUserAsyncStorage } = useUserStorage();


  useEffect(() => {
    getUserAsyncStorage()
    .then(() => setLoading(false))
  }, [])

  // cep vazio + email cadastado + comprovante não enviado
  if (userData?.cep === '' && userData?.email !== '' && userData?.adressSend === false) {
    return (
      <StackConfirmaPerfil />
    )
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={theme.color.Cgray[200]} size={24} />
      </View>
    )

  } else {
    return userData?.cep ? <TabHome /> : <AuthRoutes />

  }


}
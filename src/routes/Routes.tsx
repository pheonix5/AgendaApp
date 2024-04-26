import { useEffect } from "react"

import { useUserStorage } from "../store/user";

import { AuthRoutes } from "./AuthRoutes/auth.routes";

import TabHome from "./AppRoutes/app.routes";
import { StackConfirmaPerfil } from "./AppRoutes/stackConfirmaPerfil";

export default function Routes() {
  const { userData, getUserAsyncStorage, logout } = useUserStorage();

  useEffect(() => {
    getUserAsyncStorage()
  }, [])

  // cep vazio + email cadastado + comprovante não enviado
  if (userData?.cep === '' && userData?.email !== '' && userData?.adressSend === false) {
    return (
      <StackConfirmaPerfil />
    )
  }

  return userData?.cep ? <TabHome /> : <AuthRoutes />
}
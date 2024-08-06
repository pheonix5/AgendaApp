import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useUserStorage } from "@/store/user";
import Constants from "expo-constants";
import {
  CardAgenda,
  CardAgendaProps,
} from "@/app/components/cardAgenda/cardAgenda";
import { ImageBackGroundCustom } from "@/app/components/imageBackGroundCustom/imageBackGroundCustom";
import { AgendaDataProps, AgendamentosFakes } from "@/utils/AgendaData";

export default function MeusAgendamentos() {
  const { userData } = useUserStorage();
  const [loading, setLoading] = useState(false);
  const [listaAgenda, setListaAgenda] = useState<CardAgendaProps[] | null>(
    null
  );

  useEffect(() => {
    // if (userData) {
    //   getAgendamentoUser();
    // }
  }, [userData]);

  async function getAgendamentoUser() {
    try {
      const response = await firebase
        .firestore()
        .collection("agendamento")
        .where("userAgendamento.userId", "==", userData?.userId)
        .get();
      if (!response.empty) {
        let listAgenda = [] as CardAgendaProps[];

        response.forEach((doc) => {
          listAgenda.push(doc.data() as CardAgendaProps);
        });

        setListaAgenda(listAgenda);
      } else {
        setListaAgenda([]);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamento:", error);
    } finally {
      setLoading(false);
    }
  }

  // console.log(JSON.stringify(listaAgenda, null, 2));

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={32} color="#000" />
      </View>
    );
  }

  return (
    <View
      className="flex-1 px-6 py-4"
      style={{ marginTop: Constants.statusBarHeight }}
    >
      <ImageBackGroundCustom source={require("@/assets/bgAgenda.jpg")} />
      <Text className="text-3xl font-titulo text-Cgray-300 text-center mb-6">
        Histórico de Consultas
      </Text>

      <FlatList
        data={AgendamentosFakes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <CardAgenda agendamento={item} />
          </>
        )}
        ListEmptyComponent={
          <Text className="text-center text-Cgray-300 mt-4">
            Nenhum agendamento encontrado.
          </Text>
        }
        contentContainerStyle={{
          paddingVertical: 6,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

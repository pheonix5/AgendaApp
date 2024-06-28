import React, { useState, useEffect } from "react";
import { useUserStorage } from "@/store/user";
import firebase from "@/firebase/firebaseConnection";
import { View, Text, ActivityIndicator } from "react-native";

import { DiasProps, ListHorarioProps, getDayWeek } from "@/utils/AgendaData";

import { startOfWeek, endOfWeek } from "date-fns";

import { AgendaDataProps } from "@/utils/AgendaData";
import AgendaComponent from "./Agenda";
import { useAgendaStore } from "@/store/agenda";
import { ImageRelogioBack } from "@/app/components/imageRelogioBack/imageRelogioBack";
import { HeaderTittle } from "@/app/components/headerTittle/headerTitle";
import {
  CardAgenda,
  CardAgendaProps,
} from "@/app/components/cardAgenda/cardAgenda";
import { AgendamentoProps } from "../agendamento/agendamento";

const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

export default function Agenda() {
  const [selected, setSelect] = useState("segunda-feira");
  const [agendaDataWeek, setAgendaDataWeek] = useState<AgendaDataProps[]>([]);
  const [horarios, setHorarios] = useState<ListHorarioProps>([]);
  const [indexDia, setIndexDia] = useState<number>(0);
  const [diaSelecionado, setDiaSelecionado] = useState<DiasProps>();
  const { setAgendaAll } = useAgendaStore();
  const [agendamento, setAgendamento] = useState<CardAgendaProps | null>(null);
  const [loadingGetAgendamento, setLoadingGetAgendamento] = useState(false);

  const { userData } = useUserStorage();

  useEffect(() => {
    const getAgenda = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("vehicles")
          .where("bairro", "==", userData?.bairro)
          .get();

        const filteredData = [] as AgendaDataProps[];
        const response = snapshot.docs.map((doc) => {
          const data = doc.data() as AgendaDataProps;
          const validDays = data.dias.filter(
            (dia) =>
              dia.date.toDate() >= startOfThisWeek &&
              dia.date.toDate() <= endOfThisWeek
          );
          if (validDays.length > 0) {
            filteredData.push({
              ...data,
              dias: validDays,
            });
          }
          return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            idVehicle: doc.id,
            ...data,
          } as AgendaDataProps;
        });
        setAgendaDataWeek(filteredData);
        setAgendaAll(response[0]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (userData?.situacaoAgenda?.includes("agendado")) {
      getAgendamentoUser();
    } else {
      getAgenda();
    }
  }, []);

  async function getAgendamentoUser() {
    setLoadingGetAgendamento(true);
    await firebase
      .firestore()
      .collection("agendamento")
      .get()
      .then((response) => {
        setAgendamento(response.docs[0].data() as CardAgendaProps);
      })
      .catch((error) => {
        console.log("erro ao buscar agendamento: ", error);
      });
    setLoadingGetAgendamento(false);
  }

  function handleSelectDay(selectedDay: string) {
    setSelect(selectedDay);
    const semanaAtual = agendaDataWeek.find((semana) =>
      semana.dias.find((dia) => getDayWeek(dia.date) === selectedDay)
    );
    const diaSelecionado = semanaAtual?.dias.find(
      (dia) => getDayWeek(dia.date) === selectedDay
    );

    if (diaSelecionado) {
      setDiaSelecionado(diaSelecionado);
      setHorarios(diaSelecionado.horarios);
    } else {
      setHorarios([]);
    }
  }

  if (userData?.situacaoAgenda?.includes("agendado")) {
    if (loadingGetAgendamento && !agendamento) {
      return (
        <ActivityIndicator
          className="flex-1 justify-center items-center "
          size={30}
        />
      );
    }

    return (
      <View className="flex-1 px-4 py-2">
        <ImageRelogioBack />
        <HeaderTittle title="Meu Agendamento" className="self-start" />
        <Text className="text-Cgray-200 font-titulo text-xl my-2">
          {userData.bairro}
        </Text>

        {agendamento ? <CardAgenda agendamento={agendamento} /> : null}
      </View>
    );
  }

  return (
    <AgendaComponent
      agendaDataWeek={agendaDataWeek}
      diaSelecionado={diaSelecionado!}
      handleSelectDay={handleSelectDay}
      horarios={horarios}
      indexDia={indexDia}
      selected={selected}
      setIndexDia={setIndexDia}
    />
  );
}

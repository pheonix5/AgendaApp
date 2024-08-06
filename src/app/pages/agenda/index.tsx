import React, { useState, useEffect } from "react";
import { UserProps, useUserStorage } from "@/store/user";
import firebase from "@/firebase/firebaseConnection";
import { View, Text, ActivityIndicator } from "react-native";

import { DiasProps, ListHorarioProps, getDayWeek } from "@/utils/AgendaData";
import { useIsFocused } from "@react-navigation/native";
import { startOfWeek, endOfWeek } from "date-fns";

import { AgendaDataProps } from "@/utils/AgendaData";
import AgendaComponent from "./Agenda";
import { useAgendaStore } from "@/store/agenda";
import { ImageBackGroundCustom } from "@/app/components/imageBackGroundCustom/imageBackGroundCustom";
import { Header } from "@/app/components/header";
import {
  CardAgenda,
  CardAgendaProps,
} from "@/app/components/cardAgenda/cardAgenda";
import AlertaAgendaVazia from "../alertaAgendaVazia/alertaAgendaVazia";

const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

const STATUS = ["agendado", "confirmado"];

export default function Agenda() {
  const isFocused = useIsFocused();
  const [selected, setSelect] = useState("segunda-feira");
  const [agendaDataWeek, setAgendaDataWeek] = useState<AgendaDataProps[]>([]);
  const [horarios, setHorarios] = useState<ListHorarioProps>([]);
  const [indexDia, setIndexDia] = useState<number>(0);
  const [diaSelecionado, setDiaSelecionado] = useState<DiasProps>();
  const { setAgendaAll } = useAgendaStore();
  const [agendamento, setAgendamento] = useState<CardAgendaProps | null>(null);
  const [loadingGetAgendamento, setLoadingGetAgendamento] = useState(false);

  const { userData, setUserData, getUserAsyncStorage, setUserAsyncStorage } =
    useUserStorage();

  const condicaoAgenda =
    userData?.situacaoAgenda.includes("confirmado") ||
    userData?.situacaoAgenda.includes("agendado");

  useEffect(() => {
    let isActive = true;

    const initializeData = async () => {
      await fetchUserData();
      if (isActive) {
        if (condicaoAgenda) {
          await getAgendamentoUser();
        } else {
          await getAgenda();
        }
      }
    };

    initializeData();

    return () => {
      isActive = false;
    };
  }, [userData?.situacaoAgenda, isFocused]);

  const fetchUserData = async () => {
    const userAsync = await getUserAsyncStorage();
    try {
      if (userAsync?.userId) {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(userAsync.userId)
          .get();
        const userDB = userDoc.data() as UserProps;
        setUserData(userDB);
        await setUserAsyncStorage(userDB);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
    }
  };

  const getAgenda = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("vehicles")
        .where("bairro", "==", userData?.bairro)
        .get();

      const filteredData = snapshot.docs
        .map((doc) => {
          const data = doc.data() as AgendaDataProps;
          const validDays = data.dias.filter(
            (dia) =>
              dia.date.toDate() >= startOfThisWeek &&
              dia.date.toDate() <= endOfThisWeek
          );
          if (validDays.length > 0) {
            return {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              idVehicle: doc.id,
              ...data,
              dias: validDays,
            } as AgendaDataProps;
          }
          return null;
        })
        .filter(Boolean) as AgendaDataProps[];

      setAgendaDataWeek(filteredData);
      setAgendaAll(filteredData[0]);
    } catch (error) {
      console.error("Erro ao buscar dados da agenda:", error);
    }
  };

  const getAgendamentoUser = async () => {
    setLoadingGetAgendamento(true);
    try {
      const response = await firebase
        .firestore()
        .collection("agendamento")
        .where("userAgendamento.userId", "==", userData?.userId)
        .where("status", "in", STATUS)
        .get();
      if (!response.empty) {
        let agendamentoData = {
          id: response.docs[0].id,
          ...response.docs[0].data(),
        } as CardAgendaProps;
        setAgendamento(agendamentoData);
      } else {
        setAgendamento(null);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamento:", error);
    } finally {
      setLoadingGetAgendamento(false);
    }
  };

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

  if (condicaoAgenda) {
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
        <ImageBackGroundCustom source={require("@/assets/bgAgenda.jpg")} />
        <Header>
          <Header.Title title="Meu Agendamento" />
        </Header>
        <Text className="text-Cgray-200 font-titulo text-xl my-2">
          {userData?.bairro}
        </Text>

        {agendamento ? <CardAgenda agendamento={agendamento} /> : null}
      </View>
    );
  }

  if (!agendaDataWeek) {
    <AlertaAgendaVazia />;
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

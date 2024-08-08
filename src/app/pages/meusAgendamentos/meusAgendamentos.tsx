import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";

import { useUserStorage } from "@/store/user";
import Constants from "expo-constants";
import {
  CardAgenda,
  CardAgendaProps,
} from "@/app/components/cardAgenda/cardAgenda";
import { ImageBackGroundCustom } from "@/app/components/imageBackGroundCustom/imageBackGroundCustom";
import { theme } from "@/theme/theme";
import { DatesSelected, calendarUtils } from "@/utils/calendarUtils";
import { ModalCalendar } from "@/app/components/ModalCalendar/modalCalendar";
import { DateData } from "react-native-calendars";

import { Calendar } from "@/app/components/calendar/calendar";
import dayjs from "dayjs";
import isBeetWen from "dayjs/plugin/isBetween";

dayjs.extend(isBeetWen);

export default function MeusAgendamentos() {
  const { userData } = useUserStorage();
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);
  const [showCalendar, setShowCalendar] = useState(false);
  const [listaAgenda, setListaAgenda] = useState<CardAgendaProps[] | null>(
    null
  );

  useEffect(() => {
    if (userData) {
      getAgendamentoUser();
    }
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
          listAgenda.push({
            id: doc.id,
            ...(doc.data() as Omit<CardAgendaProps, "id">),
          });
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

  function handleSelectedDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });

    setSelectedDates(dates);
  }

  const agendamentoFiltrado = useMemo(() => {
    if (!listaAgenda) {
      return [];
    }

    if (!selectedDates.startsAt || !selectedDates.endsAt) {
      return listaAgenda;
    }

    const startDate = dayjs(selectedDates.startsAt.dateString).startOf("day");
    const endDate = dayjs(selectedDates.endsAt.dateString).endOf("day");

    return listaAgenda.filter((agendamento) => {
      const agendamentoDate = dayjs(agendamento.date.toDate());
      return agendamentoDate.isBetween(startDate, endDate, null, "[]");
    });
  }, [listaAgenda, selectedDates]);

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

      <View className="w-full flex-row justify-between items-center mb-3">
        <Text className="text-lg font-medium text-Cgray-300">
          Selecionar Data
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowCalendar(true)}
          className="p-1"
        >
          <EvilIcons name="calendar" size={32} color={theme.color.Cgray[300]} />
        </TouchableOpacity>
      </View>

      {selectedDates.startsAt && selectedDates.endsAt && (
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-base text-Cgray-300 font-titulo">
            {selectedDates.formatDatesInText}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setSelectedDates({} as DatesSelected)}
            className="p-1"
          >
            <FontAwesome6
              name="eraser"
              size={24}
              color={theme.color.Cblue[300]}
            />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={agendamentoFiltrado}
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

      <ModalCalendar
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
      >
        <View className="gap-4 mt-4">
          <Calendar
            onDayPress={handleSelectedDate}
            markedDates={selectedDates.dates}
          />
        </View>
      </ModalCalendar>
    </View>
  );
}

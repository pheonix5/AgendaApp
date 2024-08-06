import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  FontAwesome6,
} from "@expo/vector-icons";

import { theme } from "native-base";
import {
  AgendaDataProps,
  formatDataDate,
  getDayWeekDate,
} from "@/utils/AgendaData";
import { AgendaStackParamList } from "@/routes/AppRoutes/stackagenda";

import { Header } from "@/app/components/header";
import { Button } from "@/app/components/button";
import { ButtonText } from "@/app/components/button/text";
import { ButtonRoot } from "@/app/components/button/root";
import { InfoAgenda } from "@/app/components/InfoAgenda/infoAgenda";
import { ImageBackGroundCustom } from "@/app/components/imageBackGroundCustom/imageBackGroundCustom";
import firebase from "firebase/compat";
import { useAgendaStore } from "@/store/agenda";
import { UserProps, useUserStorage } from "@/store/user";

type DetalheAgendamentoRouteProp = RouteProp<
  AgendaStackParamList,
  "DetalheAgenda"
>;

export enum STATUS {
  AGENDADO = "agendado",
  CONFIRMADO = "confirmado",
  CANCELADO = "cancelado",
  ATENDIDO = "atendido",
}

export default function DetalheAgenda() {
  const route = useRoute<DetalheAgendamentoRouteProp>();
  const navigation = useNavigation();
  const { agendamento } = route?.params;
  const { agendaAll, setAgendaAll } = useAgendaStore();
  const { userData, setUserData } = useUserStorage();

  async function handleDeleteAgenda() {
    try {
      await firebase
        .firestore()
        .collection("agendamento")
        .doc(agendamento.id)
        .delete();

      const vehicleDoc = await firebase
        .firestore()
        .collection("vehicles")
        .doc(agendaAll?.idVehicle)
        .get();

      const vehicleData: AgendaDataProps = vehicleDoc.data() as AgendaDataProps;

      const updatedDias = vehicleData.dias.map((dia) => {
        const dateFirestore = dia.date.toDate().toDateString();
        const dateAgendamento = agendamento.date.toDate().toDateString();

        if (dateFirestore === dateAgendamento) {
          const updatedHorarios = dia.horarios.map((horario) => {
            if (horario.horario === agendamento.horaAgendamento) {
              return {
                ...horario,
                vagasOcupadas: horario.vagasOcupadas - 1,
              };
            }
            return horario;
          });
          return {
            ...dia,
            horarios: updatedHorarios,
          };
        }
        return dia;
      });

      if (!vehicleData) {
        console.error("Dados do veículo não encontrados.");
        return;
      }

      console.log("Dados do veículo atualizados:", updatedDias);

      await firebase
        .firestore()
        .collection("vehicles")
        .doc(agendaAll?.idVehicle)
        .update({
          dias: updatedDias,
        });

      await firebase
        .firestore()
        .collection("users")
        .doc(agendamento.userAgendamento.userId)
        .update({
          situacaoAgenda: "",
        });

      setUserData({ ...userData, situacaoAgenda: "" } as UserProps);

      Alert.alert("Agendamento deletado e vagas atualizadas com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao deletar agendamento ou atualizar vagas: ", error);
    }
  }

  async function handleConfirmar() {
    try {
      await firebase
        .firestore()
        .collection("agendamento")
        .doc(agendamento.id)
        .update({
          status: STATUS.CONFIRMADO,
          userAgendamento: {
            ...agendamento.userAgendamento,
            situacaoAgenda: "confirmado",
          },
        });

      await firebase
        .firestore()
        .collection("users")
        .doc(agendamento.userAgendamento.userId)
        .update({
          situacaoAgenda: STATUS.CONFIRMADO,
        });

      setUserData({
        ...userData,
        situacaoAgenda: STATUS.CONFIRMADO,
      } as UserProps);

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao confirmar agendamento: ", error);
    }
  }

  return (
    <View className="flex-1 px-6">
      <ImageBackGroundCustom
        source={require("@/assets/fundoDetalheAgenda.png")}
      />

      <Header className="flex-row gap-10 mt-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <Header.Icon>
            <FontAwesome6 name="circle-arrow-left" size={24} color="gray" />
          </Header.Icon>
        </TouchableOpacity>
        <Header.Title title="Agendamento" className="text-3xl" />
      </Header>

      <InfoAgenda
        icon={
          <AntDesign
            name="calendar"
            size={22}
            color={theme.colors.coolGray[500]}
          />
        }
        title="Dia"
        info={`${formatDataDate(agendamento.date.toDate())} (${getDayWeekDate(agendamento.date.toDate())})`}
      />
      <InfoAgenda
        icon={
          <FontAwesome
            name="clock-o"
            size={23}
            color={theme.colors.coolGray[500]}
          />
        }
        title="Horário"
        info={agendamento.horaAgendamento}
      />
      <InfoAgenda
        icon={
          <Ionicons
            name="location-outline"
            size={22}
            color={theme.colors.coolGray[500]}
          />
        }
        title="Local"
        info={agendamento?.userAgendamento?.bairro}
      />

      <View className="w-full h-[1px] bg-Cgray-200/50 mt-5" />

      <Text className="font-titulo text-base mt-5">Tipo de serviço</Text>

      <Text className="text-xl font-medium text-Cblue-300 mt-3">
        {agendamento.tipoServico}
      </Text>

      {agendamento.status === STATUS.AGENDADO && (
        <Button.Root
          onPress={handleDeleteAgenda}
          variant="rounded"
          className="w-[80%] border border-Cgray-300 bg-gray-300 mt-4 self-center"
        >
          <ButtonText title="CANCELAR" />
        </Button.Root>
      )}

      <View className="w-full h-[1px] bg-Cgray-200/50 mt-5" />

      <Text className="mt-5 text-base text-Cgray-200 font-medium">
        Para garantir o procedimento escolhido é necessário que seja confirmado
        a sua presença
      </Text>

      {agendamento.status === STATUS.AGENDADO && (
        <View className="flex-1 justify-end pb-6">
          <ButtonRoot
            variant="roudend1"
            className="gap-4"
            onPress={handleConfirmar}
          >
            <Button.Text title="CONFIRMAR PRESENÇA" className="text-white" />
            <Button.Icon
              icon={<FontAwesome name="arrow-right" size={20} color="white" />}
            />
          </ButtonRoot>
        </View>
      )}
    </View>
  );
}
function setUserData(arg0: {}) {
  throw new Error("Function not implemented.");
}

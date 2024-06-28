import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Select,
  Center,
  Box,
  CheckIcon,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "@/firebase/firebaseConnection";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Constants from "expo-constants";
import { UserProps, useUserStorage } from "@/store/user";
import { getDayWeek } from "@/utils/AgendaData";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AgendaStackParamList } from "@/routes/AppRoutes/stackagenda";
import { Aviso } from "@/app/components/Aviso/Aviso";
import { Button } from "@/app/components/button";
import { useAgendaStore } from "@/store/agenda";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AgendamentoRouteProp = RouteProp<AgendaStackParamList, "Agendamento">;

export type UserAgendaProps = Omit<
  UserProps,
  "avatar" | "imageAdress" | "adressSend" | "confirmado"
>;

export type AgendamentoProps = {
  date: Date;
  diaAgendamento: string;
  diaSemana: string;
  horaAgendamento: string;
  status: string;
  tipoServico: string;
  userAgendamento: UserAgendaProps;
};

const SERVICES = [
  "Extração",
  "Restauração",
  "Clareamento",
  "Tratamento de Canal",
];

export default function Agendamento() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AgendaStackParamList>>();
  const [service, setService] = useState("");
  const [invalidService, setInvalidService] = useState(false);
  const [loading, setLoading] = useState(false);
  const { agendaAll, setAgendaAll } = useAgendaStore();

  const route = useRoute<AgendamentoRouteProp>();
  const { userData } = useUserStorage();
  const { horario, dia, indexHora, indexDia } = route.params;

  const DataCompleta = format(dia?.date?.toDate()!!, "dd/MM/yyyy", {
    locale: ptBR,
  });
  const dayWeek = getDayWeek(dia?.date!!);

  console.log("indexDia: ", indexDia, "indexHora: ", indexHora);
  console.log("AgendaID: ", agendaAll?.idVehicle);

  function handleSelect(itemValue: string) {
    setService(itemValue);
    setInvalidService(false);
  }

  async function handleAgendar() {
    if (service === "") {
      setInvalidService(true);
      return;
    }

    if (!userData) return;

    const agendamento: AgendamentoProps = {
      date: dia?.date?.toDate()!!,
      diaAgendamento: DataCompleta,
      diaSemana: dayWeek,
      horaAgendamento: horario.horario,
      status: "pendente",
      tipoServico: service,
      userAgendamento: {
        userId: userData?.userId,
        email: userData?.email,
        nome: userData?.nome,
        situacaoAgenda: userData?.situacaoAgenda,
        cep: userData?.cep,
        bairro: userData?.bairro,
        cpf: userData?.cpf,
        telefone: userData?.telefone,
      },
    };

    try {
      setLoading(true);
      await firebase.firestore().collection("agendamento").add(agendamento);

      const updatedVehicle = {
        ...agendaAll,
        dias: agendaAll?.dias.map((dia, diaIndex) =>
          diaIndex === indexDia
            ? {
                ...dia,
                horarios: dia.horarios.map((horario, horaIndex) =>
                  horaIndex === indexHora
                    ? {
                        ...horario,
                        horario: horario.horario,
                        vagas: horario.vagas,
                        vagasOcupadas: horario.vagasOcupadas + 1,
                      }
                    : horario
                ),
              }
            : dia
        ),
      };

      await firebase
        .firestore()
        .collection("vehicles")
        .doc(agendaAll?.idVehicle)
        .update(updatedVehicle);
      Alert.alert(
        "Agendamento realizado com sucesso!",
        "Você precisa confirmar a sua presença na tela meu agendamento.",
        [
          {
            text: "ok",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "Agenda" }] }),
          },
        ]
      );
    } catch (error) {
      console.log("Erro ao agendar: ", error);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      className="flex-1 px-6 pb-4"
      style={{ marginTop: Constants.statusBarHeight - 10 }}
    >
      <View className="w-full px-4">
        <Text className="text-3xl font-titulo mb-4 text-Cgray-300">
          AGENDAMENTO
        </Text>

        <View className="flex-row gap-3 items-center">
          <Text className="text-lg text-Cgray-300 font-titulo">Dia:</Text>
          <Text className="text-lg text-Cgray-200 font-medium">
            {DataCompleta} ({dayWeek})
          </Text>
        </View>

        <View className="flex-row gap-3 items-center">
          <Text className="text-lg text-Cgray-300 font-titulo">Horário:</Text>
          <Text className="text-lg text-Cgray-200 font-medium">
            {horario.horario}
          </Text>
        </View>

        <View className="flex-row gap-3 items-center">
          <Text className="text-lg text-Cgray-300 font-titulo">Local:</Text>
          <Text className="text-lg text-Cgray-200 font-medium">
            {userData?.bairro}
          </Text>
        </View>
      </View>

      <Text className="text-xl mt-8 text-Cgray-300 font-medium">
        Tipo de Serviço
      </Text>

      <Center>
        <Box maxW="300">
          <FormControl w="3/4" maxW={300} isInvalid={invalidService} isReadOnly>
            <Select
              selectedValue={service}
              minWidth="300"
              fontSize={"md"}
              borderColor={"gray.300"}
              accessibilityLabel="Escolha o service"
              placeholder="Escolha o serviço"
              placeholderTextColor={"gray.700"}
              _selectedItem={{
                bg: "blue.400",
                borderRadius: "md",
                _text: {
                  color: "white",
                },
                endIcon: <CheckIcon size="5" color="teal.700" />,
              }}
              color={"gray.700"}
              variant="rounded"
              mt={1}
              onValueChange={(itemValue) => handleSelect(itemValue)}
            >
              {SERVICES.map((service, index) => (
                <Select.Item
                  key={index}
                  label={service}
                  value={service}
                  _pressed={{
                    bg: "blue.200",
                    borderRadius: "md",
                  }}
                />
              ))}
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Escolha um serviço!
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
      </Center>

      <View className="w-full h-[1px] bg-ligthGray-300 mt-5 mb-1" />

      <Aviso text="Após o agendamento, você precisa confirmar a sua presença na aba de agendamentos. Você pode também cancelar o agendamento a qualquer momento." />

      <View className="flex-1 justify-end">
        <Button.Root
          variant="roudend1"
          className="gap-6"
          onPress={handleAgendar}
        >
          {loading ? (
            <ActivityIndicator size={24} color="black" />
          ) : (
            <Button.Text title="AGENDAR" className="text-lg text-white" />
          )}
          <Button.Icon
            icon={<FontAwesome5 name="arrow-right" size={20} color="white" />}
          />
        </Button.Root>
      </View>
    </SafeAreaView>
  );
}

import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ptBR } from 'date-fns/locale';

import { format } from 'date-fns';
import { Entypo } from '@expo/vector-icons';
import { DiasProps, HorarioProps } from '@/utils/AgendaData';
import { AgendaStackParamList } from '@/routes/AppRoutes/stackagenda';

type AgendaVagasProps = {
  data: HorarioProps;
  diaSelecionado?: DiasProps;
  indexHora: number;
  indexDia: number;
}

export function ListHorarios({ data, diaSelecionado, indexHora, indexDia }: AgendaVagasProps) {
  const navigation = useNavigation<NativeStackNavigationProp<AgendaStackParamList>>();

  const DataCompleta = format(diaSelecionado?.date?.toDate() || new Date(), 'dd/MM/yyyy', { locale: ptBR });

  return (
    <TouchableOpacity
      className='w-full border border-Cblue-300 rounded mb-7'
      onPress={() => navigation.navigate('Agendamento', { horario: data, dia: diaSelecionado, indexHora, indexDia, })}
    >
      <View className='w-ful px-4 h-12 flex-row items-center justify-between bg-Cblue-300'>
        <Text className='text-lg text-white'>Horário para:</Text>
        <Text className='text-base text-white font-titulo'>{data.vagas - data.vagasOcupadas} VAGAS</Text>
      </View>

      <View className='flex-row justify-between items-center px-4 h-16'>
        <Text className='text-lg font-titulo text-Cgray-300'>Dia {DataCompleta}</Text>
        <View className='w-0.5 h-10 bg-Cgray-100' />
        <View className='flex-row gap-2 items-center'>
          <Entypo name="stopwatch" size={29} color="black" />
          <Text className='font-titulo text-lg'>{data.horario}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
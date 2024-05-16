import { useState } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import { Select, Center, Box, CheckIcon } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Constants from 'expo-constants';
import { useUserStorage } from '@/store/user';
import { getDayWeek } from '@/utils/AgendaData';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AgendaStackParamList } from '@/routes/AppRoutes/stackagenda';
import { Aviso } from '@/app/components/Aviso/Aviso';
import { Button } from '@/app/components/button';

type AgendamentoRouteProp = RouteProp<AgendaStackParamList, 'Agendamento'>

const SERVICES = ['Extração', 'Restauração', 'Clareamento', 'Tratamento de Canal']

export default function Agendamento() {
  const [service, setService] = useState('')

  const route = useRoute<AgendamentoRouteProp>();
  const { userData } = useUserStorage()
  const { horario, dia } = route.params;

  const DataCompleta = format(dia?.date?.toDate() || new Date(), 'dd/MM/yyyy', { locale: ptBR });
  const dayWeek = getDayWeek(dia?.date!!);

  return (
    <SafeAreaView className='flex-1 px-6 pb-4' style={{ marginTop: Constants.statusBarHeight - 10 }}>
      <View className='w-full px-4'>
        <Text className='text-3xl font-titulo mb-4 text-Cgray-300'>AGENDAMENTO</Text>

        <View className='flex-row gap-3 items-center'>
          <Text className='text-lg text-Cgray-300 font-titulo'>Dia:</Text>
          <Text className='text-lg text-Cgray-200 font-medium'>{DataCompleta} ({dayWeek})</Text>
        </View>

        <View className='flex-row gap-3 items-center'>
          <Text className='text-lg text-Cgray-300 font-titulo'>Horário:</Text>
          <Text className='text-lg text-Cgray-200 font-medium'>{horario.horario}</Text>
        </View>

        <View className='flex-row gap-3 items-center'>
          <Text className='text-lg text-Cgray-300 font-titulo'>Local:</Text>
          <Text className='text-lg text-Cgray-200 font-medium'>{userData?.bairro}</Text>
        </View>
      </View>


      <Text className='text-xl mt-8 text-Cgray-300 font-medium'>Tipo de Serviço</Text>

      <Center>
        <Box maxW="300">
          <Select
            selectedValue={service}
            minWidth="300"
            fontSize={'md'}
            borderColor={'gray.300'}
            accessibilityLabel="Escolha o service"
            placeholder="Escolha o serviço"
            placeholderTextColor={'gray.700'}
            _selectedItem={{
              bg: "blue.400",
              borderRadius: "md",
              _text: {
                color: "white",
              },
              endIcon: <CheckIcon size="5" color="teal.700" />,
            }}
            color={'gray.700'}
            variant='rounded'
            mt={1}
            onValueChange={itemValue => setService(itemValue)}>

            {SERVICES.map((service, index) => (
              <Select.Item
                key={index}
                label={service}
                value={service}
                _pressed={{
                  bg: 'blue.200',
                  borderRadius: 'md',
                }} />
            ))}

          </Select>
        </Box>
      </Center>

      <View className='w-full h-[1px] bg-ligthGray-300 mt-5 mb-1' />

      <Aviso text='Após o agendamento, você precisa confirmar a sua presença na aba de agendamentos. Você pode também cancelar o agendamento a qualquer momento.' />

      <View className='flex-1 justify-end'>
        <Button.Root variant='roudend1' className='gap-6' onPress={() => Alert.alert("Aviso!", 'Em Breve...')}>
          <Button.Text title='AGENDAR' className='text-lg text-white' />
          <Button.Icon icon={<FontAwesome5 name="arrow-right" size={20} color='white' />} />
        </Button.Root>
      </View>
    </SafeAreaView>
  );
}
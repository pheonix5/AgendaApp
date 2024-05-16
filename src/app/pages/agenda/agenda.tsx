import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useUserStorage } from '@/store/user';
import firebase from '@/firebase/firebaseConnection';
import { View, Text, SafeAreaView, ScrollView, Pressable, FlatList, StatusBar, ImageBackground } from 'react-native';

import { DiasProps, ListHorarioProps, getDayWeek } from '@/utils/AgendaData';

import { startOfWeek, endOfWeek, set } from 'date-fns';

import { AgendaDataProps } from '@/utils/AgendaData';
import { ListHorarios } from '@/app/components/ListHorarios/ListHorarios';

const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

const DIASSEMANAS = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo']

export default function Agenda() {
  const [selected, setSelect] = useState('segunda-feira')
  const [agendaData, setAgendaData] = useState<AgendaDataProps[]>([])
  const [horarios, setHorarios] = useState<ListHorarioProps>([])
  const [diaSelecionado, setDiaSelecionado] = useState<DiasProps>()

  const { userData } = useUserStorage()


  useEffect(() => {
    const getAgenda = async () => {
      try {
        const snapshot = await firebase.firestore()
          .collection('vehicles')
          .where('bairro', '==', userData?.bairro)
          .get();

        const filteredData = [] as AgendaDataProps[];
        snapshot.forEach(doc => {
          const data = doc.data() as AgendaDataProps;
          const validDays = data.dias.filter(dia => dia.date.toDate() >= startOfThisWeek && dia.date.toDate() <= endOfThisWeek);
          if (validDays.length > 0) {
            filteredData.push({
              ...data,
              dias: validDays
            });
          }
          setAgendaData(filteredData);
        })
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    getAgenda();
  }, []);


  function handleSelectDay(selectedDay: string) {
    setSelect(selectedDay);
    const semanaAtual = agendaData.find(semana => semana.dias.find(dia => getDayWeek(dia.date) === selectedDay));
    const diaSelecionado = semanaAtual?.dias.find(dia => getDayWeek(dia.date) === selectedDay);

    if (diaSelecionado) {
      setDiaSelecionado(diaSelecionado)
      setHorarios(diaSelecionado.horarios)
    } else {
      setHorarios([])
    }
  }


  return (
    <SafeAreaView className='flex-1 py-1' style={{ marginTop: StatusBar.currentHeight }}>
      <ImageBackground
        source={require('@/assets/bgAgenda.jpg')}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingHorizontal: 16}}
      >
        <View className='w-full gap-1 mb-3'>
          <Text className='text-3xl font-titulo text-Cgray-300 text-center'>Horários Disponíveis</Text>
          <Text className='text-xl font-titulo text-Cgray-200'>{userData?.bairro}</Text>
        </View>

        <View className='w-full bg-[#e0ecf1] rounded-md'>
          <ScrollView
            horizontal
            style={{ paddingHorizontal: 4, width: '100%' }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ height: 40 }}
          >
            {DIASSEMANAS.map((dias, index) => (
              <Pressable
                key={index}
                className={clsx('h-full w-36 wflex-row justify-center items-center px-4',
                  index !== DIASSEMANAS.length - 1 && 'border-r border-Cgray-300',
                  selected === dias ? 'bg-Cgray-300' : 'bg-transparent',
                  index === 0 ? 'rounded-tl-md rounded-bl-md' : index === DIASSEMANAS.length - 1 ? 'rounded-tr-md rounded-br-md' : 'border-none'
                )}
                onPress={() => handleSelectDay(dias)}
              >
                <Text className={clsx('text-sm font-titulo',
                  selected === dias ? 'text-white' : 'text-Cgray-300'
                )}>{dias.toUpperCase()}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Text className='mt-2 text-lg text-Cgray-200 font-medium'>Selecione o horário</Text>

        <FlatList
          data={horarios}
          keyExtractor={(item) => item.horario}
          renderItem={({ item, index }) => {
            return <ListHorarios data={item} diaSelecionado={diaSelecionado} indexHora={index} />
          }}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
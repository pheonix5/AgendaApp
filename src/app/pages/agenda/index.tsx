import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useUserStorage } from '@/store/user';
import firebase from '@/firebase/firebaseConnection';
import { View, Text, SafeAreaView, ScrollView, Pressable, FlatList, StatusBar, ImageBackground } from 'react-native';

import { DiasProps, ListHorarioProps, getDayWeek } from '@/utils/AgendaData';

import { startOfWeek, endOfWeek } from 'date-fns';

import { AgendaDataProps } from '@/utils/AgendaData';
import { ListHorarios } from '@/app/components/ListHorarios/ListHorarios';
import { useAgendaStore } from '@/store/agenda';
import AgendaComponent from './Agenda';

const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

// const DIASSEMANAS = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo']

export default function Agenda() {
  const [selected, setSelect] = useState('segunda-feira')
  const [agendaDataWeek, setAgendaDataWeek] = useState<AgendaDataProps[]>([])
  const [horarios, setHorarios] = useState<ListHorarioProps>([])
  const [indexDia, setIndexDia] = useState<number>(0)
  const [diaSelecionado, setDiaSelecionado] = useState<DiasProps>()
  const { agendaAll, setAgendaAll } = useAgendaStore()

  const { userData } = useUserStorage()


  useEffect(() => {
    const getAgenda = async () => {
      try {
        const snapshot = await firebase.firestore()
          .collection('vehicles')
          .where('bairro', '==', userData?.bairro)
          .get();

        const filteredData = [] as AgendaDataProps[];
        const response =  snapshot.docs.map(doc => {
          const data = doc.data() as AgendaDataProps;
          const validDays = data.dias.filter(dia => dia.date.toDate() >= startOfThisWeek && dia.date.toDate() <= endOfThisWeek);
          if (validDays.length > 0) {
            filteredData.push({
              ...data,
              dias: validDays
            });
          }
          const docAgenda = { 
            //@ts-ignore
            idVehicle: doc.id,
            ...data
          }
          setAgendaDataWeek(filteredData);
          return docAgenda as AgendaDataProps
        })
        setAgendaAll(response[0])
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    getAgenda();
  }, []);


  function handleSelectDay(selectedDay: string) {
    setSelect(selectedDay);
    const semanaAtual = agendaDataWeek.find(semana => semana.dias.find(dia => getDayWeek(dia.date) === selectedDay));
    const diaSelecionado = semanaAtual?.dias.find(dia => getDayWeek(dia.date) === selectedDay);

    if (diaSelecionado) {
      setDiaSelecionado(diaSelecionado)
      setHorarios(diaSelecionado.horarios)
    } else {
      setHorarios([])
    }
  }

  // lucas saiu, guaxz no any desk.
  // obs: já terminei ai lucas, tá pronto eu acho.

  // if(userData?.situacaoAgenda.includes("agendado")) {
  //   return(
  //     <View className='flex-1 justify-center items-center'>
  //       <Text>Cofirme seu agendamento energumeno</Text>
  //     </View>
  //   )
  // }

  return (
    <AgendaComponent agendaDataWeek={agendaDataWeek} diaSelecionado={diaSelecionado!} handleSelectDay={handleSelectDay} horarios={horarios} indexDia={indexDia} selected={selected} setIndexDia={setIndexDia}  />
  );
}
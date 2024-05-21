import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { useUserStorage } from '@/store/user';
import firebase from '@/firebase/firebaseConnection';
import { View, Text, SafeAreaView, ScrollView, Pressable, FlatList, StatusBar, ImageBackground } from 'react-native';

import { DiasProps, ListHorarioProps, getDayWeek } from '@/utils/AgendaData';

import { startOfWeek, endOfWeek } from 'date-fns';

import { AgendaDataProps } from '@/utils/AgendaData';
import { ListHorarios } from '@/app/components/ListHorarios/ListHorarios';
import { useAgendaStore } from '@/store/agenda';

const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

interface IAgendaComponent {
  agendaDataWeek: AgendaDataProps[];
  selected: string;
  handleSelectDay: (day: string) => void;
  setIndexDia: (index: number) => void;
  horarios: ListHorarioProps;
  indexDia: number;
diaSelecionado: DiasProps;

}


export default function AgendaComponent({agendaDataWeek, selected, handleSelectDay, setIndexDia, diaSelecionado, horarios, indexDia}: IAgendaComponent){
  const {userData} =useUserStorage()
  return(
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
          {agendaDataWeek[0]?.dias?.map((dias, index) => (
            <Pressable
              key={index}
              className={clsx('h-full w-36 wflex-row justify-center items-center px-4',
                index !== agendaDataWeek.length +1 && 'border-r border-Cgray-300',
                selected === getDayWeek(dias.date) ? 'bg-Cgray-300' : 'bg-transparent',
                index === 0 ? 'rounded-tl-md rounded-bl-md' : index === agendaDataWeek.length - 1 ? 'rounded-tr-md rounded-br-md' : 'border-none'
              )}
              onPress={() => {
                handleSelectDay(getDayWeek(dias.date))
                setIndexDia(index)
              }}
            >
              <Text className={clsx('text-sm font-titulo',
               selected === getDayWeek(dias.date) ? 'text-white' : 'text-Cgray-300'
              )}>{getDayWeek(dias.date).toUpperCase()}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text className='mt-2 text-lg text-Cgray-200 font-medium'>Selecione o horário</Text>

      <FlatList
        data={horarios}
        keyExtractor={(item) => item.horario}
        renderItem={({ item, index }) => {
          return <ListHorarios data={item} diaSelecionado={diaSelecionado} indexHora={index} indexDia={indexDia}/>
        }}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </ImageBackground>
  </SafeAreaView>
  )
}
import React from 'react';
import { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacityProps, TouchableOpacity, ActivityIndicator } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Fontisto, FontAwesome6, Ionicons } from '@expo/vector-icons'

import * as yup from 'yup'
import { Input } from '../input';
import { theme } from '@/theme/theme';
import { Button } from '../button';
import { useUserStorage } from '@/store/user';


type ModalAuthProps = TouchableOpacityProps & {
  tipoAcao: 'cadastro' | 'login'
  setModalVisible: (value: boolean) => void
  setTipoAcao: (tipoAcao: 'cadastro' | 'login') => void;
}

type UserFormDataProps = {
  email: string
  senha: string
}

const ABSOLUTFILL = 'top-0 bottom-0 left-0 right-0'


const authSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required("Informe o e-mail"),
  senha: yup.string().min(6, 'A Senha deve ter no Mínimo 6 caracaters').required("Informe a senha"),
})


export default function ModalAuth({ tipoAcao, setTipoAcao, setModalVisible }: ModalAuthProps) {
  const { register, loading, } = useUserStorage()
  const [showPassword, setShowPassword] = useState(false)


  const { control, handleSubmit, formState: { errors } } = useForm<UserFormDataProps>({
    mode: 'onChange',
    resolver: yupResolver<UserFormDataProps>(authSchema)
  })


  async function handleAuthCreate(data: UserFormDataProps) {
    const { email, senha } = data;
    await register(email.toLocaleLowerCase(), senha, tipoAcao);
  }

  return (
    <View className='flex-1 justify-end'>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className={`absolute ${ABSOLUTFILL} bg-black/50`} />
      </TouchableWithoutFeedback>


      <View className='relative w-full h-[75%] rounded-t-[32px] overflow-hidden'>
        <LinearGradient
          className='w-full h-full opacity-65'
          colors={['#1199EE', '#045FC7']}
        />

        <KeyboardAwareScrollView className={`absolute h-full ${ABSOLUTFILL} py-10 px-6`}>

          <View className='flex-col items-start mb-10'>
            <Text className='text-white text-3xl font-medium'>Agendamento Online -</Text>
            {tipoAcao === 'cadastro' ? (
              <Text className='text-white text-3xl leading-[3rem] font-medium'>Criar Conta</Text>
            ) : (
              <Text className='text-white text-3xl leading-[3rem] font-medium'>Entrar</Text>
            )}
          </View>

          <View className='flex-1 gap-3'>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange } }) => (
                <Input.Root erroMessage={errors.email?.message} tipoAcao={tipoAcao}>
                  <Input.Label label='E-mail' className='text-white' />
                  <Input.Container>
                    <Input.Icon icon={<Fontisto name="email" color={theme.color.ligthGray[300]} size={24} />} />
                    <Input.Input
                      placeholder='Digite seu e-mail'
                      onChangeText={onChange}
                      errorMessage={errors.email?.message}
                    />
                  </Input.Container>
                </Input.Root>
              )}
            />

            <Controller
              control={control}
              name='senha'
              render={({ field: { onChange } }) => (
                <Input.Root erroMessage={errors.senha?.message} tipoAcao={tipoAcao}>
                  <Input.Label label='Senha' className='text-white' />
                  <Input.Container className='justify-between'>
                    <Input.Input
                      placeholder='Senha'
                      onChangeText={onChange}
                      errorMessage={errors.email?.message}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Input.Icon icon={<Ionicons name="eye-off" size={24} color={theme.color.ligthGray[300]} />} />
                      ) : (
                        <Input.Icon icon={<Ionicons name="eye" size={24} color={theme.color.ligthGray[300]} />} />
                      )}
                    </TouchableOpacity>
                  </Input.Container>
                </Input.Root>
              )}
            />

            <Button.Root
              variant='roudend3'
              className='gap-3 mt-4'
              onPress={handleSubmit(handleAuthCreate)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size={24} color={theme.color.Cgray[300]} />
              ) : (
                <>
                  <Button.Text title={tipoAcao === 'cadastro' ? 'CRIAR CONTA' : "ENTRAR"} className='text-Cgray-300' />
                  <Button.Icon icon={<FontAwesome6 name="arrow-right-long" color={theme.color.ligthGray[300]} size={24} />} />
                </>
              )}
            </Button.Root>
          </View>

          <View className='w-full mt-4 justify-center items-center'>
            {tipoAcao === 'cadastro' ? (
              <>
                <Text className='text-white text-center text-base'>Já Possui uma Conta?</Text>
                <TouchableOpacity className='self-center' onPress={() => setTipoAcao('login')}>
                  <Text className='text-white text-xl font-titulo'>Fazer Login</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View className='w-full flex-row items-center justify-center gap-2 '>
                <Text className='text-white text-center text-base'>Não tem conta?</Text>

                <TouchableOpacity onPress={() => setTipoAcao('cadastro')}>
                  <Text className='text-white text-xl font-titulo'>Criar Conta</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
import { useState } from 'react';
import { View, Modal } from 'react-native';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { Avatar } from '@/app/components/Avatar/Avatar';
import { Input } from '@/app/components/input';
import { ModalPicker } from '@/app/components/ModalPicker/ModalPicker';
import { Controller, useForm } from 'react-hook-form';
import { theme } from '@/theme/theme';


type UserFormDataProps = {
  avatar?: string
  nomeCompleto: string
  cep: string
  comprovante: string,
  cpf: string,
  celular: string,
}


const userSchema = yup.object({
  nomeCompleto: yup.string().required('Nome é obrigatório'),
  cep: yup.string().matches(/^\d{5}-?\d{3}$/, 'CEP inválido').required('CEP é obrigatório'),
  cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido').required('CPF é obrigatório'),
  celular: yup.string().matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, 'Celular inválido').required('Celular é obrigatório'),
  comprovante: yup.string().required('Comprovante é obrigatório'),
  avatar: yup.string()
})

export default function ConfirmaPerfil() {
  const [modalVisible, setModalVisible] = useState(false)
  const [isAvatar, setIsAvatar] = useState(false)
  const [avatar, setAvatar] = useState<any>(null)
  const [imagem, setImagem] = useState<any>(null)

  const { control, handleSubmit, formState: { errors } } = useForm<UserFormDataProps>({
    mode: 'onChange',
    resolver: yupResolver<UserFormDataProps>(userSchema)
  })

  function handleModalPicker() {
    setModalVisible(!modalVisible)
    setIsAvatar(false)
  }

  function handleModalPickerAvatar() {
    setModalVisible(!modalVisible);
    setIsAvatar(true);
  }

  return (
    <KeyboardAwareScrollView className='flex-1 px-6 pt-6'>
      <Avatar onPress={handleModalPickerAvatar} avatar={avatar} />


      <View className='pt-4'>
        <Controller
          control={control}
          name='nomeCompleto'
          render={({ field: { onChange } }) => (
            <Input.Root erroMessage={errors.nomeCompleto?.message}>
              <Input.Label label='Nome Completo' className='text-Cgray-500 font-medium' />
              <Input.Container className='border-[1px] border-ligthGray-300'>
                <Input.Icon icon={<MaterialCommunityIcons name="format-text" size={24} color={theme.color.ligthGray[300]} />} />
                <Input.Input
                  placeholder='Nome Completo'
                  onChangeText={onChange}
                  errorMessage={errors.nomeCompleto?.message}
                  placeholderTextColor={theme.color.ligthGray[300]}
                />
              </Input.Container>
            </Input.Root>
          )}
        />
      </View>


      <View className='pt-4'>
        <Controller
          control={control}
          name='nomeCompleto'
          render={({ field: { onChange } }) => (
            <Input.Root erroMessage={errors.cep?.message}>
              <Input.Label label='CEP' className='text-Cgray-500 font-medium' />
              <Input.Container className='border-[1px] border-ligthGray-300'>
                <Input.Icon icon={<Entypo name="location-pin" size={24} color={theme.color.ligthGray[300]} />} />
                <Input.Input
                  placeholder='CEP'
                  onChangeText={onChange}
                  errorMessage={errors.cep?.message}
                  placeholderTextColor={theme.color.ligthGray[300]}
                />
              </Input.Container>
            </Input.Root>
          )}
        />
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >

        <ModalPicker
          setModalVisible={handleModalPicker}
          setImage={setImagem}
          setAvatar={setAvatar}
          isAvatar={isAvatar}
        />
      </Modal>
    </KeyboardAwareScrollView>
  );
}
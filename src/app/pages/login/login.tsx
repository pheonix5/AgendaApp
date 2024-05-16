import { View, Text, ImageBackground, Image, Modal } from 'react-native';
import brackground from '@/assets/cidade.png'
import logo from '@/assets/logo.png'
import { Button } from '@/app/components/button';
import { useState } from 'react';
import ModalAuth from '@/app/components/ModalAuth/modal';


export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [acaoTipo, setAcaoTipo] = useState<'cadastro' | 'login'>('cadastro')

  function handleShowModal(tipoAcao: 'cadastro' | 'login') {
    setShowModal(true)
    setAcaoTipo(tipoAcao)
  }

  return (
    <ImageBackground
      source={brackground}
      style={{ width: '100%', height: '100%' }}
      resizeMode='cover'
      className='items-center flex-1'
    >

      <View className='w-full flex-1 mb-10 justify-center items-center '>
        {/* <Image
          source={logo}
          className='w-[320]'
          resizeMode='contain'
        /> */}
      </View>


      <View className='w-full flex-1 items-center justify-center  gap-8 px-10 mt-32'>
        {!showModal && (
          <>
            <Button.Root variant='rounded' onPress={() => handleShowModal('cadastro')}>
              <Button.Text title='CRIAR CONTA' className='text-white' />
            </Button.Root>

            <Button.Root variant='roudend2' onPress={() => handleShowModal('login')}>
              <Button.Text title='ENTRAR EM UMA CONTA' />
            </Button.Root>
          </>
        )}

      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ModalAuth setModalVisible={setShowModal} tipoAcao={acaoTipo} setTipoAcao={setAcaoTipo} />
      </Modal>

    </ImageBackground>
  );
}
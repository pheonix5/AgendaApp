import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AntDesign, Entypo } from '@expo/vector-icons';
import { theme } from '@/theme/theme';

type ModalPickerProps = {
  setModalVisible: (visible: boolean) => void;
  isAvatar: boolean;
  setImage: any
  setAvatar: any
}

const ABSOLUTFILL = 'top-0 bottom-0 left-0 right-0'

export function ModalPicker({ setModalVisible, setImage, setAvatar, isAvatar }: ModalPickerProps) {


  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (isAvatar) {
        setAvatar(result.assets[0].uri);
        setModalVisible(false);
      } else {
        setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    }
  };

  const takePhoto = async () => {
    let photoResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photoResult.canceled) {
      if (isAvatar) {
        setAvatar(photoResult.assets[0].uri);
        setModalVisible(false);
      } else {
        setImage(photoResult.assets[0].uri);
        setModalVisible(false);
      }
    }
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className={`absolute ${ABSOLUTFILL} bg-black/50`} />
      </TouchableWithoutFeedback>

      <View className='flex-row bg-white rounded-md border-2 border-Cblue-100'>
        <TouchableOpacity className='items-center justify-center p-4' onPress={takePhoto}>
          <AntDesign name="camera" size={28} color={theme.color.Cblue[400]} />
          <Text className='text-Cblue-400 font-medium'>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity className='items-center justify-center p-4' onPress={pickImage}>
          <Entypo name="image-inverted" size={28} color={theme.color.Cblue[400]} />
          <Text className='text-Cblue-400 font-medium'>Galeria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
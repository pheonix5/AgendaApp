import { View, Text } from 'react-native';

type AvisoProps = {
  text: string;
}

export function Aviso({ text}: AvisoProps) {
 return (
   <View className='w-full mt-4 border border-Cgray-500 rounded-md py-3 px-3 text-center'>
    <Text className='text-base text-Cgray-200 font-body'>{text}</Text>
   </View>
  );
}



import { View, ActivityIndicator } from 'react-native';

export function LoadingFonts() {
 return (
   <View className='flex flex-1 justify-center items-center'>
    <ActivityIndicator size={32} color="#1199EE"/>
   </View>
  );
}
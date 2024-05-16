import { useUserStorage } from '@/store/user';
import { Button, View } from 'react-native';

export default function Perfil() {
  const { logout } = useUserStorage()

 return (
   <View className='flex-1 justify-center items-center'>
    <Button title='Sair' onPress={logout}/>
   </View>
  );
}
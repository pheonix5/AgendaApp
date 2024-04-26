import { useUserStorage } from '@/store/user';
import { View, Text, Button } from 'react-native';

export default function Agenda() {
  const { logout } = useUserStorage()

 return (
   <View>
    <Text>Tela de Agenda</Text>
    <Button
      title='Sair'
      onPress={logout}
    />
   </View>
  );
}
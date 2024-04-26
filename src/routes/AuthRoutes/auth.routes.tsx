import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../../app/pages/login/login'

const StackLogin = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <StackLogin.Navigator
     screenOptions={{
      headerShown: false,
     }}
    >
      <StackLogin.Screen name="Login" component={Login} />
    </StackLogin.Navigator>
  )
}
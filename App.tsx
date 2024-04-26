import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,

} from '@expo-google-fonts/roboto'


import './src/styles/global.css';
import { LoadingFonts } from './src/app/components/loadingfonts';
import Routes from './src/routes/Routes';



export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if(!fontsLoaded) return <LoadingFonts/>

  return (
    <NavigationContainer>
      <StatusBar style='auto'/>
      <Routes/>
    </NavigationContainer>
  );
}


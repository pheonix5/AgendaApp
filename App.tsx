import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";

import Routes from './src/routes/Routes';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { LoadingFonts } from './src/app/components/loadingfonts';

import './src/styles/global.css';

export default function App() {


  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <LoadingFonts />;

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Routes />
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

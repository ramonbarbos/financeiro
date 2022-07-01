import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';



import Rotas from './src/rotas'


export default function App() {
  return (
    <NavigationContainer screenOptions={{
      headerShown: false
    }}>
     <Rotas/>
  </NavigationContainer>
  );
}



import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons,Foundation,FontAwesome  } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonHome from './components/ButtonHome';

import Home from './pages/Home';
import Create from './pages/Create';
import Grafico from './pages/Grafico';
import Config from './pages/Config';
import Atual from './pages/Atual';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack(navigation) {
  return (
    
    <Stack.Navigator >
      <Stack.Screen name="Homee" component={Home} options={{headerShown: true}} />
      <Stack.Screen name="Atual" component={Atual} options={{headerShown: true}}/>
      
    </Stack.Navigator>
    
  );
}
function MyTabs(navigation) {
  return (
    <Text>Olá</Text> 
  );
}

export default function Rotas(navigation) {
  return (
    
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // com nomes
      
        tabBarStyle: {
          height:75,
          backgroundColor: '#FFFFFF', //cor da barra
          borderTopColor: '#FFFFFF',
          paddingBottom:5,
          paddingTop:5,
          justifyContent:'center'
          
        },
        tabBarActiveTintColor: '#158CDA' ,// cor da ABA selecionado
        tabBarInactiveTintColor: '#010101', //cor da ABA não selecionado
       
      }}
    >

      <Tab.Screen
       name="Inicio"
       component={MyStack}
       options={{
      headerShown: true,

        tabBarLabel:'',
         tabBarIcon:({focused,size,color})=>(
          <ButtonHome size={size} color={color} focused={focused}/>
         )
       }}
       />

      <Tab.Screen
      name="Nova Despesa" 
      component={Create}
      options={{
        
        tabBarIcon:({size,color})=>(
          <MaterialIcons name="add-box" size={30} color={color} />
        )
      }}
      />

      <Tab.Screen 
      name="Grafico" 
      component={Grafico}
      options={{
        tabBarIcon:({size,color})=>(
          <Foundation name="graph-pie" size={30} color={color} />
        )
      }}
      />
      <Tab.Screen 
      name="Config" 
      component={Config}
      options={{
        tabBarIcon:({size,color})=>(
          <FontAwesome name="user" size={30} color={color} />
        )
      }}
      />
     
    </Tab.Navigator>
  );
}



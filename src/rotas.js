import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons,Foundation,FontAwesome  } from '@expo/vector-icons';

import ButtonHome from './components/ButtonHome';

import Home from './pages/Home';
import Create from './pages/Create';
import Grafico from './pages/Grafico';
import Config from './pages/Config';

const Tab = createBottomTabNavigator();


export default function Rotas(navigation) {
  return (
   
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // com nomes
        headerShown: false,
        
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
       name="Home"
       component={Home}
       options={{
        tabBarLabel:'',
         tabBarIcon:({focused,size,color})=>(
          <ButtonHome size={size} color={color} focused={focused}/>
         )
       }}
       />

      <Tab.Screen
      name="Create" 
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



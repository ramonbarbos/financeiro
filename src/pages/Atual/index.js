import  React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity} from 'react-native';

import {Criar} from '../../database/criarbd'

const db = Criar.getConnection();

export default function Atual({navigation}) {



  f

  return (
    <View style={styles.container}>

    
        </View>
  );
}


const styles=StyleSheet.create({
    container:{
      flex:1, 
      padding: 20,
      backgroundColor: 'white',    
    },
  
  });
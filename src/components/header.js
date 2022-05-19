import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,FlatList} from 'react-native';
import  React, { useState, useEffect} from 'react';

import {Criar} from '../database/criarbd'

const db = Criar.getConnection();
//
export default function Header({item}) {
    const [total, setTotal] = useState([]) ; 

//Total Banco de dados SQLite
useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT  Sum(user_valor) AS user_total FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setTotal(temp);
        }
      );
    });
  }, []);

  const Cal=(item)=>{
    return(
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:30,color: '#FFFFFF'}}>Total do Mês</Text>
        <Text style={{fontSize:25,color: '#FFFFFF'}} >R$ {item.user_total},00 </Text>
      </View>
      )
  }

  return (
    <View style={{flex:1,backgroundColor: '#158CDA',height:200, padding:20,justifyContent:'center',alignItems:'center', borderBottomEndRadius: 100}}>
     <FlatList
        style={{marginTop: 50}}
        data={total}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => Cal(item)}
        />
    </View>
  );
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        
    }
  })
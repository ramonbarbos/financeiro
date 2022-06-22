import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,FlatList} from 'react-native';
import  React, { useState, useEffect} from 'react';
import { Entypo, Foundation } from '@expo/vector-icons'; 


import {Criar} from '../database/criarbd'
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = Criar.getConnection();
//
export default function Header({ navigation}) {
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
        <View style={{ flexDirection:'row', alignItems:'center',marginLeft: 20 }}>
            <Foundation name="alert" size={50} color="#E5F1FF" style={{marginRight: 10}} />
          <View style={{}}>
            <View style={{alignItems:'flex-start'}}>
                <Text style={{fontSize:18,color: '#FFFFFF'}}>A pagar</Text>
                <Text style={{fontSize:20,color: '#FFFFFF', fontWeight:'bold'}} >{item.user_total},00 </Text>
            </View>
          </View>

        </View>
      )
  }

  return (

    <View style={{flex:1,backgroundColor: '#158CDA',height:180, padding:20,justifyContent:'center',alignItems:'center'}}>

    <View style={styles.user}>

        <TouchableOpacity onPress={()=> navigation.navigate('Config')}>
          <Entypo name="menu" size={40} color="white" />
        </TouchableOpacity>

        <View style={{width:'80%', alignItems:'center', }}>
          <Text style={{fontSize:22,color: '#FFFFFF'}}>Junho</Text>
        </View>

    </View>

    <View style={{ flexDirection:'row', alignItems:'center'}}>
     <FlatList
        style={{marginTop:30}}
        data={total}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => Cal(item)}
        />
    </View>


    </View>
  );
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    user:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      width: '100%',
      
    }
  })
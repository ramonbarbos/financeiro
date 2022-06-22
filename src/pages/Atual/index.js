import  React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity} from 'react-native';

import {Criar} from '../../database/criarbd'

const db = Criar.getConnection();

export default function Atual({navigation}) {
  const {width, height} = Dimensions.get('screen')
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');


  function Salvar(valor,descricao,data,categoria){
    
        

    //Inserindo Linha na Tabela
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_valor, user_descricao,user_data,user_categoria) VALUES (?,?,?,?)',
        [valor,descricao,data,categoria],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          console.log(valor,descricao,data,categoria);
          navigation.navigate('MyStack');
         
        }
      );
    });

 }


  return (
    <View style={styles.container}>

    
      <View style={{ justifyContent: 'center', alignItems:'center'}} >
      <TextInput 
            style={styles.input_valor}
            placeholder='0,00'
            keyboardType="numeric"
           onChangeText={setValor}
            />
      </View>
      
      <View>

        <View style={{alignItems: 'center', justifyContent: 'center',marginTop:50,}}>
        <TextInput 
            style={{borderBottomWidth: 1,width:350,marginTop:20}}
            placeholder='Descrição'
            keyboardType="default"
            onChangeText={setDescricao}
           
            />
            <TextInput 
            style={{borderBottomWidth: 1,width:350,marginTop:40}}
            placeholder='Data de Vencimento'
            keyboardType="numeric"
            onChangeText={setData}
           
            />
            <TextInput 
            style={{borderBottomWidth: 1,width:350,marginTop:40}}
            placeholder='Categoria'
            keyboardType="default"
           onChangeText={setCategoria}

            />

            <TouchableOpacity 
            style={{backgroundColor:'#158CDA',width:350,height:45,borderRadius:2,marginTop:40,justifyContent:'center', alignItems:'center'}}
            onPress={()=> Salvar(valor,descricao,data,categoria)}
            >
              <Text style={{color:'white', fontSize:20}}>Salvar</Text>
            </TouchableOpacity>
        </View>

      </View>


      </View>
    
  );
}


const styles=StyleSheet.create({
    container:{
      flex:1, 
      padding: 20,
      backgroundColor: 'white',    
    },
    input_valor:{
      width:200,
      height:60,
      borderBottomWidth: 1,
      justifyContent:'center',
    },
    input_outros:{
      width:200,
      height:60,
      borderBottomWidth: 1,
      justifyContent:'center',
    }
  });
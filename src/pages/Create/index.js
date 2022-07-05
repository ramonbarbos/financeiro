import  React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity} from 'react-native';

import Select from '../../components/Select';
import { callList } from '../../components/callList';
import {Criar} from '../../database/criarbd'
import Data from '../../components/Data';

const db = Criar.getConnection();

export default function Create({navigation}) {
  const {width, height} = Dimensions.get('screen')
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState();


  function Salvar(valor,descricao,data,categoria){
    
        

    //Inserindo Linha na Tabela
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_valor, user_descricao,user_data,user_categoria) VALUES (?,?,?,?)',
        [valor,descricao,data,categoria],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          console.log(valor,descricao,data,categoria);
          navigation.navigate('Home');
         
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

        <View style={{alignItems: 'center', justifyContent: 'center',marginTop:50,width: '100%'}}>
        <TextInput 
            style={styles.input_outros}
            placeholder='Descrição'
            keyboardType="default"
            onChangeText={setDescricao}
           
            />
            
            <Data/>

            <Select 
             options={callList}
             onChangeSelect={setCategoria}
             text='Selecione uma categoria'
             
             />

            <TouchableOpacity 
            style={{backgroundColor:'#158CDA',width:'100%',height:45,borderRadius:2,marginTop:50,justifyContent:'center', alignItems:'center'}}
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
      width:'50%',
      height:60,
      borderBottomWidth: 1,
      justifyContent:'center',
      textAlign:'center',
      fontSize: 20,
      padding: 20

    },
    input_outros:{
      width:'100%',
      height:60,
      borderBottomWidth: 1,
      fontSize: 15,
      padding: 20
     
    }
  });
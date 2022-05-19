import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { AntDesign,Feather,FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView, SafeAreaView,Image, TouchableOpacity, Alert } from 'react-native';

import {Criar} from '../../database/criarbd'
import Header from '../../components/header';
import Barra from '../../components/barra';
const db = Criar.getConnection();

//Banco de dados provisorio
const DATA = [

  {
    id: '1',
    title: 'João',
    imgUrl:
      'https://revistaesmeril.com.br/wp-content/uploads/2019/12/calvino.jpg',
    idade: 'Fez o codigo?',
  },
  {
    id: '2',
    title: 'Pedro',
    imgUrl:
      'https://revistaesmeril.com.br/wp-content/uploads/2019/12/calvino.jpg',
    idade: 'Fez o codigo?',
  },
  {
    id: '3',
    title: 'Lucas',
    imgUrl:
      'https://revistaesmeril.com.br/wp-content/uploads/2019/12/calvino.jpg',
    idade: 'Fez o codigo?',
  },
  {
    id: '4',
    title: 'Andressa',
    imgUrl:
      'https://revistaesmeril.com.br/wp-content/uploads/2019/12/calvino.jpg',
    idade: 'Fez o codigo?',
  },
  {
    id: '5',
    title: 'Carlos',
    imgUrl:
      'https://revistaesmeril.com.br/wp-content/uploads/2019/12/calvino.jpg',
    idade: 'Fez o codigo?',
  },
 

]


export default function Home({navigation}) {

  const [pesquisa, setPesquisa] = useState('');
  const [list, setList] = useState(DATA); //variavel dinamica
  const [view, setView] = useState([]); // Visualizar o BD
 


  //Banco de dados SQLite
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'ALTER TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_valor INT(20),user_descricao VARCHAR(20), user_data INT(20), user_categoria VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  //Visualizar Banco de dados SQLite
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setView(temp);
        }
      );
    });
  }, []);

  //Filtragem de Pesquisa
  useEffect(()=>{
    if(pesquisa === ''){
      setList(DATA);
    }else{
      setList(
        DATA.filter((user)=>{
          if(user.title.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1){
            return true;
          }else{
            return false;
          }
        })
      );
    }
  },[pesquisa])

  //Deletar Dados
  function deleteView(key){
    
      Alert.alert(
        "Aviso",
        "Deseja deletar?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => del(key) }
        ]
      );
    };
    function del(key){
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  table_user where user_id=?',
          [key],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            console.log('O ID '+ ' '+key+' foi deletado')
          }
        )
        }
      )
   

  }

  //Visualisar informações
  const listView = (item) =>{  
      
      let key = item.user_id
    return(

        <View  style={styles.caixa_contant}> 

            <Barra/>
             
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',padding:20,}}>

            <View style={{ width: 160}}>
              <Text style={{fontSize:20}} >{item.user_descricao}</Text>
              <Text style={{fontSize:13}} >{item.user_categoria}</Text>
            </View>

            <Text style={{fontSize:20, marginLeft:100,marginRight: 15}} >{item.user_valor}</Text>
            
            <TouchableOpacity style={{width: 30,height:30, backgroundColor: '#F8777C', justifyContent: 'center', alignItems: 'center', borderRadius: 8}}
            onPress={()=>deleteView(key)}
            >
             <FontAwesome name="remove" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          </View>        
    )
  };
  
  return (
    <ScrollView style={{backgroundColor: '#EAF7FF'}}>
    <Header/>

    <View style={styles.container}>

    <View style={styles.container_pesquisa}>
        <Feather name="search" size={24} color="grey" />
        <TextInput 
            style={styles.pesquisa}
            placeholder='Pesquisar'
            keyboardType="default"
            onChangeText={setPesquisa}
            />
        </View>

    <View style={styles.container_2}>
        <View style={styles.caixa}>
        <FlatList
         style={styles.lista}
        data={view}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listView(item)}
        />
        </View>
        </View>
        </View>
    </ScrollView>
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1, 
    padding: 20,
    backgroundColor: '#EAF7FF',      

 },

 titulo:{
  fontSize:30,
  color: '#FFFFFF'
 },
  container_2:{
     flex:1,
  },
  container_pesquisa:{
    flex:1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
},
  pesquisa:{
    width: 300,
    marginLeft: 15
  },
  caixa:{ 
    flex:1,
    marginTop:20, 
    
  },
  
  caixa_contant:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    marginBottom:10,
    height: 100,
    borderRadius: 5,
    padding:0,
    alignItems:'center'
  },  
  lista:{
    
  }
})
import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { AntDesign,Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView, SafeAreaView } from 'react-native';

import Input from '../../components/input'

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


  const listView = (item) =>{
    return(
      <View> 
        
         <View style={styles.caixa_contant}>
      <Text style={{fontSize:20} }>Nome</Text>
      <Text  >{item.title}</Text>
      <Text style={{fontSize:20} }>Idade</Text>
      <Text  >{item.idade}</Text>
  
    </View>
    </View>
    )
  };

  return (
    <ScrollView>
    
    <View style={styles.container}>

    
      <View style={styles.caixa_titulo}>
        <Text style={styles.titulo}>Olá, Cliente</Text>

      </View>


        <View style={styles.container_2}>
        <View style={styles.container_pesquisa}>
        <Feather name="search" size={24} color="black" />
        <TextInput 
            style={styles.pesquisa}
            placeholder='Pesquisar'
            keyboardType="default"
            onChangeText={setPesquisa}
             
            />

        </View>
        
        <View style={styles.caixa}>
       
        <FlatList
         style={styles.lista}
        data={list}
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

 },
 caixa_titulo:{
  flex: 1,
  justifyContent:'center',
  marginTop: 30
 },
 titulo:{
  fontSize:30,
 },
  container_2:{
     flex:1,
      backgroundColor: '#F3F3F3',      
  },
  container_pesquisa:{
    flex:1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80
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
    backgroundColor: '#FFFFFF',
    margin:5,
    height: 120,
    borderRadius: 5,
    padding:10,
  },  
  lista:{
    
  }
})
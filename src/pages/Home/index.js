import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { AntDesign,Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView, SafeAreaView,Image } from 'react-native';

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
      
    <View style={{flex:1,backgroundColor: '#158CDA',height:200, padding:20,justifyContent:'center',alignItems:'center'}}>
    <View style={{}}>
        <Text style={{fontSize:30,color: '#FFFFFF'}}>Total do Mês</Text>
        <Text style={{fontSize:20,color: '#FFFFFF'}}>0,00</Text>
      </View>
    </View>

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
    backgroundColor: '#FFFFFF',
    margin:5,
    height: 120,
    borderRadius: 5,
    padding:10,
  },  
  lista:{
    
  }
})
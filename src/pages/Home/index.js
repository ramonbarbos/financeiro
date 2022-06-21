import { StatusBar } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView, SafeAreaView,Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { AntDesign,Feather,FontAwesome,Entypo } from '@expo/vector-icons';

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
  const [modalVisible, setModalVisible] = useState(false); // modal
 


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
        
        <View style={{alignItems:'center'}}> 
          <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={styles.caixa_contant}>
              <View style={{flexDirection:'row',width:'100%',alignItems:'center',padding:20}}>
              <Barra/>

              <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',width:'80%',}}>
                <View style={{}}>
                  <Text style={{fontSize:20}} >{item.user_descricao}</Text>
                  <Text style={{fontSize:13}} >{item.user_categoria}</Text>
                </View>
                
                <View style={{}}>
                  <Text style={{fontSize:20,}} >R$ {item.user_valor}</Text>
                </View>
                
              </View>
            
             
            </View>
          </TouchableOpacity>
          <View style={{height:1, width: '90%', backgroundColor: '#ECECEC'}}></View>

          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            style={{}}
            >
              <View style={styles.modal}>

                <View style={styles.overView}>
                    <View style={{height:25,justifyContent:'center',alignItems:'center', }}>
                      <View style={{}} >
                        <TouchableOpacity style={{width:120,height:25,alignItems:'center',justifyContent:'center' }} onPress={()=>{setModalVisible(false)}}> 
                        <View style={{width:80,height:4, backgroundColor:'#A6A6A6', borderRadius: 20}} ></View>                     
                      </TouchableOpacity>
                      </View>
                    </View>

                  
                  <TouchableOpacity style={{height:60,justifyContent:'center' }}>
                  <View style={{flexDirection: 'row', width: '100%', }}>
                      <Entypo name="pencil" size={22} color="black" />
                      <Text style={{fontSize:20,color: 'black', fontWeight:'bold', marginLeft:15}}>Editar</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{height:1, width: '100%', backgroundColor: '#ECECEC'}}></View>

                  <TouchableOpacity style={{height:60,justifyContent:'center' }}
                  onPress={()=>deleteView(key)}>
                  <View style={{flexDirection: 'row', width: '100%', }}>
                      <FontAwesome name="trash" size={22} color="black" />
                      <Text style={{fontSize:20,color: 'black', fontWeight:'bold', marginLeft:15}}>Excluir</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{height:1, width: '100%', backgroundColor: '#ECECEC'}}></View>

                </View>

              </View>
            
          </Modal>

          </View>       
           
    )
  };
  
  return (
    <ScrollView style={{backgroundColor: '#EAF7FF'}}>
    <Header/>
    

    <View style={styles.container}>

    <View style={styles.container_pesquisa}>
        <Feather style={{marginLeft: 15}} name="search" size={22} color="grey" />
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
    width: '100%',
    height: 45,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems:'center',
},
  pesquisa:{
    marginLeft: 15
  },
  caixa:{ 
    flex:1,
    marginTop:20,
    height:'120%', 
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  
  caixa_contant:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    height: 100,
    alignItems:'center'
  },  
  lista:{
    
  },
  modal:{
   flex:1,
   backgroundColor: 'rgba(0,0,0,0.2)',
  },
  overView:{
    flex:1,
    elevation:10,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#FFFFFF',
    top: '65%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
})
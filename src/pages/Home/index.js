import { StatusBar } from 'expo-status-bar';
import  React, { useCallback,useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList,TextInput, ScrollView, SafeAreaView,Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { Feather,FontAwesome, Entypo, Foundation,AntDesign} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

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
  const [editarVisible, setEditarVisible] = useState(''); // modal editar
  const [pago, setPago] = useState('');
 


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
              'ALTER TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_valor INT(20),user_descricao VARCHAR(20), user_data INT(20), user_categoria VARCHAR(20), user_pago INT(100))',
              []
            );
          }
        }
      );
    });
  }, []);

  //Visualizar Banco de dados SQLite
  useFocusEffect(useCallback(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user_id, user_valor, user_descricao,user_categoria FROM table_user',
        
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setView(temp);
        }
      );
    });
  }, []));




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

  //Perguntar se quer Deletar Dados
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
    //Deletar Dados
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
  };

 



  
  function Pagar(item)  {
  
    //let total = 653;
    //let pago = 60;
    //let cal = 653 - 60;
    //let resut =total - cal;
    //console.log(resut);

   console.log(item.user_total)

    
   

    
  }
  

  //Visualisar informações
  const listView = (item) =>{  
      
      let key = item.user_id
    return(
        <View style={styles.caixa}>
            <View style={{alignItems:'center',borderBottomColor: '#ddd',
        borderBottomWidth: 1,}}> 
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
             
                      
                      {/*Modal Principal*/}

              <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                style={{}}
                onRequestClose={()=> setModalVisible(false)}
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

                      {/*Pagar*/}

                        <TouchableOpacity style={{height:60,justifyContent:'center' }}
                        
                      onPress={() => {
                        
                      }}>
                      
                      <View style={{flexDirection: 'row', width: '100%', alignItems:'center',justifyContent:'center'}}>
                          <AntDesign name="checkcircle" size={22} color="black" />
                          <Text style={{fontSize:20,color: 'black', fontWeight:'bold', marginLeft:15}}>Pagar</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{height:1, width: '100%', backgroundColor: '#ECECEC'}}></View>

                      {/*Editar*/}
                      <TouchableOpacity style={{height:60,justifyContent:'center' }}
                      onPress={()=>navigation.navigate('Atual')}>
                      
                      <View style={{flexDirection: 'row', width: '100%',alignItems:'center', justifyContent:'center' }}>
                          <Entypo name="pencil" size={22} color="black" />
                          <Text style={{fontSize:20,color: 'black', fontWeight:'bold', marginLeft:15}}>Editar</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{height:1, width: '100%', backgroundColor: '#ECECEC'}}></View>
                    
    
                      {/*Excluir*/}

                      <TouchableOpacity style={{height:60,justifyContent:'center' }}
                      onPress={()=>deleteView(key)}>
                      <View style={{flexDirection: 'row', width: '100%',alignItems:'center',justifyContent:'center' }}>
                          <FontAwesome name="trash" size={22} color="black" />
                          <Text style={{fontSize:20,color: 'black', fontWeight:'bold', marginLeft:15}}>Excluir</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{height:1, width: '100%', backgroundColor: '#ECECEC'}}></View>

                    </View>

                  </View>
                
              </Modal>

              </View>       
          </View>
    )
  };
  
  return (
    <ScrollView style={{backgroundColor: '#EAF7FF'}}>
    <Header 
    onChangeSelect={id=>alert(id)}
    /> 
    {/*Passando parametros pelo componente */}

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
          data={view }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listView(item)}
          showsVerticalScrollIndicator = {false}
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
     marginTop: 20,
    

  },
  container_pesquisa:{
    flex:1,
    width: '100%',
    height: 45,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems:'center',
    borderRadius: 5,

},
  pesquisa:{
    marginLeft: 15
  },
  caixa:{ 
    borderRadius: 5,
  },
     
  caixa_contant:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    height: 90,
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
  },
  user:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    
  }
})
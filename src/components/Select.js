import { StatusBar,  } from 'expo-status-bar';
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { callList } from './callList';


export default function Select({options, onChangeSelect, text}) {
    const [txt, setTxt] = useState(text);
    const [modalVisible, setModalVisible] = useState(false)
    const [select, setSelect] = useState()

    function renderOption(item){
        return(
        <TouchableOpacity style={[styles.textList, {backgroundColor: item.id == select ? '#eee': 'white'}]} onPress={()=>{
        onChangeSelect(item.name)
        setTxt(item.name)
        setModalVisible(false)
        setSelect(item.id)
        }}>
            <Text style={{fontWeight: item.id == select ? 'bold': 'normal'}}>{item.name}</Text>
            {item.id == select && <Ionicons name="checkmark-sharp" size={24} color="green" />}
        </TouchableOpacity>
        );
    }

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.input} onPress={()=> setModalVisible(true)}>
        <Text  style={styles.txt}numberOfLines={1}>{txt}</Text>
        <Ionicons name="md-chevron-down" size={24} color="black" />
      </TouchableOpacity>

      <Modal animationType='slide' 
      visible={modalVisible}
      onRequestClose={()=> setModalVisible(false)}
       >
        <View style={styles.modalView} >

        
            <View style={styles.modalNav}>
                <TouchableOpacity style={styles.input_2} onPress={()=> setModalVisible(false)}>
                     <Ionicons name="md-chevron-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text  style={styles.txt}numberOfLines={1}>{txt}</Text>

                <TouchableOpacity
                 onPress={()=> setModalVisible(false)}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.modalHeader} >
                <FlatList
                
                style={styles.lista}
                data={options }
                keyExtractor={(item, index) => String(item.id)}
                renderItem={({item}) => renderOption(item)}
                showsVerticalScrollIndicator = {false}
                />

            </View>
            
          

        </View>   

      </Modal>

    </View>
  );
}



const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:60,
        borderBottomWidth: 1,
        fontSize: 15,
        justifyContent:'center',
        padding: 20,
        
        
    },
    input:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    input_2:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    txt:{
        color:'black',
        fontSize: 15,

    },
    modalView:{
        padding: 20,
        
    },
    modalNav:{
        height: 40,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    modalHeader:{
        marginTop:10,
        width:'100%',
    },
    textList:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        padding: 15,
        fontSize: 15,
        flexDirection:'row',
        justifyContent:'space-between'

    }
  })
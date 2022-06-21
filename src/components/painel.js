import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity} from 'react-native';
import { AntDesign,Feather,FontAwesome } from '@expo/vector-icons';



export default function () {

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View  >
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          style={{}}
        >
          <View style={{alignItems:'center',}}>

            <View style={{ width:'95%',flexDirection:'row',justifyContent: 'space-between',alignItems:'center',
      padding:10 }}>
              <Text>Painel</Text>
              <TouchableOpacity style={{}} onPress={()=>{setModalVisible(false)}}>
                  <Text>Fechar</Text>
            </TouchableOpacity>
            </View>
            <View style={{height:1, width: '100%', backgroundColor: 'grey'}}></View>

          </View>
            
        </Modal>
    </View>
  );
}
const styles=StyleSheet.create({
    content:{
      alignItems:'center',
    },
    caixa:{
      width:'95%',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      padding:10
    },
    lista:{
        
    },
})
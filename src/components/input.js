import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function Input({setPesquisa}) {
  return (
    <View style={styles.container_pesquisa} >
    <Feather name="search" size={24} color="black" />
     <TextInput
        style={styles.lista}
        placeholder='Pesquisar'
        keyboardType="numeric"
        onChangeText={setPesquisa}
        
     />
      
    </View>
  );
}
const styles=StyleSheet.create({
    container_pesquisa:{
        width: 370,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 100,
        alignItems: 'center'
    },
    lista:{
        width: 300,
        
        marginLeft: 15
    },
})



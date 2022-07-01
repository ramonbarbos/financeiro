import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function ButtonNew({focused,size}) {
  return (
    <View style={[styles.container, {backgroundColor: focused ? '#EAF7FF' : '#010101'}]} >
      <Entypo name="home" size={size} color={focused ? '#158CDA': '#FFFFFF' } />
      <Text style={[styles.text, {color: focused ? '#158CDA' : '#FFFFFF'}]}>Home</Text>
    </View>
  );
}
const styles=StyleSheet.create({
    container:{
        width:80,  
        height: 35,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 20,
    },
    text:{
      fontSize:15,
      color:'#FFFFFF',
      marginLeft: 5
    }
})



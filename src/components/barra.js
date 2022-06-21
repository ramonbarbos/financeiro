import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Barra() {
  return (
    <View style={styles.container}>
      
      <View style={{width: 50,height:50, backgroundColor: '#158CDA', borderRadius: 50, marginRight:10 }}></View>
    </View>
  );
}



const styles=StyleSheet.create({
    container:{
        
        
    }
  })
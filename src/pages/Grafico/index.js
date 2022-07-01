import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Grafico({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Grafico</Text>
      
    </View>
  );
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        
    }
  })
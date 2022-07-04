import  React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native';
import { AntDesign,Feather,FontAwesome } from '@expo/vector-icons';


import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Data()  {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };

    const showDatepicker = () => {
      setShow(true)
    };
  

  
    return (
      <View style={styles.caixa}>
       
    
            <TouchableOpacity 
            style={styles.input_outros}
            onPress={showDatepicker}
            >
                <Text style={{color:'gray'}}>{date.toLocaleString()}</Text>
              
            </TouchableOpacity>
        {show &&(
            <DateTimePicker 
                modal
                value={date}
                onChange={onChange}
                mode={'data'}
                is24Hour={false}
                dateFormat="DD-MM-YYYY"
                positiveButtonLabel="Negative"   
            />


        )}

      </View>
    );
  
}
const styles=StyleSheet.create({
    
    caixa:{
      width:'100%',
      
    },
   
    input_outros:{
        width:'100%',
        height:60,
        borderBottomWidth: 1,
        fontSize: 15,
        justifyContent:'center',
        
       
      }
})
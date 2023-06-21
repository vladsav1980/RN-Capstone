import React,{useState} from 'react';
import {View,Text,TextInput,Image,StyleSheet,Button,Pressable,KeyboardAvoidingView} from 'react-native';
export default function Splash(){
   return( 
    <View style={styles.view}>
    <Image
    source={require('../assets/Logo.png')}
    style={styles.image}/>
 </View>
  )
}
const styles=StyleSheet.create({
    image:{
        width:1000,
        height:300,
    marginTop:100,
    flex:1,
     
     
        resizeMode:"contain",
        borderColor:"green",
    },
    view:{
        flex:1,
        alignItems:'center'
    }
})
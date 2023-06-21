import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,Image,StyleSheet,Button,Pressable,KeyboardAvoidingView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  

export default function Onboardingr({navigation}){
    const[firstName,onChangeFirstName]=useState('')
    const[mail,onChangeMail]=useState('')
    const[log,onLog]=useState(false);
    const[lastName,onChangeLastName]=useState('')
    const[phn,onChangePhn]=useState('')
    const [status, setstatus] = useState(false);
    const [pwd, setpwd] = useState(false);
    const [so, setso] = useState(false);
    const [nl, setnl] = useState(false);
    const [i, seti] = useState(null);
    var check=true;
    useEffect(() => {
        const fetchstuff = ()=>{
                onChangeFirstName('')
                onChangeMail('')
        };
    
        fetchstuff();
      }, []);
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // Perform any necessary actions when the screen is focused
          console.log('Onboard screen is focused number 2');
          // Refresh data or update the screen content here
          onChangeFirstName('')
                onChangeMail('')
          // Update the refresh key to trigger a re-render
          
        });
    
        return unsubscribe;
      }, [navigation]);

    const updation=async()=>{
        try{
            const jsonValue=JSON.stringify(log)
            const jsonValue2=JSON.stringify(firstName)
            const jsonValue3=JSON.stringify(mail)
            const jsonValue10=JSON.stringify(lastName)
            const jsonValue4=JSON.stringify(phn)
            const jsonValue5=JSON.stringify(status)
            const jsonValue6=JSON.stringify(pwd)
            const jsonValue7=JSON.stringify(so)
            const jsonValue8=JSON.stringify(nl)
            const jsonValue89=JSON.stringify(i)
            await AsyncStorage.setItem("imgpic",jsonValue89)
            await AsyncStorage.setItem("logstatus",jsonValue)
            await AsyncStorage.setItem("LastName",jsonValue10)
            await AsyncStorage.setItem("fn",jsonValue2)
            await AsyncStorage.setItem("mail",jsonValue3)
            await AsyncStorage.setItem("phoneno",jsonValue4)
            await AsyncStorage.setItem("Status",jsonValue5)
            await AsyncStorage.setItem("PwdChange",jsonValue6)
            await AsyncStorage.setItem("So",jsonValue7)
            await AsyncStorage.setItem("Nl",jsonValue8)
            navigation.navigate('Profiles');
        }catch(e){
            console.log(e)
        }
    }
if(firstName!=''&& validateEmail(mail))check=false;
return(
   
    <View style={styles.head}>
        <KeyboardAvoidingView behavior="height">
        <View style={styles.sub}>
    <Image
    source={require('../assets/Logo.png')}
    style={styles.image}/>
    </View>
    <View style={styles.sub2}>
    <Text style={styles.text}>Let us get to know you</Text>
        <Text style={styles.text1}>First Name</Text>
        <TextInput value={firstName} onChangeText={onChangeFirstName} style={styles.input1}/>
        <Text style={styles.text2}>Email</Text>
        <TextInput value={mail} onChangeText={onChangeMail} style={styles.input1} keyboardType="email-address" />
       <View style={styles.temp}>
        <Pressable style={styles.button} disabled={check} onPress={()=>{onLog(true); updation(); }}>
      <Text style={styles.text3}>Next</Text>
    </Pressable>
    </View>
        </View>
     
  
   
</KeyboardAvoidingView>
    </View >
   
)
}
const styles=StyleSheet.create({
   
    head:{
        flex:1,
       
        marginTop:0,
        marginBottom:0,
        
       borderColor:"red",
       alignItems:"center"
       
    },
    sub:{
        flex:0.88,
        alignItems:"center",
        backgroundColor:"gainsboro",
    },
    image:{
        width:700,
        height:100,
    marginTop:40,
    flex:1,
     marginBottom:10,
     
        resizeMode:"contain",
        borderColor:"green",
      
    },
    sub2:{
        flex:5,
        alignItems:"center",
        backgroundColor:"silver"
      

    },
    text:{
        
        marginTop:80,
        
       
        fontSize:25,
        color:"darkolivegreen",
        fontWeight:"bold",

    },
    text1:{
        marginTop:110,
        fontSize:22,
        color:"darkolivegreen",
        fontWeight:"bold",
    },
    text2:{
        marginTop:20,
        fontSize:22,
        color:"darkolivegreen",
        fontWeight:"bold",
    },
    input1:{
        marginTop:15,
        fontSize:20,
        fontWeight:"bold",
        color:"darkolivegreen",
        borderWidth:4,
        borderColor:"darkolivegreen",
        borderRadius:6.5,
        width:250,
        height:45
    },
    text3:{
      
        color:"darkolivegreen",
        fontWeight:"bold",
        fontSize:20
    },
    button:{
        marginTop:25,
        width:100,
        height:40,
        marginLeft:220,
        borderRadius:5.5,
       backgroundColor:"silver",
        justifyContent:"center",
        alignItems:"center"
    },
    temp:{
        marginTop:25,
        width:500,
        alignItems:"center",
        backgroundColor:"lightgray",
        flex:1.5
    }


})
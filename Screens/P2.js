import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,Image,StyleSheet,Button,Pressable,KeyboardAvoidingView} from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { Entypo } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialsAvatar from './Initial';
export default function Profiler({ navigation }){
    const [imager, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
      
    
        if (!result.canceled) {
           setImage(result.assets[0].uri);
        }else {
            setImage(null); // Reset the image state if the selection is cancelled
          }
      };
    const updation=async(log)=>{
        try{
            const jsonValue=JSON.stringify(LastName)
            const jsonValue2=JSON.stringify(firstName)
            const jsonValue3=JSON.stringify(mail)
            const jsonValue4=JSON.stringify(phn)
            const jsonValue5=JSON.stringify(status)
            const jsonValue6=JSON.stringify(pwd)
            const jsonValue7=JSON.stringify(so)
            const jsonValue8=JSON.stringify(nl)
            const jsonValue89=JSON.stringify(imager)
            await AsyncStorage.setItem("imgpic",jsonValue89)
            await AsyncStorage.setItem("LastName",jsonValue)
            await AsyncStorage.setItem("fn",jsonValue2)
            await AsyncStorage.setItem("mail",jsonValue3)
            await AsyncStorage.setItem("phoneno",jsonValue4)
            await AsyncStorage.setItem("Status",jsonValue5)
            await AsyncStorage.setItem("PwdChange",jsonValue6)
            await AsyncStorage.setItem("So",jsonValue7)
            await AsyncStorage.setItem("Nl",jsonValue8)
        }catch(e){
            console.log(e)
        }
    }
    const updationdisc=async(log)=>{
        try{
            const fn = await AsyncStorage.getItem('fn');
            const mm = await AsyncStorage.getItem('mail');
            onChangeFirstName(JSON.parse(fn));
            onChangeMail(JSON.parse(mm));
            const ln = await AsyncStorage.getItem('LastName');
            const phn = await AsyncStorage.getItem('phoneno');
            onChangeLastName(JSON.parse(ln));
            onChangephn(JSON.parse(phn));
            const st = await AsyncStorage.getItem('Status');
            const so = await AsyncStorage.getItem('So');
            const ii = await AsyncStorage.getItem('imgpic');
            setImage(JSON.parse(ii))
            setstatus(JSON.parse(st));
            setso(JSON.parse(so));
            const pwd = await AsyncStorage.getItem('PwdChange');
            const nl = await AsyncStorage.getItem('Nl');
            setpwd(JSON.parse(pwd));
            setnl(JSON.parse(nl));
        }catch(e){
            console.log(e)
        }
    }
   
    const [status, setstatus] = useState(false);
    const [pwd, setpwd] = useState(false);
    const [so, setso] = useState(false);
    const [nl, setnl] = useState(false);
    const[firstName,onChangeFirstName]=useState('')
    const[mail,onChangeMail]=useState('')
    const[LastName,onChangeLastName]=useState('')
    const[phn,onChangephn]=useState('')
   
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // Perform any necessary actions when the screen is focused
          console.log('Profile screen is focused');
          // Refresh data or update the screen content here
          try {
            const fn = await AsyncStorage.getItem('fn');
            const mm = await AsyncStorage.getItem('mail');
            onChangeFirstName(JSON.parse(fn));
            onChangeMail(JSON.parse(mm));
            const ln = await AsyncStorage.getItem('LastName');
            const phn = await AsyncStorage.getItem('phoneno');
            onChangeLastName(JSON.parse(ln));
            onChangephn(JSON.parse(phn));
            const st = await AsyncStorage.getItem('Status');
            const so = await AsyncStorage.getItem('So');
            const ii = await AsyncStorage.getItem('imgpic');
            setImage(JSON.parse(ii))
            setstatus(JSON.parse(st));
            setso(JSON.parse(so));
            const pwd = await AsyncStorage.getItem('PwdChange');
            const nl = await AsyncStorage.getItem('Nl');
            setpwd(JSON.parse(pwd));
            setnl(JSON.parse(nl));
          } catch (e) {
            console.log(e);
          }
          // Update the refresh key to trigger a re-render
          
        });
    
        return unsubscribe;
      }, [navigation]);
    React.useEffect(() => {
        const fetchstuff = async () => {
          try {
            const fn = await AsyncStorage.getItem('fn');
            const mm = await AsyncStorage.getItem('mail');
            onChangeFirstName(JSON.parse(fn));
            onChangeMail(JSON.parse(mm));
            const ln = await AsyncStorage.getItem('LastName');
            const phn = await AsyncStorage.getItem('phoneno');
            onChangeLastName(JSON.parse(ln));
            onChangephn(JSON.parse(phn));
            const st = await AsyncStorage.getItem('Status');
            const so = await AsyncStorage.getItem('So');
            const ii = await AsyncStorage.getItem('imgpic');
            setImage(JSON.parse(ii))
            setstatus(JSON.parse(st));
            setso(JSON.parse(so));
            const pwd = await AsyncStorage.getItem('PwdChange');
            const nl = await AsyncStorage.getItem('Nl');
            setpwd(JSON.parse(pwd));
            setnl(JSON.parse(nl));
          } catch (e) {
            console.log(e);
          }
        };
    
        fetchstuff();
      }, []);
    return(
<View style={styler.head}>
    <View style={styler.sub}>
    <Pressable style={{flex:0.35, marginTop:0.1}} onPress={()=>{navigation.navigate('Home')}}>
    <Entypo  style={styler.imagearrow} name="arrow-with-circle-left" size={35} color="darkolivegreen" />
    </Pressable>
    <Image
    source={require('../assets/Logo.png')}
    style={styler.image}/>
    <View style={{flex:0.33,justifyContent:"center"}}>
    {imager ?(<Image source={{ uri: imager }} style={{width: 45, height: 45,marginLeft:52,marginTop:15, borderRadius: 22.5,
    overflow: "hidden",}} />):
    
    (<View style={{flex:0.33,marginLeft:56}}>
    {!imager && <InitialsAvatar
        initials={firstName.charAt(0)+LastName.charAt(0)}
        size={40}
        backgroundColor="darkolivegreen"
        textColor="white"
      /> }
      </View>)}
    </View>
    
  
    
    </View>
    <View>
        <Text style={styler.text}>Personal Information</Text>
        <Text style={styler.txt}>Avatar</Text>
    </View>
    <View style={styler.sub2}>
   
      {imager && <Image source={{ uri: imager }} style={{width: 60, height: 60,marginLeft:15,  borderRadius: 30,
    overflow: "hidden",}} />}
    <View style={{marginLeft:15}}>
    {!imager && <InitialsAvatar
        initials={firstName.charAt(0)+LastName.charAt(0)}
        size={60}
        backgroundColor="darkolivegreen"
        textColor="white"
      /> }
      </View>
      <View style={styler.tp2}></View>
      <Pressable style={styler.button90}>
      <Text style={styler.text11} onPress={pickImage}>Change</Text>
    </Pressable>
    <View style={styler.tp2}></View>
    <Pressable style={styler.button91}>
      <Text style={styler.text14} onPress={()=>setImage(null)}>Remove</Text>
    </Pressable>
    </View>
    <View><Text style={styler.text1}>First Name</Text>
        <TextInput value={firstName} onChangeText={onChangeFirstName}  style={styler.input1}/>
        <Text style={styler.text1}>Last Name</Text>
        <TextInput value={LastName} onChangeText={onChangeLastName} style={styler.input1}/>
        <Text style={styler.text1}>Email</Text>
        <TextInput value={mail} style={styler.input1} onChangeText={onChangeMail} keyboardType="email-address"/>
        <Text style={styler.text1}>Phone number</Text>
        <MaskedTextInput
             mask="(999)999-9999"
             value={phn}
             onChangeText={(text, rawText) => {
               onChangephn(text)

              }}
             style={styler.input1}
/>
<Text style={styler.text4}>Email Notifications</Text>
        </View>
        <View style={styler.cc1}>
       <View style={styler.cc11}>
        <Checkbox
          style={styler.checkbox}
          value={status}
          onValueChange={setstatus}
          color={setstatus ? 'darkolivegreen' : undefined}
        />
        <Text style={styler.label}>Order statuses</Text>
        </View>
        <View style={styler.cc11}>
        <Checkbox
          style={styler.checkbox}
          value={pwd}
          onValueChange={setpwd}
          color={setpwd ? 'darkolivegreen' : undefined}
        />
        <Text style={styler.label}>Password Changes</Text>
        </View>
        </View>
        <View style={styler.cc1}>
       <View style={styler.cc11}>
        <Checkbox
          style={styler.checkbox}
          value={so}
          onValueChange={setso}
          color={setso ? 'darkolivegreen' : undefined}
        />
        <Text style={styler.label}>Special offers</Text>
        </View>
        <View style={styler.cc11}>
        <Checkbox
          style={styler.checkbox}
          value={nl}
          onValueChange={setnl}
          color={setnl ? 'darkolivegreen' : undefined}
        />
        <Text style={styler.label}>Newsletter</Text>
        </View>
        </View>
        <View style={styler.r}>
        <Pressable style={styler.button}>
      <Text style={styler.text10} onPress={async()=>{
        try{
            const jsonValue555=JSON.stringify('')
            const jsonValue544=JSON.stringify(false)
            await AsyncStorage.setItem("LastName",jsonValue555)
            await AsyncStorage.setItem("fn",jsonValue555)
            await AsyncStorage.setItem("mail",jsonValue555)
            await AsyncStorage.setItem("phoneno",jsonValue555)
            await AsyncStorage.setItem("Status",jsonValue544)
            await AsyncStorage.setItem("PwdChange",jsonValue544)
            await AsyncStorage.setItem("So",jsonValue544)
            await AsyncStorage.setItem("Nl",jsonValue544)
            const jsonValue53=JSON.stringify(null)
            await AsyncStorage.setItem("imgpic",jsonValue53)
            const jsonValue50=JSON.stringify(false)
            await AsyncStorage.setItem("logstatus",jsonValue50)
          
            navigation.navigate('Onboarding')
        }
    catch(e){console.log(e)}}}>Log out</Text>
    </Pressable>
        </View>

<View style={styler.r}>
        <Pressable style={styler.button2}>
      <Text style={styler.text10} onPress={()=>{ updationdisc();}}>Discard changes</Text>
    </Pressable>
    <View style={styler.tp}></View>
    <Pressable style={styler.button3}>
      <Text style={styler.text11} onPress={()=>{ updation();}}>Save changes</Text>
    </Pressable>
        </View>
</View>
    );
}
const styler=StyleSheet.create({
    imagearrow:{
        marginTop:25,
    flex:1,
    
     
     marginLeft:13.5,
    },
    tp:{
        flex:0.3
    },
    tp2:{
        flex:0.1
    },
    r:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"

    },
    text10:{
      
        color:"darkolivegreen",
        fontWeight:"bold",
        fontSize:16
    },
    button91:{
        marginTop:12,
        width:85,
        height:30,
       borderColor:"darkolivegreen",
        borderRadius:5.5,
        borderWidth:1.3,
       
        justifyContent:"center",
        alignItems:"center"
    },
    text14:{
        color:"darkolivegreen",
        fontWeight:"bold",
        fontSize:16
    },
    text11:{
      
        color:"white",
        fontWeight:"bold",
        fontSize:16
    },
  
    button:{
        marginTop:15,
        width:350,
        height:25,
       
        borderRadius:5.5,
       backgroundColor:"gold",
        justifyContent:"center",
        alignItems:"center"
    },
    button2:{
        marginTop:15,
        width:140,
        height:35,
       borderColor:"darkolivegreen",
        borderRadius:5.5,
        borderWidth:1.3,
      
        justifyContent:"center",
        alignItems:"center"
    },
    label:{
        fontSize:15,
        marginTop:5,
        marginLeft:5,
        color:"darkolivegreen",
        fontWeight:"bold"
    },
    button3:{
        marginTop:15,
        width:140,
        height:35,
       borderColor:"darkolivegreen",
        borderRadius:5.5,
        borderWidth:1.3,
        backgroundColor:"darkolivegreen",
        justifyContent:"center",
        alignItems:"center"
    },
    button90:{
        marginTop:12,
        width:85,
        height:30,
       borderColor:"darkolivegreen",
        borderRadius:5.5,
        borderWidth:1.3,
        backgroundColor:"darkolivegreen",
        justifyContent:"center",
        alignItems:"center"
    },
    label:{
        fontSize:15,
        marginTop:5,
        marginLeft:5,
        color:"darkolivegreen",
        fontWeight:"bold"
    },
    cc11:{
        flexDirection:"row",
        flex:0.5
    },
    cc1:{
        flexDirection: "row",
    },
    checkbox:{
        alignSelf:"center",
        marginTop:5,
        width:15,
        height:15,
        marginLeft:15

    },
    text4:{
        marginTop:12,
        fontSize:18,
        color:"darkolivegreen",
        fontWeight:"bold",
        marginLeft:15
    },
    text1:{
        marginTop:12,
        fontSize:15,
        color:"darkolivegreen",
        fontWeight:"bold",
        marginLeft:15
    },
    sub2:{
        flex:0.45,
        flexDirection:"row"
    },
    input1:{
        marginTop:15,
        fontSize:13,
        fontWeight:"bold",
        color:"darkolivegreen",
        borderWidth:1.1,
        borderColor:"darkolivegreen",
        borderRadius:6.5,
        width:350,
        height:30,
        marginLeft:15
    },
    text:{
        color:"darkolivegreen",
        fontSize:20,
        fontWeight:"bold",
        marginTop:10,
        marginLeft:15
        
    },
    txt:{
        marginTop:6,
        marginLeft:15,
        fontWeight:"bold",
        color:"darkolivegreen",
    },
    head:{
        flex:1,
       
        marginTop:0,
        marginBottom:0,
        
       borderColor:"red",
      
       
    },
    sub:{
        flex:0.45,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white",
    },
    image:{
        width:500,
        height:50,
    marginTop:25,
    flex:0.4,
     
     
        resizeMode:"contain",
        borderColor:"green",
      
   
}})
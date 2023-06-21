import React,{useEffect,useState,useMemo,useCallback} from 'react';
import {View,Divider,Alert,Text,TextInput,FlatList,Image,StyleSheet,Button,Pressable,KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialsAvatar from './Initial';
import * as ImagePicker from 'expo-image-picker';
import { useUpdateEffect } from './Ut';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import Filters from './Filters';
import {  createTable,
    getMenuItems,
    saveMenuItems,filterByQueryAndCategories} from './Database';
    const API_URL ='https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
    const Item = ({ title, price,url,desc, }) => (
        <View style={{flexDirection:"row"}}>
        <View style={{flex:0.9,flexDirection:"column"}}>
          <Text style={{color:"darkolivegreen",fontWeight:"bold",fontSize:22,marginTop:10,marginLeft:23}}>{title}</Text>
          <View style={{flex:0.1}}>
          <Text style={{color:"darkolivegreen",fontSize:18,marginLeft:23,marginTop:10}}>{desc}</Text>
          </View>
          <Text style={{color:"darkolivegreen",fontWeight:"bold",fontSize:22,marginTop:10,marginLeft:23,marginBottom:10}}>${price}</Text>
        </View>
        <View style={{alignItems:"center",justifyContent:"center"}}>
        <Image source={{ uri: url }} style={{width: 89, height: 100,marginLeft:70,marginTop:20 ,resizeMode:"cover"}}/>
        </View>
        </View>
      );

export default function Home({navigation}){
    const sections = ['starters', 'mains', 'desserts',"drinks",'specials']
    const[im,setim]=useState(null)
    const[f,setf]=useState('')
    const[l,setl]=useState('')
    const[data,setData]=useState([])
    const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
    renderSeparator = () => (
        <View
          style={{
            backgroundColor: 'darkolivegreen',
            height: 0.5,
          }}
        />
      );
      renderSeparatorhead = () => (
        <View
          style={{
            backgroundColor: 'darkolivegreen',
            height: 1,
          }}
        />
      );
   
    useEffect(() => {
        (async () => {
          try {
            // 1. Create table if it does not exist
            await createTable();
            // 2. Check if data was already stored
            let menuItems = await getMenuItems();
            
            if (!menuItems.length) {
              // Fetching menu from URL
              const response = await fetch(API_URL);
              const json = await response.json();
              menuItems = json.menu
              // Storing into database
             
              saveMenuItems(menuItems);
            }
    
          
            setData(menuItems);
           
          } catch (e) {
            // Handle error
            Alert.alert(e.message);
          }
        })();
      }, []);
      useUpdateEffect(() => {
        (async () => {
          const activeCategories = sections.filter((s, i) => {
            // If all filters are deselected, all categories are active
            if (filterSelections.every((item) => item === false)) {
              return true;
            }
            return filterSelections[i];
          });
          try {
            const menuItemss = await filterByQueryAndCategories(
              query,
              activeCategories
            );
         
            setData(menuItemss);
         
          } catch (e) {
            Alert.alert(e.message);
          }
        })();
      }, [filterSelections, query]);
      const lookup = useCallback((q) => {
        setQuery(q);
      }, []);
    
      const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
    
      const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };
    
      const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
      };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // Perform any necessary actions when the screen is focused
          console.log('Home screen is focused');
          try{ 
          const fnn = await AsyncStorage.getItem('fn');
          const mmm = await AsyncStorage.getItem('LastName');
          setf(JSON.parse(fnn))
          setl(JSON.parse(mmm))
         
          const mmi = await AsyncStorage.getItem('imgpic');
          setim(JSON.parse(mmi))}catch(e){console.log(e)}
        });
    
        return unsubscribe;
      }, [navigation]);
    return(<View style={styler.head}>
    <View style={styler.sub}>
    <View style={{flex:0.31}}></View>
    <Image
    source={require('../assets/Logo.png')}
    style={styler.image}/>
    <View style={{flex:0.33,justifyContent:"center"}}>
        
    {im ?(
        <Pressable style={{flex:0.33,marginLeft:60}} onPress={()=>{navigation.navigate('Profiles')}}>
    <Image source={{ uri: im }} style={{width: 40, height: 40,marginTop:0.001, borderRadius: 20,
    overflow: "hidden",}} />
    </Pressable>
):
    
    (<Pressable style={{flex:0.33,marginLeft:60,marginTop:4}} onPress={()=>{navigation.navigate('Profiles')}}>
    {!im && <InitialsAvatar
        initials={f.charAt(0)+l.charAt(0)}
        size={40}
        backgroundColor="darkolivegreen"
        textColor="white"
      /> }
      </Pressable>)}
    </View>
    </View>
    <View style={{flex:0.4}}>
        <View style={{backgroundColor:"darkolivegreen"}}>
            <Text style={{color:"gold",fontWeight:"bold",fontSize:40, marginTop:30,marginLeft:8}}>Little Lemon
            
            </Text>
            <Text style={{color:"white", fontSize:30,marginLeft:8}}>Chicago</Text>
            <Searchbar
        placeholder="Search"
        placeholderTextColor="darkolivegreen"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styler.searchBar}
        iconColor="darkolivegreen"
        inputStyle={{ color: 'darkolivegreen',marginTop:0,paddingTop:0,textAlignVertical:"center",paddingBottom:27,paddingLeft:0.1}}
        elevation={0}
      />
        </View>

      <Text style={{color:"darkolivegreen",fontWeight:"bold",fontSize:15,marginTop:4.5,marginLeft:5}}>ORDER FOR DELIVERY!</Text>
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
    </View>
    <View style={{flex:0.5}}>
    <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.name} price={item.price} desc={item.description} url={`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}/>}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderSeparatorhead}
      />
    </View>
    </View>)
}
const styler=StyleSheet.create({
    searchBar:{
          height:28,
           paddingBottom:0,
            textAlignVertical:"center",
            marginBottom: 10,
            backgroundColor:"white",
           
            shadowRadius: 0,
            shadowOpacity: 0,
            marginTop:28
          
    },
    head:{
        flex:1,
       
        marginTop:0,
        marginBottom:0,
        
       borderColor:"red",
      
       
    },
    sub:{
        flex:0.105,
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
        borderColor:"green",}

})
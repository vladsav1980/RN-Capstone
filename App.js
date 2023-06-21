

import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Screens/Onboarding.js';
import Profile from './Screens/Profile';
import Profiler from './Screens/P2';
import Onboardingr from './Screens/O2.js';
import Splash from './Screens/Splash';
import Home from "./Screens/Home";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();

export default function App() {
  const [logs, setLogs] = React.useState(false);
  const[load,setLoad]=React.useState(true)

  React.useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logg = await AsyncStorage.getItem('logstatus');
        setLogs(JSON.parse(logg));
        setLoad(false)
      } catch (e) {
        console.log(e);
      }
    };

    fetchLogs();
  }, []);

  return (<>

      {load ? (
        <Splash /> 
      ) : (
       
          !logs ? (<>
              <NavigationContainer>
            <Stack.Navigator
            screenOptions={{headerShown: false,presentation:"Modal", initialRouteName:"Onboarding"}}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Profiles" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
            </NavigationContainer>
            </>
          ) : (<>
          <NavigationContainer>
            <Stack2.Navigator
            screenOptions={{headerShown: false,presentation:"Modal",initialRouteName:"Home"}}>
            <Stack2.Screen name="Home" component={Home} />
            <Stack2.Screen name="Profiles" component={Profiler} />
            <Stack2.Screen name="Onboarding" component={Onboardingr} />
            </Stack2.Navigator>
            </NavigationContainer>
            </>
          )
      
      )}
        
       
    </>
  );
}


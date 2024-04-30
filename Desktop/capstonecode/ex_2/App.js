import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './navigator/LoginPage';
import SignPage from './navigator/SignPage'; 
import SecondPage from './navigator/SecondPage';
import ThirdPage from './navigator/ThirdPage';
import ThirdPage2 from './navigator/ThirdPage2';
import SettingPage from './navigator/SettingPage';
import SearchPage from './navigator/SearchPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false,}} />
        <Stack.Screen name="SignPage" component={SignPage} options={{headerShown: false}} />
        <Stack.Screen name="SecondPage" component={SecondPage} options={{headerShown: false,}} />
        <Stack.Screen name="ThirdPage" component={ThirdPage} options={{headerShown: false,}} />
        <Stack.Screen name="SettingPage" component={SettingPage} options={{headerShown: false,}} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{headerShown: false,}} />
        <Stack.Screen name="ThirdPage2" component={ThirdPage2} options={{headerShown: false,}} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
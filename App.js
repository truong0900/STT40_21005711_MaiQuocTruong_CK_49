import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './screens/StartScreen';
import ShowScreen from './screens/ShowScreen';
import DetailScreen from './screens/DetailScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'StartScreen' }} />
        <Stack.Screen name="ShowScreen" component={ShowScreen} options={{ title: 'ShowScreen' }} />
        <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/login';
import Home from './src/pages/home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
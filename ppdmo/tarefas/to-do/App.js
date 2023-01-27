import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Cancelados from './src/pages/Cancelados';
import Tarefas from './src/pages/Tarefas';
import Criar from './src/pages/Criar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Tarefas' screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Tarefas') {
              iconName = focused
                ? 'checkbox'
                : 'checkbox-outline';
            } else if (route.name === 'Canceladas') {
              iconName = focused ? 'close-circle' : 'close-circle-outline';
            } else {
              iconName = focused ? 'add-circle' : 'add-circle-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen options={{headerShown: false}} name="Canceladas" component={Cancelados} />
        <Tab.Screen options={{headerShown: false}} name="Tarefas" component={Tarefas} />
        <Tab.Screen options={{headerShown: false}} name="Criar" component={Criar} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
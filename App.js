import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const NaviTab = () => (
  <Tab.Navigator
    screenOptions = { ({ route }) => ({
      tabBarIcon: ({ color }) => {
        if (route.name === 'Decks') {
          return <MaterialCommunityIcons name="cards" size={24} color={color} />
        } 
        return <Entypo name="plus" size={24} color={color} />
      }
    })}
  >
    <Tab.Screen name = 'Decks' component = {DeckListView}/>

    <Tab.Screen name = 'Add Deck' component = {NewDeckView}/>
  </Tab.Navigator>
)


export default function App() {
  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      
    </NavigationContainer>
  );
}


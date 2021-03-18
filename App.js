import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './components/MainNavigator';
import { createStore } from 'redux' 
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'



export default function App() {
  return (
    <Provider store = {createStore(reducer, middleware)}>
      <NavigationContainer >
        <FlashcardsStatusBar/>
        <MainNavigator/>
      </NavigationContainer>
    </Provider>
    
  );
}


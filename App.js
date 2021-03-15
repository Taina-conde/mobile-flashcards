import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function App() {
  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      
    </NavigationContainer>
  );
}


import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const NaviTab = createBottomTabNavigator({
  Decks: DeckListView,
  'Add Deck': NewDeckView,

}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor}) => {
      const { routeName } = navigation.state;
      
      if (routeName === 'Decks') {
        return <MaterialCommunityIcons name="cards" size={24} color={tintColor} />
      } else if (routeName === 'Add Deck') {
        return <Entypo name="plus" size={24} color={tintColor} />
      }
    }
  })
})
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

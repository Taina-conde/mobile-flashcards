import React from 'react' 
import DeckListView from './DeckListView';
import NewDeckView from './NewDeckView';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
export default NaviTab
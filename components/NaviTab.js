import React from 'react' 
import { Platform } from 'react-native';
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
    tabBarOptions = {{
        activeTintColor: Platform.OS === 'ios' ? '#084B8A' : '#E6E9F2',
        style : {
          height: 100,
          backgroundColor: Platform.OS === 'ios' ? '#E6E9F2' : '#084B8A',
          shadowColor: `rgba(0,0,0, 0.24)`,
          shadowOffset: {
            width: 0, 
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }

      }}
    
  >
    <Tab.Screen name = 'Decks' component = {DeckListView}/>
    <Tab.Screen name = 'Add Deck' component = {NewDeckView}/>
  </Tab.Navigator>
)
export default NaviTab
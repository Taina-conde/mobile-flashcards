import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NaviTab from './NaviTab'
import DeckView from './DeckView';
import QuizView from './QuizView';
import NewQuestionView from './NewQuestionView';

const Stack = createStackNavigator()

const MainNavigator = () => (
    <Stack.Navigator
        screenOptions = {{
            headerStyle: {
                backgroundColor: '#084B8A',
            },
            headerTintColor: '#E6E9F2',
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        }}
    >
        <Stack.Screen 
            name = 'Home' 
            component = {NaviTab}
            options = {{
                title : 'My decks',
            }}
            
        />
        <Stack.Screen 
            name = 'Deck details' 
            component = {DeckView}
            options = {({ route }) => {
                const { deckId } = route.params;

                return { title : deckId }
            }}
        />
        <Stack.Screen name = 'Quiz details' component = {QuizView}/>
        <Stack.Screen name = 'New question' component = {NewQuestionView}/>
    </Stack.Navigator>
)
export default MainNavigator
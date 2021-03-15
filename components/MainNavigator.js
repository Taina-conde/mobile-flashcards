import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NaviTab from './NaviTab'
import DeckView from './DeckView';
import QuizView from './QuizView';
import NewQuestionView from './NewQuestionView';

const Stack = createStackNavigator()

const MainNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name = 'Home' component = {NaviTab}/>
        <Stack.Screen name = 'Deck details' component = {DeckView}/>
        <Stack.Screen name = 'Quiz details' component = {QuizView}/>
        <Stack.Screen name = 'New question' component = {NewQuestionView}/>
    </Stack.Navigator>
)
export default MainNavigator
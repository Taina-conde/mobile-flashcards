import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './components/MainNavigator';
import { createStore } from 'redux' 
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import FlashcardsStatusBar from './components/FlashcardsStatusBar'
import { setLocalNotification } from './utils/helpers'



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render(){
    return (
      <Provider store = {createStore(reducer, middleware)}>
        <NavigationContainer >
          <FlashcardsStatusBar/>
          <MainNavigator/>
        </NavigationContainer>
      </Provider>
      
    );
  }
}


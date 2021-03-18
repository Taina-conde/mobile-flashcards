import React from 'react';
import { View, StatusBar } from 'react-native'
import  Constants  from 'expo-constants'

const FlashcardsStatusBar = () => (
    <View style = {{
        height: Constants.statusBarHeight,
        backgroundColor: '#084B8A',
        }}>
        <StatusBar translucent barStyle = 'light-content'/>
    </View>
)

export default FlashcardsStatusBar;
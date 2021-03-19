import React from 'react';
import { View, StatusBar } from 'react-native'
import  Constants  from 'expo-constants'
import { blue } from '../utils/colors'

const FlashcardsStatusBar = () => (
    <View style = {{
        height: Constants.statusBarHeight,
        backgroundColor: blue,
        }}>
        <StatusBar translucent barStyle = 'light-content'/>
    </View>
)

export default FlashcardsStatusBar;
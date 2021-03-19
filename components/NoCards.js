import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { lightGray } from '../utils/colors'

const NoCards = () => (
    <View style = {styles.container}>
        <Text style = {styles.noCardsText}>
            Sorry, there are no cards in this deck. 
            Please, select another deck to start 
            the quiz or add cards to this deck.
        </Text>
    </View>
    
    
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: lightGray,
    },
    noCardsText : {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
    }
})
export default NoCards;
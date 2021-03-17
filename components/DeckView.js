import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckView extends React.Component {
    render(){
        const { navigation, deck } = this.props;
        
        return (
            <View>
                <Text>DeckView</Text>
                <Text>{deck.title}</Text>
                <Text>Number of cards: {deck.questions.length}</Text>
                
                <TouchableOpacity onPress = {() => navigation.navigate('New question', { deck : deck })}>
                    <Text>Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate('Quiz details')}>
                    <Text>Start quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(decks, { route }) {
    const { deckId } = route.params;
    return {
        deck: decks[deckId]
    }
}
export default connect(mapStateToProps)(DeckView)
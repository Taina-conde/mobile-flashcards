import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckView extends React.Component {
    render(){
        const { navigation, route, decks } = this.props;
        const { deckId } = route.params
        
        return (
            <View>
                <Text>DeckView</Text>
                <Text>{deckId}</Text>
                <Text>Number of cards: {decks[deckId].questions.length}</Text>
                
                <TouchableOpacity onPress = {() => navigation.navigate('New question', { deckId})}>
                    <Text>Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate('Quiz details', { deckId })}>
                    <Text>Start quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(decks) {
    return {
        decks,
    }
}
export default connect(mapStateToProps)(DeckView)
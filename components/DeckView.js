import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckView extends React.Component {
    render(){
        const { navigation, route, decks } = this.props;
        const { deckId } = route.params
        
        return (
            <View style = {styles.container}>
                
                <Text style = {styles.deckTitle}>{deckId}</Text>
                <Text style = {styles.numCards}>Number of cards: {decks[deckId].questions.length}</Text>
                
                <TouchableOpacity 
                    style = {styles.addBtn}
                    onPress = {() => navigation.navigate(
                        'New question', 
                        { deckId })}>
                    <Text style = {styles.buttonText}>Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.startBtn}
                    onPress = {() => navigation.navigate(
                        'Quiz details', 
                        { deckId })}>
                    <Text>Start quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle : {
        fontSize: 46,
        color: '#084B8A',
    },
    numCards : {
        fontSize: 22, 
        color: '#848484',
    },
    addBtn : {
        padding: 20,
        margin: 20,
        backgroundColor: '#01A9DB',
        borderRadius: 30,
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        
    },
    buttonText : {
        color: '#ffffff',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})
function mapStateToProps(decks) {
    return {
        decks,
    }
}
export default connect(mapStateToProps)(DeckView)
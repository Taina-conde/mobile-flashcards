import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, lightBlue, white, blue, lightGray } from '../utils/colors';
import { Octicons, Fontisto } from '@expo/vector-icons';

class DeckView extends React.Component {
    render(){
        const { navigation, route, decks } = this.props;
        const { deckId } = route.params
        console.log('deckView: ', decks[deckId])
        
        return (
            <View style = {styles.container}>
                
                <Text style = {styles.deckTitle}>{deckId}</Text>
                <Text style = {styles.numCards}>Number of cards: {decks[deckId].questions.length}</Text>
                
                <TouchableOpacity 
                    style = {styles.addBtn}
                    onPress = {() => navigation.navigate(
                        'New question', 
                        { deckId })}>
                    <Text style = {styles.buttonText}>
                        Add card
                        
                    </Text>
                    <Octicons 
                            name="plus" 
                            size={20} 
                            color={white} 
                        />
                    
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.startBtn}
                    onPress = {() => navigation.navigate(
                        'Quiz details', 
                        { deckId })}>
                    <Text style = {styles.buttonText}>
                        Start quiz
                    </Text>
                    <Fontisto name="play" size={16} color={white} />
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
        color: blue,
    },
    numCards : {
        fontSize: 22, 
        color: lightGray,
        marginBottom: 100,
    },
    addBtn : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 100,
        alignSelf: 'stretch',
        backgroundColor: gray,
        borderRadius: 30,
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        
    },
    startBtn : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 30,
        backgroundColor: lightBlue,
        alignSelf: 'stretch',
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
        color: white,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 15,
    },
})
function mapStateToProps(decks) {
    return {
        decks,
    }
}
export default connect(mapStateToProps)(DeckView)
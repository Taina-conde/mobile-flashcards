import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'

class QuizScore extends React.Component {
    handleRestart = () => {
        this.setState({
            countCorrect: 0,
            currentCardIndex : 0,
        })
        //save results
        const { countCorrect} = this.state
        const {decks, route} = this.props
        const {deckId} = route.params
        const deck  = decks[deckId]
        const cardsTotal = deck.questions.length;
        
        const results = `${((countCorrect/cardsTotal)*100).toFixed(0)}%`
        this.saveResults(results)
        
    }
    handleBackToDeck = () => {
        const { navigation } = this.props;
        navigation.goBack()
        // clear notifications
        //save results
        const { countCorrect} = this.state
        const {decks, route} = this.props
        const {deckId} = route.params
        const deck  = decks[deckId]
        const cardsTotal = deck.questions.length;
        
        const results = `${((countCorrect/cardsTotal)*100).toFixed(0)}%`
        this.saveResults(results)
        
    }
    saveResults = (results) => {
        const { dispatch, route } = this.props;
        const { deckId } = route.params;
        dispatch(handleSaveResults(deckId, results))
        //clear notifications
        clearLocalNotification()
            .then(setLocalNotification)

    }
    render(){
        return(
            <View>
                <View style = {styles.container}>
                    <Text style = {styles.scoreText}>Score</Text>
                    <View style = {styles.resultsBox}>
                        <Text style = {styles.scoreResult}>
                            {results}
                        </Text>
                    </View>
                    <View style = {styles.btnGroup}>
                        <TouchableOpacity 
                            style = {[styles.btn, {
                                backgroundColor: lightBlue,
                            }]}
                            onPress = {this.handleRestart}
                        >
                            <Text 
                                style = {styles.btnText}
                            >
                                Restart Quiz
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style = {[styles.btn, {
                                backgroundColor: gray
                            }]}
                            onPress = {this.handleBackToDeck}
                        >
                            <Text 
                                style = {styles.btnText}
                            >
                                Back to Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-around'
    },
    scoreText: {
        fontSize: 46,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: blue

    },
    resultsBox: {
        height: 200,
        width: 200,
        backgroundColor: white,
        borderRadius: 100,
        borderColor: blue,
        borderWidth: 5,
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    scoreResult: {
        lineHeight: 200,
        textAlign: 'center',
        fontSize: 39,
        fontWeight: 'bold',
        color: lightBlue,
        
    },
    btnGroup : {
        marginLeft: 80,
        marginRight: 80,
        marginTop: 20,
        marginBottom: 50,
        alignSelf: 'stretch',
    },
    btn : {
        borderRadius: 40,   
        padding: 20,   
        marginBottom: 20,  
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    btnText : {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: white,
    },

})
export default QuizScore
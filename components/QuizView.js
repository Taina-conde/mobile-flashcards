import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import NoCards from './NoCards'


class QuizView extends React.Component {
    state = {
        countCorrect: 0,
        currentCardIndex: 0,
    }
    handleOnPress(userAnswer) {
        console.log('userAnswer', userAnswer)
        if (userAnswer === 'correct') {
            this.setState({
                countCorrect: this.state.countCorrect + 1,
                currentCardIndex : this.state.currentCardIndex + 1,
            })
            
        }
        this.setState(()=> ({
            currentCardIndex: this.state.currentCardIndex + 1,
        }))
        
    }
    handleRestart = () => {
        this.setState({
            countCorrect: 0,
            currentCardIndex : 0,
        })
    }
    handleBackToDeck = () => {
        const { navigation } = this.props;
        navigation.goBack()
    }
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const { countCorrect, currentCardIndex } = this.state;
        const deck = decks[deckId];
        if (deck.questions.length === 0) {
            return <NoCards style = {styles.container}/>
        }
        const cardsTotal = deck.questions.length;
        let currentCard = deck.questions[currentCardIndex];
        if (currentCardIndex >= deck.questions.length ) {
            return (
                <View style = {styles.container}>
                    <Text>Score</Text>
                    <Text>{`${((countCorrect/cardsTotal)*100).toFixed(1)}%`}</Text>
                    <TouchableOpacity onPress = {this.handleRestart}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this.handleBackToDeck}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
        return (
            <View style = {styles.container}>
                
                <Text style = {styles.cardsLeft}>
                    {`${currentCardIndex + 1}/${cardsTotal}`}
                </Text>
                <View>
                    <Text style = {styles.mainText}>
                        {currentCard.question}
                    </Text>
                    <TouchableOpacity>
                        <Text style = {styles.flipText}>
                            Show answer
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style = {styles.mainText}>
                        {currentCard.answer}
                    </Text>
                    <TouchableOpacity>
                        <Text style = {styles.flipText}>
                            Show question
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress = {() => this.handleOnPress('correct')}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.handleOnPress('incorrect')}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    cardsLeft : {
        alignSelf: 'flex-start',
        fontSize: 22,
        color: '#084B8A',
        
    },
    mainText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 200,
        marginBottom: 40,
    },
    flipText: {
        
    }

})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
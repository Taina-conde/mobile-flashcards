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
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const { countCorrect, currentCardIndex } = this.state;
        const deck = decks[deckId];
        if (deck.questions.length === 0) {
            return <NoCards/>
        }
        const cardsTotal = deck.questions.length;
        let currentCard = deck.questions[currentCardIndex];
        if (currentCardIndex >= deck.questions.length ) {
            return (
                <View>
                    <Text>Score</Text>
                    <Text>{`${(countCorrect/cardsTotal)*100}%`}</Text>
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
            <View>
                <Text>QuizView</Text>
                <Text>{`${currentCardIndex + 1}/${cardsTotal}`}</Text>
                <View>
                    <Text>{currentCard.question}</Text>
                    <TouchableOpacity>
                        <Text>View answer</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{currentCard.answer}</Text>
                    <TouchableOpacity>
                        <Text>View question</Text>
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
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
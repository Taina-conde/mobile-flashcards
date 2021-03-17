import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import NoCards from './NoCards'
class QuizView extends React.Component {
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const deck = decks[deckId];
        if (deck.questions.length === 0) {
            return <NoCards/>
        }
        const cardsTotal = deck.questions.length;
        let currentCardIndex = 0;
        let currentCard = deck.questions[currentCardIndex];
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
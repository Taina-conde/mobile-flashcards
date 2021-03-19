import React from 'react' 
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Animated
} from 'react-native'
import { connect } from 'react-redux'
import NoCards from './NoCards'
import { lightBlue,
     green, 
     white,
     red,
} from '../utils/colors'


class QuizView extends React.Component {
    state = {
        countCorrect: 0,
        currentCardIndex: 0,
        flipAnim: new Animated.Value(1),
        showQuestion: true,
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
    flip = ()=> {
        const { flipAnim, showQuestion } = this.state;
        console.log('showQuestion: ', showQuestion)
        console.log('flipAnim', flipAnim)
        Animated.timing(flipAnim, {toValue: 0, duration: 5000} )
        {/*Animated.sequence([
            Animated.timing(flipAnim, {toValue: 1.04, duration: 200, useNativeDriver: true}),
            Animated.spring(flipAnim, {toValue: 0, friction: 4})
        ]).start()*/}
        this.setState(()=> ({
            showQuestion: !showQuestion,
        }))
    }
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const { 
            countCorrect, 
            currentCardIndex, 
            flipAnim, 
            showQuestion 
        } = this.state;
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
                {showQuestion 
                    ? (<Animated.View 
                        style = {[styles.animatedContainer, {transform: [{scale: flipAnim}]}]}
                    >
                        <Text style = {styles.mainText}>
                            {currentCard.question}
                        </Text>
                        <TouchableOpacity onPress = {this.flip}>
                            <Text style = {styles.flipText}>
                                Show answer
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>)
                    : (<Animated.View
                        style = {[styles.animatedContainer, {transform: [{scale: flipAnim}]}]}
                    >
                        <Text style = {styles.mainText}>
                            {currentCard.answer}
                        </Text>
                        <TouchableOpacity onPress = {this.flip}>
                            <Text style = {styles.flipText}>
                                Show question
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>)
                }
                <TouchableOpacity 
                    style = {[styles.answerBtn, { 
                        backgroundColor: green
                    }]}
                    onPress = {() => this.handleOnPress('correct')}
                >
                    <Text style = {styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {[styles.answerBtn, {
                        backgroundColor: red
                    }]}
                    onPress = {() => this.handleOnPress('incorrect')}
                >
                    <Text style = {styles.btnText}>Incorrect</Text>
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
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 200,
        marginBottom: 30,
        textAlign: 'center',
    },
    flipText: {
        color: lightBlue,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    answerBtn : {
        borderRadius: 40,
        alignSelf: 'stretch',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 20,
        padding: 20,
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
    animatedContainer : {
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'stretch',
    }


})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
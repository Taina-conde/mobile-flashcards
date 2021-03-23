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
     lightGray,
     gray,
     blue
} from '../utils/colors'
import { 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'


class QuizView extends React.Component {
    state = {
        countCorrect: 0,
        currentCardIndex: 0,
        questionAnim: new Animated.Value(1),
        answerAnim : new Animated.Value(0),
        showQuestion: true,
    }
    handleOnPress(userAnswer) {
        console.log('userAnswer', userAnswer)
        if (userAnswer === 'correct') {
            this.setState({
                countCorrect: this.state.countCorrect + 1,
                currentCardIndex : this.state.currentCardIndex + 1,
                showQuestion: true
            })
            
        }
        this.setState(()=> ({
            currentCardIndex: this.state.currentCardIndex + 1,
            showQuestion: true
        }))
        
    }
    handleRestart = () => {
        this.setState({
            countCorrect: 0,
            currentCardIndex : 0,
        })
        //clear notifications
        
    }
    handleBackToDeck = () => {
        const { navigation } = this.props;
        navigation.goBack()
        // clear notifications
        
    }
    saveResults = (results) => {
        const { dispatch } = this.props;
        dispatch(handleSaveResults(results))
        //clear notifications
        clearLocalNotification()
            .then(setLocalNotification)

    }
    flipToAnswer = ()=> {
        const { questionAnim, showQuestion, answerAnim } = this.state;
        console.log('showQuestion: ', showQuestion)
        console.log('questionAnim', questionAnim)
        console.log('answerAnim', answerAnim)
        
        Animated.timing(questionAnim, {toValue: 0, duration: 1000, useNativeDriver: true})
        .start(({finished}) => {

            console.log('finished question animation', finished)
            Animated.timing(answerAnim, {toValue: 1, duration: 1000, useNativeDriver: true})
            .start(({finished}) => {
                console.log('finished answer animation', finished)
                console.log('flip to answer questionAnim', questionAnim)
                console.log('flip to answer answerAnim', answerAnim)
                this.setState(()=> ({
                    showQuestion: !showQuestion,
                    questionAnim: new Animated.Value(0),
                    answerAnim: new Animated.Value(1),   
                }))
            })
        })
    }
    flipToQuestion = () => {
        const { answerAnim, showQuestion, questionAnim } = this.state;
        console.log('showQuestion: ', showQuestion)
        console.log('answerAnim', answerAnim)
        Animated.timing(answerAnim, {toValue: 0, duration: 1000, useNativeDriver: true})
        .start(({finished}) => {

            console.log('finished answer animation', finished)
            Animated.timing(questionAnim, {toValue: 1, duration: 1000, useNativeDriver: true})
            .start(({finished}) => {
                console.log('finished question animation', finished)
                this.setState(()=> ({
                    showQuestion: !showQuestion,
                    questionAnim: new Animated.Value(1),
                    answerAnim: new Animated.Value(0)
                    
                }))
            })
        })
    }
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const { 
            countCorrect, 
            currentCardIndex, 
            questionAnim, 
            answerAnim,
            showQuestion 
        } = this.state;
        const deck = decks[deckId];
        if (deck.questions.length === 0) {
            return <NoCards style = {styles.container}/>
        }
        const cardsTotal = deck.questions.length;
        let currentCard = deck.questions[currentCardIndex];
        if (currentCardIndex >= deck.questions.length ) {
            const results = `${((countCorrect/cardsTotal)*100).toFixed(0)}%`
            this.saveResults(results)
            return (
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
            )
        }
        
        return (
            <View style = {styles.container}>
                
                <Text style = {styles.cardsLeft}>
                    {`${currentCardIndex + 1}/${cardsTotal}`}
                </Text>
                {showQuestion 
                    ? (<Animated.View 
                        style = {[styles.animatedContainer, {opacity: questionAnim}]}
                    >
                        <Text style = {styles.mainText}>
                            {currentCard.question}
                        </Text>
                        
                    </Animated.View>)
                    : (<Animated.View
                        style = {[styles.animatedContainer, {opacity: answerAnim}]}
                    >
                        <Text style = {styles.mainText}>
                            {currentCard.answer}
                        </Text>
                        
                    </Animated.View>)
                }
                { showQuestion 
                    ? (<TouchableOpacity onPress = {this.flipToAnswer}>
                        <Text style = {styles.flipText}>
                            Show answer
                        </Text>
                    </TouchableOpacity>)
                    : (
                        <TouchableOpacity onPress = {this.flipToQuestion}>
                            <Text style = {styles.flipText}>
                                Show question
                            </Text>
                        </TouchableOpacity>
                    )
                }
                <View style = {styles.btnGroup}>
                    <TouchableOpacity 
                        style = {[styles.btn, { 
                            backgroundColor: green
                        }]}
                        onPress = {() => this.handleOnPress('correct')}
                    >
                        <Text style = {styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {[styles.btn, {
                            backgroundColor: red
                        }]}
                        onPress = {() => this.handleOnPress('incorrect')}
                    >
                        <Text style = {styles.btnText}>Incorrect</Text>
                    </TouchableOpacity>
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
    animatedContainer : {
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'stretch',
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
        
    }


})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
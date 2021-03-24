import React from 'react' 
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'
import { connect } from 'react-redux'
import NoCards from './NoCards'
import QuizScore from './QuizScore'
import { lightBlue,
     green, 
     white,
     red,
} from '../utils/colors'




class QuizView extends React.Component {
    state = {
        countCorrect: 0,
        currentCardIndex: 0,
        animatedValue: new Animated.Value(0),
        showQuestion: true,
    }
    componentDidMount() {
        this.animate()
    }
    
    handleOnPress(userAnswer) {
        console.log('userAnswer', userAnswer)
        if (userAnswer === 'correct') {
            this.setState(() => ({
                countCorrect: this.state.countCorrect + 1,
                currentCardIndex : this.state.currentCardIndex + 1,
                showQuestion: true
            }))
        }
        this.setState(()=> ({
            currentCardIndex: this.state.currentCardIndex + 1,
            showQuestion: true
        }))
        this.animate()
        
    }
    handleRestart = () => {
        this.setState({
            countCorrect: 0,
            currentCardIndex : 0,
        })
        this.animate()
    }
    handleBackToDeck = () => {
        const { navigation } = this.props;
        navigation.goBack()  
    }
    animate = () => {
        const {animatedValue} = this.state;
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.bounce,
            useNativeDriver: false,
          }).start(() => this.setState({
            animatedValue: new Animated.Value(0),
            
          }));
    }
    toggleShowQuestion =() => {
        const {showQuestion} = this.state;
        this.setState({
            showQuestion: !showQuestion
        })
        this.animate()
    }
    
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        const { 
            countCorrect, 
            currentCardIndex, 
            showQuestion,
            animatedValue
        } = this.state;
        const deck = decks[deckId];
        const textSize = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [28, 36]
        })
        

        if (deck.questions.length === 0) {
            return <NoCards style = {styles.container}/>
        }
        const cardsTotal = deck.questions.length;
        let currentCard = deck.questions[currentCardIndex];
        if (currentCardIndex >= deck.questions.length ) {
            const results = `${((countCorrect/cardsTotal)*100).toFixed(0)}%`
            
            return (
                <QuizScore
                    results = {results}
                    onRestart = {this.handleRestart}
                    onBackToDeck = {this.handleBackToDeck}
                    deckId = {deckId}
                />
            )
        }
        
        return (
            <View style = {styles.container}>
                
                <Text style = {styles.cardsLeft}>
                    {`${currentCardIndex + 1}/${cardsTotal}`}
                </Text>
                <View style = {styles.animatedContainer}>
                    
                        {showQuestion 
                            ? 
                            <Animated.Text style = {[styles.mainText, {
                                    opacity: animatedValue,
                                    fontSize: textSize

                                }]}>
                                {currentCard.question}
                            </Animated.Text>
                            : 
                            <Animated.Text style = {[styles.mainText, {
                                    opacity: animatedValue,
                                    fontSize: textSize,
                                }]}>
                                {currentCard.answer}
                            </Animated.Text>   
                        }
                    
                </View>
                { showQuestion 
                    ? (<TouchableOpacity onPress = {this.toggleShowQuestion}>
                        <Text style = {styles.flipText}>
                            Show answer
                        </Text>
                    </TouchableOpacity>)
                    : (
                        <TouchableOpacity onPress = {this.toggleShowQuestion}>
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
                        <Text style = {styles.btnText}>
                            Correct
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {[styles.btn, {
                            backgroundColor: red
                        }]}
                        onPress = {() => this.handleOnPress('incorrect')}
                    >
                        <Text style = {styles.btnText}>
                            Incorrect
                        </Text>
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
        fontWeight: 'bold',
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
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

})
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {handleSaveDeckTitle, handleSaveResults} from '../actions'
import { 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { lightBlue,
    green, 
    white,
    red,
    lightGray,
    gray,
    blue
} from '../utils/colors'

class QuizScore extends React.Component {
    componentDidMount() {
        //save results
        const {results, dispatch, deckId } = this.props
        dispatch(handleSaveResults(deckId, results))
        //clear notifications
        clearLocalNotification()
            .then(setLocalNotification)
    }
    onRestart = () => {
        const { onRestart } = this.props
        onRestart()
        
        
    }
    onBackToDeck = () => {
        const { onBackToDeck } = this.props;
        onBackToDeck()
       
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
export default connect()(QuizScore)
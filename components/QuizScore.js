import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'

class QuizScore extends React.Component {
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
export default QuizScore
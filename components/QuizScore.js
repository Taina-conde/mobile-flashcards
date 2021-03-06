import React from 'react' 
import { 
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Platform
 } from 'react-native'
import { connect } from 'react-redux'
import { handleSaveResults} from '../actions'
import { 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/helpers'
import { lightBlue,
    white,
    gray,
    blue
} from '../utils/colors'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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
            
            <View style = {styles.container}>
                <Text style = {styles.scoreText}>Score</Text>
                <View style = {styles.resultsBox}>
                    <Text style = {styles.scoreResult}>
                        {this.props.results}
                    </Text>
                </View>
                <View style = {styles.btnGroup}>
                    <TouchableOpacity 
                        style = {[styles.btn, {
                            backgroundColor: lightBlue,
                        }]}
                        onPress = {this.onRestart}
                    >
                        <Text 
                            style = {styles.btnText}
                        >
                            Restart Quiz
                        </Text>
                        <MaterialCommunityIcons name="replay" size={26} color={white} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {[styles.btn, {
                            backgroundColor: gray
                        }]}
                        onPress = {this.onBackToDeck}
                    >
                        <Ionicons name="md-chevron-back" size={26} color={white} />
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 40 : 5,   
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: white,
        marginRight: 5,
    },

})
export default connect()(QuizScore)
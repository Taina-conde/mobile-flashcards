import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
 } from 'react-native'
import { addCardToDeck, handleAddCardToDeck } from '../actions'
import { connect } from 'react-redux'
import { green, 
    lightGray, 
    fadedGreen, 
    fadedWhite, 
    white
} from '../utils/colors';
import { addCard } from '../utils/api'

class NewQuestionView extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    handleTextChange = (input, name) => {
        this.setState(()=> ({
            [name] : input,
        }))

    }
    handleSubmit = () => {
        // add question to the deck
        const { dispatch, navigation, route } = this.props;
        const { deckId } = route.params;
        console.log('deckId : ', deckId)
        const { question, answer } = this.state;
        //dispatch(addCardToDeck(question, answer, deckId))
        //add question in AsyncStorage
        handleAddCardToDeck(deckId, {
            question,
            answer
        })
        //route back to deck view
        navigation.goBack()
    }
    render(){
        return (
            <KeyboardAvoidingView 
                style = {styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text style = {styles.labels}>Enter new question: </Text>
                <TextInput
                    style = {styles.inputField}
                    onChangeText = {(input) => this.handleTextChange(input, 'question')}
                    placeholder = 'question ...'
                    
                    
                />
                <Text style = {styles.labels}>Enter answer :</Text>
                <TextInput
                    style = {styles.inputField}
                    onChangeText = {(input) => this.handleTextChange(input, 'answer')}
                    placeholder = 'answer ...'
                    
                />
                <TouchableOpacity 
                    disabled = {!(this.state.question && this.state.answer)}
                    style = {[styles.submitBtn, {
                        backgroundColor: !(this.state.question && this.state.answer)
                            ? fadedGreen
                            : green
                    }]}
                    onPress = {this.handleSubmit}>
                    <Text style = {[styles.submitText, { 
                        color: !(this.state.question && this.state.answer) 
                            ? fadedWhite
                            : white
                            }]}
                    >
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labels : {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 40,
    },
    inputField : {
        borderColor: lightGray,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40,
        marginTop: 10,
        padding: 8,
        fontSize: 22,  
    },
    submitBtn : {
        borderRadius: 40,
        alignSelf: 'stretch',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 50,
        padding: 20,
        marginBottom: 60,
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    submitText : {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }


})
export default connect()(NewQuestionView)
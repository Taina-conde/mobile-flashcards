import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
 } from 'react-native'
import { addCardToDeck } from '../actions'
import { connect } from 'react-redux'

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
        dispatch(addCardToDeck(question, answer, deckId))
        //add question in AsyncStorage
        
        //route back to deck view
        navigation.goBack()
    }
    render(){
        return (
            <View style = {styles.container}>
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
                            ? "rgba(4, 180, 134, 0.4)"
                            : '#04B486'
                    }]}
                    onPress = {this.handleSubmit}>
                    <Text style = {[styles.submitText, { 
                        color: !(this.state.question && this.state.answer) 
                            ? 'rgba(255, 255, 255, 0.7)'
                            : '#ffffff'
                            }]}
                    >
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
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
        borderColor: 'gray',
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
        marginTop: 100,
        padding: 20,
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
    }


})
export default connect()(NewQuestionView)
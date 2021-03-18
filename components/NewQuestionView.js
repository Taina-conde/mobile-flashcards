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
                <TextInput
                    style = {styles.inputField}
                    onChangeText = {(input) => this.handleTextChange(input, 'question')}
                    placeholder = 'Enter new question'
                    
                    
                />
                <TextInput
                    style = {styles.inputField}
                    onChangeText = {(input) => this.handleTextChange(input, 'answer')}
                    placeholder = 'Enter answer'
                    
                />
                <TouchableOpacity onPress = {this.handleSubmit}>
                    <Text>SUBMIT</Text>
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
    inputField : {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40,
        marginTop: 40,
        padding: 8,
        fontSize: 22,
        
        
        
    }

})
export default connect()(NewQuestionView)
import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
 } from 'react-native'

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
        //route back to deck view
    }
    render(){
        return (
            <View>
                <Text>NewQuestionView</Text>
                <TextInput
                    onChangeText = {(input) => this.handleTextChange(input, 'question')}
                    placeholder = 'Enter new question'
                    
                />
                <TextInput
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
export default NewQuestionView
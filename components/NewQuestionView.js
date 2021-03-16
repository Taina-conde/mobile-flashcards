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
                <TouchableOpacity>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default NewQuestionView
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

    handleTextChange = (event) => {
        const value = event.target.value;
        this.setState(()=> ({
            [event.target.name] : value,
        }))

    }
    render(){
        return (
            <View>
                <Text>NewQuestionView</Text>
                <TextInput
                    onChange = {this.handleTextChange}
                    placeholder = 'Enter new question'
                    name = 'question'
                />
                <TextInput
                    onChange = {this.handleTextChange}
                    placeholder = 'Enter answer'
                    name = 'answer'
                />
                <TouchableOpacity>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default NewQuestionView
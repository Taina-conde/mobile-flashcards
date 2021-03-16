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
    render(){
        return (
            <View>
                <Text>NewQuestionView</Text>
                <TextInput/>
                <TextInput/>
                <TouchableOpacity>
                    SUBMIT
                </TouchableOpacity>
            </View>
        )
    }
}
export default NewQuestionView
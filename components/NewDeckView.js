import React from 'react' 
import { View, Text, StyleSheet, TextInput } from 'react-native'

class NewDeckView extends React.Component {
    state = {
        input: ""
    }
    handleTextChange = (input) => {
        this.setState(()=> ({
            input
        }))
    }
    render(){
        return (
            <View>
                <Text>NewDeckView</Text>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText = {this.handleTextChange}
                    value= {this.state.input}
                    placeholder = "Deck title"
                />
               
            </View>
        )
    }
}
export default NewDeckView
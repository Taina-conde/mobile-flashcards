import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class NewDeckView extends React.Component {
    state = {
        input: ""
    }
    handleTextChange = (input) => {
        this.setState(()=> ({
            input
        }))
    }
    handleSubmit = ()=> {
        //update store
        this.props.dispatch(addDeck({
            [this.state.input] : {
                title: this.state.input,
                questions: []
            }
        }))
        //update AsyncStorage
        //route to individual DeckView for the new deck
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
                <TouchableOpacity onPress = {this.handleSubmit}>
                    <Text>Create deck</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}
export default connect()(NewDeckView)
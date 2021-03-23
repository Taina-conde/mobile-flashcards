import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { 
    lightGray, 
    green, 
    fadedGreen, 
    white, 
    fadedWhite 
} from '../utils/colors'
import { handleSaveDeckTitle } from '../utils/api'

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
        const { dispatch, navigation } = this.props;
        
        //update store
        dispatch(addDeck({
            [this.state.input] : {
                title: this.state.input,
                questions: []
            }
        }))
        //update AsyncStorage
        handleSaveDeckTitle(this.state.input)
        //clear input
        this.setState(()=> ({
            input: ""
        }))
        //route to individual DeckView for the new deck
        navigation.navigate('Deck details', {
            deckId: this.state.input
        })
    }
    render(){
        const { input } = this.state;
        return (
            <KeyboardAvoidingView 
                style = {styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                
                <Text style = {styles.text}>What is the title of your new deck?</Text>
                
                <TextInput
                    style = {styles.inputField}
                    onChangeText = {this.handleTextChange}
                    value= {this.state.input}
                    placeholder = "Deck title"
                />
                <TouchableOpacity 
                    disabled = {!input}
                    style = {[styles.createBtn, {
                        backgroundColor: !input ? fadedGreen : green
                    }]}
                    onPress = {this.handleSubmit}>
                    <Text style = {[styles.createText, {
                        color: !input ? fadedWhite : white
                    }]}>Create deck</Text>
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
        padding: 30
    },
    text : {
        fontSize: 22,
        fontWeight: 'bold'
    },
    inputField : {
        borderWidth: 1,
        borderColor: lightGray,
        padding: 8,
        borderRadius: 5,
        alignSelf: 'stretch',
        fontSize: 22,
        marginBottom: 60,
        marginTop: 60,
    },
    createBtn : {
        borderRadius: 40,
        alignSelf: 'stretch',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 90,
        marginBottom: 40,
        padding: 20,
        shadowColor: `rgba(0,0,0, 0.24)`,
        shadowOffset: {
            width: 0, 
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    createText : {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})
export default connect()(NewDeckView)
import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class QuizView extends React.Component {
    render() {
        const { route, decks } = this.props;
        const { deckId } = route.params;
        if (decks[deckId] === "undefined") {
            
        }
        return (
            <View>
                <Text>QuizView</Text>
                
            </View>
        )
    }
}
function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(QuizView)
import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckView extends React.Component {
    render(){
        const { navigation } = this.props;
        return (
            <View>
                <Text>DeckView</Text>
                
                <TouchableOpacity onPress = {() => navigation.navigate('New question')}>
                    <Text>Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => navigation.navigate('Quiz details')}>
                    <Text>Start quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
function mapStateToProps(decks, { id }) {
    return {
        deck: decks[id]
    }
}
export default connect(mapStateToProps)(DeckView)
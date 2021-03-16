import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckListView extends React.Component {
    render (){
        const { navigation } = this.props
        return(
            <View style = {styles.container}>
                <Text>DeckListView</Text>
                <TouchableOpacity onPress = {() => navigation.navigate('Deck details')}>
                    <Text>Press to Deck View</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckListView)


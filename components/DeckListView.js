import React from 'react' 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
export default DeckListView


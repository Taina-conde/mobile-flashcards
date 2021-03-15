import React from 'react' 
import { View, Text, StyleSheet } from 'react-native'

class DeckListView extends React.Component {
    render (){
        return(
            <View style = {styles.container}>
                <Text>DeckListView</Text>
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


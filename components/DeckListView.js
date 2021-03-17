import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions';


class DeckListView extends React.Component {
    componentDidMount() {
        const { dispatch, decks } = this.props;

        dispatch(receiveDecks(decks))
    }
    renderItem = ({ item }) => {
        const {navigation} = this.props
        console.log('renderItem', item)
        return (
            <TouchableOpacity onPress = {() => navigation.navigate('Deck details')}>
                <Text>{item.title }</Text>
                <Text>{item.questions.length}</Text>
            </TouchableOpacity>
        )
    }
    render (){
        const { navigation, decks } = this.props;
        const decksKeys = Object.keys(decks);
        const data = Object.values(decks)
        return(
            <View style = {styles.container}>
                <Text>DeckListView</Text>
                { (decksKeys.length === 0)
                  ? <Text> 0 decks</Text>
                  : <FlatList 
                        data = {data}
                        renderItem = {this.renderItem}
                        keyExtractor = { item => item.title}
                    />
                
                }
                

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


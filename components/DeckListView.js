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
            <TouchableOpacity style= {styles.deckBox} onPress = {() => navigation.navigate('Deck details', { deckId: item.title})}>
                <Text style = {styles.deckTitle}>{item.title }</Text>
                <Text style = {styles.numCards}>
                    {`${item.questions.length} ${item.questions.length === 1 ? 'card': 'cards' }`}</Text>
            </TouchableOpacity>
        )
    }
    render (){
        const { navigation, decks } = this.props;
        const decksKeys = Object.keys(decks);
        const data = Object.values(decks)
        return(
            <View style = {styles.container}>
                
                { (decksKeys.length === 0)
                  ? <Text style = {styles.deckBox}> 0 decks</Text>
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
        alignItems: 'stretch', 
    },
    deckBox : {
        height: 100,
        margin: 20,
        backgroundColor: '#ffff',
        padding: 20,
        shadowColor: `rgba(0,0,0, 0.24)`,
          shadowOffset: {
            width: 0, 
            height: 3,
          },
        shadowRadius: 6,
        shadowOpacity: 1,
        textAlign: 'center',
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle : {
        fontSize: 22,
        marginBottom: 5,
    },
    numCards : {
        color: '#848484',
    }

    
})

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckListView)


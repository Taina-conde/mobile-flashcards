import React from 'react' 
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import {  white, lightGray, lightBlue, blue } from '../utils/colors';

class DeckListView extends React.Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props;
        
        dispatch(handleInitialData())
        .then (() => this.setState({
            ready: true
        }))

    }
    renderItem = ({ item }) => {
        const {navigation} = this.props
        
        return (
            <TouchableOpacity style= {styles.deckBox} onPress = {() => navigation.navigate('Deck details', { deckId: item.title})}>
                <Text style = {styles.deckTitle}>{item.title }</Text>
                <Text style = {styles.numCards}>
                    {item.questions.length === 1 ? 
                    `${item.questions.length} card`: 
                    `${item.questions.length} cards`}</Text>
            </TouchableOpacity>
        )
    }
    
    render (){
        const { decks } = this.props;
        const { ready } = this.state;
        const decksKeys = Object.keys(decks);
        const data = Object.values(decks)
        return(
            <View style = {styles.container}>
                {ready === false && <ActivityIndicator style={styles.loading} size = "large" color={lightBlue}/>}
                { (decksKeys.length === 0 && ready === true)
                  ? <Text style = {styles.noDecks}> 0 decks</Text>
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
    loading : {
        flex: 1,
        
    },
    noDecks : {
        alignSelf: 'center',
        fontSize: 46,
        

    },
    deckBox : {
        height: 100,
        margin: 20,
        backgroundColor: white,
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
        color: lightGray,
    }

    
})

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckListView)


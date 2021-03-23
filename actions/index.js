import { 
    getDecks,
    saveDeckTitle,
    getDeck,
    addCard
 } from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function handleInitialData() {
    return (dispatch) => {
        return getDecks()
            .then((decks)=> {
                dispatch(receiveDecks(decks))
            })
    }
}
export function handleSaveDeckTitle(title) {
    return (dispatch) => {
        return saveDeckTitle(title)
            .then(() => {
                dispatch(addDeck({
                    [title]: {
                        title,
                        questions: []
                    }
                }))
            })
    }
}
export function handleAddCardToDeck(title, card) {
    return (dispatch) => {
        return addCard(title, card)
            .then(() => {
                console.log('title', title)
                console.log('card', card)
                dispatch(addCardToDeck(card, title))
            }).then(()=> getDecks()).then((res)=> {
                console.log('Add card to deck: ', res)
            })
    
    }
}

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

function addCardToDeck({question, answer}, deckId) {
    return {
        type: ADD_CARD_TO_DECK,
        question, 
        answer,
        deckId
    }
}

  

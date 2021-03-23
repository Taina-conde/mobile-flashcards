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
        dispatch(addDeck(title))
        return saveDeckTitle(title)
    }
}
export function handleAddCardToDeck(info) {
    return (dispatch) => {
        dispatch(addCardToDeck(info))
        return addCard(info)
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

function addCardToDeck(question, answer, deckId) {
    return {
        type: ADD_CARD_TO_DECK,
        question, 
        answer,
        deckId
    }
}


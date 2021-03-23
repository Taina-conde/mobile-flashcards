import { 
    getDecks,
    saveDeckTitle,
    saveResultsToDeck,
    addCard
 } from '../utils/api'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const SAVE_RESULTS = 'SAVE_RESULTS'

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
                        questions: [],
                        results: []
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
export function handleSaveResults(deckId, results) {
    return (dispatch) => {
        return saveResultsToDeck(deckId, results)
            .then(() => {
                dispatch(saveResults(deckId, results))
            }).then(()=> getDecks()).then((res)=> {
                console.log('save results to deck: ', res)
            })
    }
}

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeck(deck) {
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

function saveResults(deckId, results) {
    return {
        type: SAVE_RESULTS,
        deckId,
        results
    }
}

  

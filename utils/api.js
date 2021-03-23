import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA_STORAGE_KEY = 'MobileFlashcards : data'

export function getDecks(){
    return AsyncStorage.getItem(DATA_STORAGE_KEY )
        .then((results) => {
            console.log('results',JSON.parse(results))
            return JSON.parse(results)})
 }
 export function getDeck(deckId) {
     return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            return data[deckId]
        })
 }
 export function saveDeckTitle(title) {    
     return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    })).then(() => getDecks()).then((res)=> {
        console.log('save deck title: ', res)
    })
 }
 export function addCard(title, card) {
     return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [title] : {
            questions : [card]
        }
     }))
 }







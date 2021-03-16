import { AsyncStorage } from 'react-native' 

const DECKS_STORAGE_KEY = '@Decks'

AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse(results))
}




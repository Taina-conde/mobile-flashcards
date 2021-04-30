import AsyncStorage from "@react-native-async-storage/async-storage";
export const DATA_STORAGE_KEY = "MobileFlashcards : data";

export function getDecks() {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then((results) => {
    console.log("results", JSON.parse(results));
    return JSON.parse(results);
  });
}
export function getDeck(deckId) {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    return data[deckId];
  });
}
export function saveDeckTitle({ title }) {
  return AsyncStorage.mergeItem(
    DATA_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
        results: [],
      },
    })
  )
    .then(() => getDecks())
    .then((decks) => {
      console.log("save deck title: ", decks);
    });
}
export function addCard(title, card) {
  return getDeck(title).then((deck) => {
    const existingCardsArr = deck.questions;
    const addedCardArr = existingCardsArr.concat([card]);
    return AsyncStorage.mergeItem(
      DATA_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: addedCardArr,
        },
      })
    );
  });
}
export function saveResultsToDeck(title, results) {
  return getDeck(title).then((deck) => {
    const existingResultsArr = deck.results;
    const addedResultsArr = existingResultsArr.concat([results]);
    return AsyncStorage.mergeItem(
      DATA_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          results: addedResultsArr,
        },
      })
    );
  });
}
export function deleteDeck(deckId) {
  return getDecks().then((decks) => {
    let newData = {};
    const decksIdsArr = Object.keys(decks);
    const decksIdsArrWithoutDeletedDeck = decksIdsArr.filter(
      (id) => id !== deckId
    );
    decksIdsArrWithoutDeletedDeck.map((id) => {
      newData = {
        ...newData,
        [id]: decks[id],
      };
    });
    console.log("newData", newData);
    return AsyncStorage.setItem(
        DATA_STORAGE_KEY, 
        JSON.stringify(newData)
        );
  });
}

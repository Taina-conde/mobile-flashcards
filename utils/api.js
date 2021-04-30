import AsyncStorage from "@react-native-async-storage/async-storage";
export const DATA_STORAGE_KEY = "MobileFlashcards : data";

export function getDecks() {
  return AsyncStorage.getItem(DATA_STORAGE_KEY).then((results) => {
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
  );
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
export async function deleteDeck(deckId) {
  let newDecks = {};
  const decks = await getDecks();
  const decksIdsArr = Object.keys(decks);
  const decksIdsArrWithoutDeletedDeck = decksIdsArr.filter(
    (id) => id !== deckId
  );
  decksIdsArrWithoutDeletedDeck.map((id) => {
    newDecks = {
      ...newDecks,
      [id]: decks[id],
    };
  });

  await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newDecks));
  return newDecks;
}

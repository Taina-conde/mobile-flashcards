import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { white, lightGray} from "../utils/colors";
import DeleteDeckBtn from './DeleteDeckBtn'

const DeckListItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.deckBox}
      onPress=
      {() => props.navigation.navigate("Deck details", { deckId: props.item.title })}
    >
      <Text style={styles.deckTitle}>{props.item.title}</Text>
      <Text style={styles.numCards}>
        {props.item.questions.length === 1
          ? `${props.item.questions.length} card`
          : `${props.item.questions.length} cards`}
      </Text>
      <DeleteDeckBtn
        id = {props.item.title}
        font = {14}
      />

    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  deckBox: {
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
    textAlign: "center",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deckTitle: {
    fontSize: 22,
    marginBottom: 5,
  },
  numCards: {
    color: lightGray,
  },
});
export default DeckListItem;

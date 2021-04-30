import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { handleDeleteDeck } from "../actions";
import { connect } from "react-redux";
import { darkRed } from '../utils/colors';

const DeleteDeckBtn = (props) => {
  const deleteDeckHandler = () => {
    console.log("props in delete", props);
    props.dispatch(handleDeleteDeck(props.id));
  };
  return (
    <TouchableOpacity onPress={deleteDeckHandler}>
      <Text style = {styles.btnText}>Delete</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    btnText: {
        color: darkRed,
        marginTop: 6,
        fontWeight: 'bold',
    },

})
export default connect()(DeleteDeckBtn);

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { handleDeleteDeck } from "../actions";
import { connect } from "react-redux";
import { darkRed } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

const DeleteDeckBtn = (props) => {
  const navigation = useNavigation();
  const deleteDeckHandler = () => {
    if (props.parent === "DeckView") {
      
      props.dispatch(handleDeleteDeck(props.id));
      navigation.navigate('Home')
    }
    console.log("props in dlete", props);
    props.dispatch(handleDeleteDeck(props.id));
  };
  return (
    <TouchableOpacity onPress={deleteDeckHandler}>
      <Text style={[styles.btnText, { fontSize: props.font }]}>Delete</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnText: {
    color: darkRed,
    marginTop: 6,
    fontWeight: "bold",
  },
});
export default connect()(DeleteDeckBtn);

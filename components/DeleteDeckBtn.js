import React, {useEffect} from "react";
import { TouchableOpacity, Text } from "react-native";
import { handleDeleteDeck} from "../actions"
import { connect } from 'react-redux';

const DeleteDeckBtn = (props) => {
    
    const deleteDeckHandler = () => {
        console.log('props in delete', props)
        props.dispatch(handleDeleteDeck(props.id))
        
    }
  return (
    <TouchableOpacity
        onPress = {deleteDeckHandler}
    >
      <Text>Delete</Text>
    </TouchableOpacity>
  );
};
export default connect()(DeleteDeckBtn);

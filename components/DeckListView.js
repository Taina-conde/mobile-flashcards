import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import { lightBlue } from "../utils/colors";
import DeckListItem from './DeckListItem';

class DeckListView extends React.Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialData()).then(() =>
      this.setState({
        ready: true,
      })
    );
  }
  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <DeckListItem
        navigation = {navigation}
        item = {item}
      />
    );
  };

  render() {
    const { decks } = this.props;
    const { ready } = this.state;
    const decksKeys = Object.keys(decks);
    const data = Object.values(decks);
    return (
      <View style={styles.container}>
        {ready === false && (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color={lightBlue}
          />
        )}
        {decksKeys.length === 0 && ready === true ? (
          <Text style={styles.noDecks}> 0 decks</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.title}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  loading: {
    flex: 1,
  },
  noDecks: {
    alignSelf: "center",
    fontSize: 46,
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(DeckListView);

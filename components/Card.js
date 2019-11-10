import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import Constants from 'expo-constants';


import decks from './flashcards';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      presented: props.presented,
      correct: props.correct,
      time: props.time,
      front: props.front,
      back: props.back,
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {!this.state.presented? this.state.front : this.state.back}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginVertical: 8,
  },
  paragraph: {
    margin: 14,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
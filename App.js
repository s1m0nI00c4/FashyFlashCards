import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import decks from './components/flashcards';

// You can import from local files
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import RenameDeck from './components/RenameDeck';

export default class FlashyFlashCards extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     decks: decks,
     cards: [],
     chosen: '',
     showDeckForm: false,
     showRenameDeckForm: false,
   };
 }

  addDeck = newDeck => {
    const myDeck = {name: newDeck.name, cards: []}
    this.setState(prev=> ({decks: [...prev.decks, myDeck], showDeckForm: false}))

  }

  renameDeck = newName => {
    const newDecks = this.state.decks.map(item => (item.name === this.state.chosen)?{name: newName.name, cards: item.cards}: item)
    this.setState({decks: newDecks, chosen: '', showRenameDeckForm: false, })

  }

  render() {
    

    if (this.state.showDeckForm) return (<AddDeck onSubmit={this.addDeck} />)
    if (this.state.showRenameDeckForm) return (<RenameDeck onSubmit={this.renameDeck} />)

    const chosenDeck = this.state.chosen;
    if (chosenDeck === '') { return (
      
      <View>
        <Text style={styles.header}>Welcome to the FlashyFlashCards App. </Text>
        <Text style={styles.paragraph}>Choose a deck. </Text>
        {(this.state.decks.map((ttl) => {return (
          <Button 
            title={ttl.name + " (" + ttl.cards.length + ")"}
            onPress={() => {this.setState({chosen: ttl.name})}}>
            <Deck title={ttl.name}> </Deck> 
          </Button>)} ))}
        <Text style={styles.paragraph}> </Text>
        <Button 
          title="Add a new deck" 
          onPress={() => this.setState({showDeckForm: true})} 
          color="#66ff66"
        />
      </View>)} 

    else { return (
      <View style={styles.header}>
        <Button
          title="< Back" 
          onPress={() => {this.setState({chosen: ''})}} 
          color="#cccccc"
        />
        <Deck 
          title={chosenDeck} 
          id={0} 
          cards={this.state.decks.filter(item => item.name === chosenDeck)[0].cards}
        />
        <Button 
          title="Rename this Deck" 
          onPress={() => this.setState({showRenameDeckForm: true})}
          color="#cccccc"
        />
        <Button 
          color="#f00" 
          onPress={() => {
            const myDecks = this.state.decks;
            const newDecks = myDecks.filter(item => item.name != chosenDeck)
            this.setState({decks: newDecks});
            this.setState({chosen: ''});}} 
          title="Delete this Deck" 
        />
      </View>
    )}
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  paragraph: {
    margin: 14,
    marginBottom: 28,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  header: {
    paddingTop: Constants.statusBarHeight,
    margin: 14,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },


});

import * as React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

import decks from './flashcards';
import Card from './Card';
import AddCard from './AddCard';
import RenameDeck from './RenameDeck';

export default class Deck extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      flipped: false,
      chosen: false,
      cards: props.cards.map(item => ({id: props.id++, front: item.front, back: item.back, time: 0, presented: false, correct: false})),
      rightCards: [],
      wrongCards: [],
      randomCard: 0,
      showCardForm: false,
      time: 0,
      start: 0,
      timerActive: true,

    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)

  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now()
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1)
    console.log("start")
  }

  stopTimer() {
    clearInterval(this.timer)
    
    const myCard = this.state.cards[this.state.randomCard]
    myCard.time = this.state.time
    const myDeckOfCards = this.state.cards
    myDeckOfCards[this.state.randomCard] = myCard

    this.setState({time: 0, cards: myDeckOfCards})
  }

  presentCard(myId) {
    const myCards = this.state.cards
    myCards[myId].presented = true
    this.setState({cards: myCards})
  }

  resetDeck() {
    clearInterval(this.timer)
    this.startTimer()
    this.setState(prev => ({randomCard: 0, time: 0, cards: [...prev.wrongCards, ...prev.cards.filter(item => item.presented === false), ...prev.rightCards].map(item => ({id: item.id, front: item.front, back: item.back, time: item.time, presented: false, correct: item.correct})), rightCards: [], wrongCards: []}))
  }

  changeCardState(myId, truth) {
    const myCards = this.state.cards
    myCards[myId].correct = truth

    truth? 
      this.setState(prev => {rightCards: prev.rightCards.push(myCards[myId])}) :
      this.setState(prev => {wrongCards: prev.wrongCards.push(myCards[myId])})

    this.setState(prev=>({rightCards: prev.rightCards.sort((a,b)=> b.time - a.time), wrongCards: prev.wrongCards.sort((a,b) => b.time - a.time)}))

    if (this.state.randomCard === this.state.cards.length -1) {
      this.setState(prev => ({randomCard: -1,}))
      this.setState(prev => ({cards: [...prev.wrongCards, ...prev.rightCards].map(item => ({id: item.id, front: item.front, back: item.back, time: item.time, presented: false, correct: item.correct}))}))
    }
  }

  addCard = newCard => {
    const myCard = {id: this.state.id, front: newCard.front, back: newCard.back, time: 0, presented: false, correct: false}
    this.setState(prev=> ({cards: [...prev.cards, myCard], showCardForm: false, id: prev.id+1}))
    this.props.addParentCard(myCard)
    this.startTimer()

  }

  removeCard() {
    console.log("remove")
    this.state.randomCard+1 === this.state.cards.length? this.setState({cards: [], randomCard: 0}) : null
    /*const myCards = this.state.cards
    const newCards = myCards.filter(crd => crd.id !== this.state.randomCard)
    newCards === null? this.setState({cards: [], randomCard: 0}): this.setState({cards: newCards})*/
    this.props.removeParentCard(this.state.randomCard)
  }

  advance() {
    this.setState(prev => ({randomCard: prev.randomCard+1}))
  }

  componentDidMount() {
    this.startTimer()
  }


  render() {
    
    // To add a card
    if (this.state.showCardForm === true) return (
      <AddCard onSubmit={this.addCard} />
    )

    //If the deck is empty
    if (this.state.cards.length === 0) return (
      <View>
        <Text style={styles.container}>No cards available!</Text>         
        <Button 
          color="#66ff66" 
          onPress={() => {this.setState({showCardForm: true}); this.stopTimer()}} 
          title="Add a new card"
        />
        <Text style={styles.container}></Text> 
      </View>)

    return (
      <View style={styles.paragraph}>{!this.state.cards[this.state.randomCard].presented?
        <View style={styles.paragraph}> 
         <Text style={styles.header}>{this.state.cards[this.state.randomCard].id} - {this.state.cards[this.state.randomCard].front} </Text>
         <Button title="Flip It!" onPress={() => {this.presentCard(this.state.randomCard); this.stopTimer()}}/>
         <Text style={styles.summary}>Time: {Math.floor(this.state.time/1000)} {Math.floor(this.state.time/1000)===1?"second":"seconds"}</Text>
        </View> : 

        <View style={styles.paragraph}>
          <Text style={styles.header}>{this.state.cards[this.state.randomCard].back}</Text>
          <Button title="Right!" onPress={() => {this.changeCardState(this.state.randomCard, true); this.advance(); this.startTimer()}} color="#66ff66"/>
          <Button title="Wrong!" onPress={() => {this.changeCardState(this.state.randomCard, false); this.advance(); this.startTimer()}} color="red"/>
          <Text style={styles.summary}>Right: {this.state.rightCards.length}</Text>
          <Text style={styles.summary}>Wrong: {this.state.wrongCards.length}</Text>
          <Text style={styles.summary}>Time: {Math.floor(this.state.cards[this.state.randomCard].time/1000)} {Math.floor(this.state.time/1000)<2?"second":"seconds"}</Text>
        </View>}
        <Text style={styles.paragraph}></Text>
         <Button title="Reset deck" color="#cccccc" onPress={() => {this.resetDeck();}} />
         <Button color="#66ff66" onPress={() => {this.setState({showCardForm: true}); this.stopTimer()}} title="Add a new card"></Button>
         <Button color="red" onPress={() => {this.stopTimer(); this.removeCard(); this.advance(); this.startTimer()}} title="Delete this card"/>
      </View>
      ) 
  }
}
//

//() => {
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

summary: {
    margin: 14,
    marginBottom: 0,
    fontSize: 12,
    textAlign: 'center',
  },

  header: {
    margin: 14,
    marginBottom: 28,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  
});

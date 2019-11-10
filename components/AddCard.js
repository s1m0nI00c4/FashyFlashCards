import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';



export default class AddCard extends React.Component {

state = {
      front: '',
      back: '',
    }

  handleFrontChange = front => {
    this.setState({front: front})
  }

  handleBackChange = back => {
    this.setState({back: back})
  }

  handleSubmit = () => {
    this.props.onSubmit({ front:  this.state.front, 
                          back:   this.state.back,
                          presented: false,
                          correct: false,
                          time: 0,})
  }

  render() {

    return (
    <View>
      <Text style={styles.paragraph}> Enter front and back of your new card </Text>
      <TextInput placeholder="Enter front" value={this.state.front} onChangeText={this.handleFrontChange} />
      <TextInput placeholder="Enter back" value={this.state.back} onChangeText={this.handleBackChange} />
      <Text style={styles.paragraph}></Text>
      <Button 
        title="Add card!" 
        color="#66ff66"
        onPress={this.handleSubmit}
      />
      <Text style={styles.paragraph}></Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  
  paragraph: {
    paddingTop: Constants.statusBarHeight,
    margin: 14,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
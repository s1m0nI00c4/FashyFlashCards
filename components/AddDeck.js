import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';


export default class AddDeck extends React.Component {

  state = {
      name: '',
  }

  handleNameChange = name => {
    this.setState({name: name})
  }

  handleSubmit = () => {
    this.props.onSubmit({name: this.state.name, cards: [],})
  }

  render() {
    return (
    <View>
      <Text style={styles.paragraph}> Enter the name of your new deck </Text>
      <TextInput placeholder="Enter name" value={this.state.name} onChangeText={this.handleNameChange} />
      <Text style={styles.paragraph}></Text>
      <Button 
        color="#66ff66"
        title="Add deck!" 
        onPress={this.handleSubmit}
      />
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
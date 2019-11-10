import * as React from 'react';
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';

export default class RenameDeck extends React.Component {

  state = {
    name: '',
  }

  handleNameChange = name => {
    this.setState({name: name})
  }

  handleSubmit = () => {
    this.props.onSubmit({name: this.state.name})
  }

  render() {
    return (
    <View>
      <Text style={styles.paragraph}> Enter the new name for this deck </Text>
      <TextInput placeholder="Enter name" value={this.state.name} onChangeText={this.handleNameChange} />
      <Text style={styles.paragraph}></Text>
      <Button 
        title="Rename deck!"
        color="#66ff66"
        onPress={this.handleSubmit}
      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  
  paragraph: {
    margin: 14,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
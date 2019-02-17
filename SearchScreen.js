import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';

import Styles from './Styles';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  handleChangeText = (text) => {
    this.setState({
      searchQuery: text
    });
  }

  onSearchButtonPress = () => {
    if (this.state.search !== '') {
      this.props.navigation.navigate('Display', {
        searchQuery: this.state.searchQuery
      });
    } else {
      Alert.alert(
        "You must enter a query into the search bar."
      );
    }
  }

  render() {
    return (
      <View style={Styles.Search}>
        <TextInput
          style={Styles.SearchBar}
          placeholder="Enter your search here"
          onChangeText={this.handleChangeText}
        />
        <TouchableOpacity onPress={this.onSearchButtonPress}>
          <View style={Styles.SearchButton}>
            <Text style={Styles.SearchButtonText}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

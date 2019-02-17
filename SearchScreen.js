import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './Styles';

export default class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Pixabay Image Viewer'
  };

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
        <Image
          style={Styles.Logo}
          source={require('./img/pixabay.png')}
        />
        <TextInput
          style={Styles.SearchBar}
          placeholder="Enter your search keywords here..."
          onChangeText={this.handleChangeText}
        />
        <Icon.Button
          name='search'
          backgroundColor='#d7d7db'
          onPress={this.onSearchButtonPress}
        >
          <Text style={Styles.SearchButtonText}>Search</Text>
        </Icon.Button>
      </View>
    );
  }
}

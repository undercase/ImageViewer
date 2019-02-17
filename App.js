import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {APIKeyContext} from './APIKeyContext';
import {APIKey} from './APIKey';

import SearchScreen from './SearchScreen';
import DisplayScreen from './DisplayScreen';
import DetailsScreen from './DetailsScreen';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Display: DisplayScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Search'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <APIKeyContext.Provider value={APIKey}>
        <AppContainer />
      </APIKeyContext.Provider>
    );
  }
}

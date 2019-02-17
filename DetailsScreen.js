import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

import APIKeyContext from './APIKeyContext';
import Styles from './Styles';

export default class DetailsScreen extends Component {
  render() {
    const largeImageURL = this.props.navigation.getParam('largeImageURL', '');
    const views = this.props.navigation.getParam('views', '');
    const downloads = this.props.navigation.getParam('downloads', '');
    const imageWidth = this.props.navigation.getParam('imageWidth', '');
    const imageHeight = this.props.navigation.getParam('imageHeight', '');
    return (
      <View>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: (Dimensions.get('window').width / imageWidth) * imageHeight
          }}
          source={{uri: largeImageURL}}
        />
        <Text>Image Views: {views}</Text>
        <Text>Image Downloads: {downloads}</Text>
      </View>
    );
  }
}

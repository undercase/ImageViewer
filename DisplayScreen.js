import React, {Component} from 'react';
import {Text, View, Image, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-navigation';

import {APIKeyContext} from './APIKeyContext';
import Styles from './Styles';

/*
Utility function to take an object of the form:
{
  key1: value1,
  key2: value2,
  ...
}
And convert it into a query string. Automatically encodes each key and value
using encodeURIComponent.
*/
function convertObjectToQueryString(obj) {
  return Object.entries(obj).map(([key, val]) => encodeURIComponent(key) + '=' + encodeURIComponent(val)).join('&');
}

export default class DisplayScreen extends Component {
  static contextType = APIKeyContext;

  // Title of navigation bar is the search query
  static navigationOptions = ({ navigation }) => {
    const searchQuery = navigation.getParam('searchQuery', '');
    return {
      title: searchQuery
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentPage: 1,
      images: []
    };
  }

  retrieveImagesFromAPI = () => {
    // Set isLoading to true so the ActivityIndicator displays
    this.setState({
      isLoading: true
    });

    // Retrieve API Key from the context API
    const APIKey = this.context;
    const searchQuery = this.props.navigation.getParam('searchQuery', '');
    // Retrieve 20 images per query
    const perPage = 20;
    // Build query string
    const queryString = convertObjectToQueryString({
      key: APIKey,
      q: searchQuery,
      image_type: 'photo',
      page: this.state.currentPage,
      per_page: perPage
    });
    return fetch(`https://pixabay.com/api/?${queryString}`)
      .then((response) => response.json())
      .then((responseJson) => {
        // Pass a function to setState since we use previous state to generate
        // the new state.
        this.setState((state, props) => {
          return {
            isLoading: false,
            // Concatenate new images to the previous list
            images: state.images.concat(responseJson.hits)
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    return this.retrieveImagesFromAPI();
  }

  onImagePress = ({largeImageURL, views, downloads, imageWidth, imageHeight, id}) => {
    this.props.navigation.navigate('Details', {
      largeImageURL,
      views,
      downloads,
      imageWidth,
      imageHeight,
      id
    });
  }

  render() {
    const searchQuery = this.props.navigation.getParam('searchQuery', '');

    const renderImage = ({item}) => {
      return (
        <TouchableOpacity style={Styles.ThumbnailImage} onPress={() => this.onImagePress(item)}>
          <Image
            style={[{
              width: item.previewWidth,
              height: item.previewHeight
            }, Styles.ThumbnailImage]}
            resizeMode='contain'
            source={{uri: item.previewURL}}
          />
        </TouchableOpacity>
      );
    }

    const keyExtractor = ({id}, index) => id.toString();

    // If more images are loading, display an ActivityIndicator at the bottom of the screen.
    return (
      <View style={Styles.ListContainer}>
        <FlatList
          data={this.state.images}
          renderItem={renderImage}
          keyExtractor={keyExtractor}
          ListFooterComponent={() => this.state.isLoading ? <ActivityIndicator animating size="large" /> : null}
          onEndReached={this.retrieveImagesFromAPI}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

import React, {Component} from 'react';
import {Text, View, Image, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-navigation';

import {APIKeyContext} from './APIKeyContext';
import Styles from './Styles';

function convertObjectToQueryString(obj) {
  return Object.entries(obj).map(([key, val]) => encodeURIComponent(key) + '=' + encodeURIComponent(val)).join('&');
}

export default class DisplayScreen extends Component {
  static contextType = APIKeyContext;

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
    this.setState({
      isLoading: true
    });
    const APIKey = this.context;
    const searchQuery = this.props.navigation.getParam('searchQuery', '');
    const perPage = 20;
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
        this.setState((state, props) => {
          return {
            isLoading: false,
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

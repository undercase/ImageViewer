import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  Logo: {
    width: 256,
    height: 70
  },
  Search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SearchBar: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },
  SearchButton: {
    width: 280,
    padding: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d7db'
  },
  SearchButtonText: {
    fontSize: 16
  },
  ThumbnailImage: {
    flex: 1
  },
  ListContainer: {
    flex: 1,
    alignItems: 'center'
  },
  Details: {
  },
  DetailImage: {
    marginBottom: 20
  },
  DetailText: {
    margin: 10,
    marginLeft: 20,
    fontSize: 16
  }
});

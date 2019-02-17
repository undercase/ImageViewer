# ImageViewer

A React Native application to search the pixabay API. On the home screen of the application, users can enter a search query. Once they submit their search, they are brought to a list of images with infinite scrolling. They can click on any image to see a detail view with a full resolution version of the image.

## Deliverables

1. **Use the react context API** - I used the context API to make the pixabay API key available to every screen of the application.
2. **Use a flatList (no scroll view)** - I used a FlatList to render the list of images on the Display screen.
3. **Must use react-navigation for navigation** - I used a react-navigation StackNavigator to handle the application's screens and state.
4. **Must work and look the same on iOS and android** - This app works and looks the same on both platforms.
5. **Do not use expo or CRNA you must do react native INIT** - I  used react-native INIT.
6. **Must link at least one native module (vector icons is probably a goodone to choose)** - I linked the native module react-native-vector-icons and used it to display a search button with a search icon from FontAwesome.

## Screenshots

### Search Screen

The search screen displays the pixabay logo, a search bar, and a search button. The search button uses react-native-vector-icons to display a search icon from the FontAwesome library.

![Search Screen](/screenshots/SearchScreen.PNG)

### Display Screen

The display screen displays a FlatList of the search results once the user clicks on the "Search" button. The list supports infinite scrolling; once the user scrolls to the bottom of it, it will automatically load the next page of results, and show an ActivityIndicator while the results are loading.

![Display Screen](/screenshots/DisplayScreen.PNG)

### Details Screen

Once the user clicks on an image, they are brought to that image's detail view. Here, a full resolution version of the image is rendered. It is automatically resized to fit the width of their device. Below the image, its # of views and # of downloads is displayed.

![Details Screen](/screenshots/DetailsScreen.PNG)

## Setup

This app requires a pixabay API key. In order to manage the API Key as an environment variable, it uses the `react-native-dotenv` package. Create a file named `.env` in the root directory of the repository, and insert the API Key into it as follows:

    APIKey=<Your API Key Here>

The application will automatically load the API Key from this file, and make it available to  the whole application using the react context API.

## Running the Application

1. Fork and clone this repository.

2. Install the dependencies:

        npm install

3. Add a `.env` file with your pixabay API key (see `Setup` above).

4. To run on an android emulator, run this in the project directory:

        react-native run-android

5. For iOS, run this command instead:

        react-native run-ios

If you're having problems getting the application running, you may be missing a necessary dependency or SDK. [Follow the official React Native getting started guide to troubleshoot any issues.](https://facebook.github.io/react-native/docs/getting-started.html)

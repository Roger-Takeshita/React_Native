<h1 id='summary'>Summary</h1>

-   [Great Places App](#greatplaces)
    -   [Packages](#greatpackages)
    -   [Folder and Files](#components)
    -   [Components](#components)
        -   [Custom Header Button](#customheaderbutton)
        -   [Place Item](#placeitem)
    -   [CSS](#css)
    -   [Models](#models)
    -   [Navigation](#navigation)
    -   [Screens](#screens)
    -   [Redux / Redux-Thunk](#redux)
        -   [Actions & Reducers](#actionsreducer)
        -   [Connect Redux](#connectredux)
-   [Environment Variables](#env)
-   [Expo - Features](#expofeatures)
    -   [Image Picker](#imagepicker)
    -   [Location Picker](#locationpicker)
    -   [Map Preview](#mappreview)
-   [Local Database - SQLite](#localdb)
    -   [Create Database](#database)
    -   [Initialize Database - App.js](#initdatabase)
    -   [Update Redux](#updateredux)

<h1 id='greatplaces'>Great Places App</h1>

<h2 id='greatpackages'>Packages</h2>

[Go Back to Summary](#summary)

-   Create a new expo app

    ```Bash
      expo init 5_great_places
    ```

-   Install the [navigation package](https://reactnavigation.org/docs/getting-started) and their dependencies

    ```Bash
      npm install react-navigation react-navigation-stack react-redux redux redux-thunk
      expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```

    ```Bash
      npm i react-navigation-drawer react-navigation-header-buttons @expo/vector-icons
    ```

<h2 id='folderfiles1'>Folder and Files</h2>

[Go Back to Summary](#summary)

-   Create folder and files

    ```Bash
      touch env.js
      touch -n components/CustomHeaderButton.js + PlaceItem.js + ImgPicker.js + LocationPicker.js + MapPreview.js
      touch -n css/Colors.js
      touch -n helpers/db.js
      touch -n models/place.js
      touch -n navigation/PlacesNavigator.js
      touch -n screens/PlacesListScreen.js + PlacesDetailScreen.js + NewPlaceScreen.js + MapScreen.js
      touch -n store/places.js
    ```

-   Final structure

    ```
      5_Great_Places
      ├─ App.js
      ├─ app.json
      ├─ assets
      │  ├─ icon.png
      │  ├─ places.png
      │  ├─ places-adaptive.png
      │  ├─ splash.png
      │  └─ splash_icon.png
      ├─ babel.config.js
      ├─ components
      │  ├─ CustomHeaderButton.js
      │  ├─ ImgPicker.js
      │  ├─ LocationPicker.js
      │  ├─ MapPreview.js
      │  └─ PlaceItem.js
      ├─ css
      │  └─ Colors.js
      ├─ helpers
      │  └─ db.js
      ├─ env.js
      ├─ models
      │  └─ place.js
      ├─ navigation
      │  └─ PlacesNavigator.js
      ├─ package-lock.json
      ├─ package.json
      ├─ screens
      │  ├─ MapScreen.js
      │  ├─ NewPlaceScreen.js
      │  ├─ PlaceDetailScreen.js
      │  └─ PlacesListScreen.js
      └─ store
        └─ places.js
    ```

<h2 id='components'>Components</h2>

[Go Back to Summary](#summary)

-   In the components folder, we are going to create the basic components

<h3 id='customheaderbutton'>Custom Header Button</h3>

[Go Back to Summary](#summary)

-   With the help of **HeaderButton** from `react-navigation-header-buttons`, we can create our custom header button, this button is usually the top right button. Because the top left button is commonly used to goBack() to the previous screen

    -   THe **HeaderButton** accepts the following properties
        -   `IconComponent` - we are going to use icons from `@expo/vector-icons`
        -   `iconSize`
        -   `color` - in our case we use the `Platform` from react-native to distinguish between iOS and android, and apply the respective color

    ```JavaScript
      import { Ionicons } from '@expo/vector-icons';
      import React from 'react';
      import { Platform } from 'react-native';
      import { HeaderButton } from 'react-navigation-header-buttons';
      import Colors from '../css/Colors';

      function CustomHeaderButton(props) {
          return (
              <HeaderButton
                  {...props}
                  IconComponent={Ionicons}
                  iconSize={23}
                  color={Platform.OS === 'android' ? 'white' : Colors.primary}
              />
          );
      }

      export default CustomHeaderButton;
    ```

<h3 id='placeitem'>Place Item</h3>

[Go Back to Summary](#summary)

-   another custom component to display the places

    -   In this component we are receiving from our parent component the following properties/methods
        -   onSelect
        -   image
        -   title
        -   address
        -

    ```JavaScript
      import React from 'react';
      import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
      import Colors from '../css/Colors';

      function PlaceItem({ onSelect, image, title, address }) {
          return (
              <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
                  <Image style={styles.image} source={{ uri: image }} />
                  <View style={styles.infoContainer}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.address}>{address}</Text>
                  </View>
              </TouchableOpacity>
          );
      }

      const styles = StyleSheet.create({
          placeItem: {
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingVertical: 15,
              paddingHorizontal: 30,
              flexDirection: 'row',
              alignItems: 'center',
          },
          image: {
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: '#ccc',
              borderColor: Colors.primary,
              borderWidth: 1,
          },
          infoContainer: {
              marginLeft: 25,
              width: 250,
              justifyContent: 'center',
              alignItems: 'flex-start',
          },
          title: {
              color: 'black',
              fontSize: 18,
              marginBottom: 5,
          },
          address: {
              color: '#666',
              fontSize: 16,
          },
      });

      export default PlaceItem;
    ```

<h2 id='css'>CSS</h2>

[Go Back to Summary](#summary)

-   in `css/Colors.js`

    -   We named the folder as `css` but you can name it whatever you want, just remember that this is an object of constants

    ```JavaScript
      export default {
          primary: '#fc9208',
      };
    ```

<h2 id='models'>Models</h2>

[Go Back to Summary](#summary)

-   in `models/place.js`

    -   We are going to create our place's blueprint using a `class`

    ```JavaScript
      class Place {
          constructor(id, title, imageUri, address, lat, lng) {
              this.id = id;
              this.title = title;
              this.imageUri = imageUri;
              this.address = address;
              this.lat = lat;
              this.lng = lng;
          }
      }

      export default Place;
    ```

<h2 id='navigation'>Navigation</h2>

[Go Back to Summary](#summary)

-   in `navigation/PlacesNavigator.js`

    -   This is our main App, where we can structure all the stacks and default configurations

    ```JavaScript
      import { Platform } from 'react-native';
      import { createAppContainer } from 'react-navigation';
      import { createStackNavigator } from 'react-navigation-stack';
      import Colors from '../css/Colors';
      import MapScreen from '../screens/MapScreen';
      import NewPlaceScreen from '../screens/NewPlaceScreen';
      import PlaceDetailScreen from '../screens/PlaceDetailScreen';
      import PlacesListScreen from '../screens/PlacesListScreen';

      const PlacesNavigator = createStackNavigator(
          {
              Places: PlacesListScreen,
              PlaceDetail: PlaceDetailScreen,
              NewPlace: NewPlaceScreen,
              Map: MapScreen,
          },
          {
              defaultNavigationOptions: {
                  headerStyle: {
                      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                  },
                  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
              },
          },
      );

      export default createAppContainer(PlacesNavigator);
    ```

<h2 id='screens'>Screens</h2>

[Go Back to Summary](#summary)

-   in the screens' folder, we have all our screens of our app
    -   MapScreen
    -   NewPlaceScreen
    -   PlaceDetailScreen
    -   PlacesListScreen
-   all these screens are imported into the `PlacesNavigator` so we can use in our stackNavigator

<h2 id='redux'>Redux / Redux-Thunk</h2>

<h3 id='actionsreducer'>Actions & Reducers</h3>

[Go Back to Summary](#summary)

-   In `store/places.js`

    -   We have all the **actions** and **reducer** related to the place redux

    ```JavaScript
      const ADD_PLACE = 'ADD_PLACE';
      import Place from '../models/place';

      export const addPlace = (title) => {
          return {
              type: ADD_PLACE,
              placeData: {
                  title,
              },
          };
      };

      const initialState = {
          places: [],
      };

      const placesReducer = (state = initialState, action) => {
          switch (action.type) {
              case ADD_PLACE:
                  const newPlace = new Place(new Date().toString(), action.placeData.title);
                  return {
                      places: state.places.concat(newPlace),
                  };
              default:
                  return state;
          }
      };

      export default placesReducer;
    ```

<h3 id='connectredux'>Connect Redux</h3>

[Go Back to Summary](#summary)

-   in `App.js`

    -   We combine our reducers, create our store, and connect the store with our main app from the `navigation` folder

    ```JavaScript
      import React from 'react';
      import { Provider } from 'react-redux';
      import { applyMiddleware, combineReducers, createStore } from 'redux';
      import ReduxThunk from 'redux-thunk';
      import PlacesNavigator from './navigation/PlacesNavigator';
      import placesReducer from './store/places';

      const rootReducer = combineReducers({
          places: placesReducer,
      });

      const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

      export default function App() {
          return (
              <Provider store={store}>
                  <PlacesNavigator />
              </Provider>
          );
      }
    ```

<h1 id='env'>Environment Variables</h1>

[Go Back to Summary](#summary)

-   In our `env.js`

    -   We are going to export an object with our googleAPiKey
    -   Before exporting, we can create a function to check if we are in development mode or production mode, then return its respective key.

        -   We can do this by checking `__DEV__`

        ```JavaScript
          const variables = {
              development: {
                  googleApiKey: 'AIzaSyDGaD8fasdXLdQ7uUQcfasdf2X3uOU72c8',
              },
              production: {
                  googleApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              },
          };

          const getEnvVariables = () => {
              if (__DEV__) {
                  return variables.development;
              }
              return variables.production;
          };

          export default getEnvVariables;
        ```

<h1 id='expofeatures'>Expo - Features</h1>

[Go Back to Summary](#summary)

-   with expo we have access to a bunch of features such as camera, audio, accelerometer.... out of the box
-   [Expo Official Docs](https://docs.expo.io/versions/latest/)

<h2 id='imagepicker'>Image Picker</h2>

[Go Back to Summary](#summary)

-   in `components/ImgPicker.js`
-   Since our app only cares about the getting the image we can use the

    ```Bash
      expo install expo-image-picker
    ```

-   If we need more control about our camera, then we need to use other package

    ```Bash
      expo install expo-camera
    ```

-   File system

    ```Bash
      expo install expo-file-system
      expo install expo-sqlite
      expo install expo-location
    ```

<h2 id='locationpicker'>Location Picker</h2>

[Go Back to Summary](#summary)

-   in `components/LocationPicker.js`
-   To have access to location we need to install another expo package

    ```Bash
      expo install expo-location
    ```

-   in `components/LocationPicker.js`

    -   This component is similar to our `ImagePicker`
        -   We first ask for permission to have access to user's location
        -   Then with the call `.getCurrentPositionAsync()` to get the latitude and longitude

    ```JavaScript
      import * as Location from 'expo-location';
      import * as Permissions from 'expo-permissions';
      import React, { useEffect, useState } from 'react';
      import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
      import Colors from '../css/Colors';
      import MapPreview from './MapPreview';

      function LocationPicker({ navigation, onLocationPicked }) {
          const [isFetching, setIsFetching] = useState(false);
          const [pickedLocation, setPickedLocation] = useState();
          const mapPickedLocation = navigation.getParam('pickedLocation');

          useEffect(() => {
              if (mapPickedLocation) {
                  setPickedLocation(mapPickedLocation);
                  onLocationPicked(mapPickedLocation);
              }
          }, [mapPickedLocation, onLocationPicked]);

          const verifyPermissions = async () => {
              const result = await Permissions.askAsync(Permissions.LOCATION);
              if (result.status !== 'granted') {
                  Alert.alert(
                      'Insufficient permissions!',
                      'You need to grant location permissions to use this app.',
                      [{ text: 'Okay' }],
                  );
                  return false;
              }
              return true;
          };

          const getLocationHandler = async () => {
              const hasPermission = await verifyPermissions();
              if (!hasPermission) return;

              try {
                  setIsFetching(true);
                  const location = await Location.getCurrentPositionAsync({
                      timeInterval: 5000,
                  });
                  setPickedLocation({
                      lat: location.coords.latitude,
                      lng: location.coords.longitude,
                  });
                  onLocationPicked({
                      lat: location.coords.latitude,
                      lng: location.coords.longitude,
                  });
              } catch (error) {
                  Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map', [
                      { text: 'Okay' },
                  ]);
              }
              setIsFetching(false);
          };

          const pickOnMapHandler = () => {
              navigation.navigate('Map');
          };

          return (
              <View style={styles.locationPicker}>
                  <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
                      {isFetching ? (
                          <ActivityIndicator size="large" color={Colors.primary} />
                      ) : (
                          <Text>No location chosen yet!</Text>
                      )}
                  </MapPreview>
                  <View style={styles.actions}>
                      <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
                      <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
                  </View>
              </View>
          );
      }

      const styles = StyleSheet.create({
          locationPicker: {
              marginBottom: 15,
          },
          mapPreview: {
              marginBottom: 10,
              width: '100%',
              height: 150,
              borderColor: '#ccc',
              borderWidth: 1,
          },
          actions: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
          },
      });

      export default LocationPicker;
    ```

-   in `components/ImgPicker.js`
-   we need to import **ImagePicker** from `expo-image-picker`, so we can access to extra features such as cropping the image
-   and **Permissions** from `expo-permissions`, for our case we need access to user's camera

    -   To ask the user's permissions, we have a method from `expo-permission` called `.askAsync()`, it's an async method and we pass the permissions that we need access
        -   For iOS we need to to request access to **Permissions.CAMERA_ROLL** and **Permissions.CAMERA**
        -   For android just **Permissions.CAMERA_ROLL** is enough
    -   With de permission granted, we then can launch the camera `launchCameraAsync()` from `ImagePicker`, we can pass an object as argument, in this object we can configure some extra features to edit the image such as `allowsEditing`, `aspect`, `quality`

    ```JavaScript
      import * as ImagePicker from 'expo-image-picker';
      import * as Permissions from 'expo-permissions';
      import React, { useState } from 'react';
      import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
      import Colors from '../css/Colors';

      function ImgPicker({ onImageTaken }) {
          const [pickedImage, setPickedImage] = useState();

          const verifyPermissions = async () => {
              const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
              if (result.status !== 'granted') {
                  Alert.alert(
                      'Insufficient permissions!',
                      'You need to grant camera permissions to use this app.',
                      [{ text: 'Okay' }],
                  );
                  return false;
              }
              return true;
          };

          const takeImageHandler = async () => {
              const hasPermission = await verifyPermissions();
              if (!hasPermission) return;
              const image = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 0.5,
              });

              setPickedImage(image.uri);
              onImageTaken(image.uri);
          };

          return (
              <View style={styles.imagePicker}>
                  <View style={styles.imagePreview}>
                      {!pickedImage ? (
                          <Text>No image picked yet.</Text>
                      ) : (
                          <Image style={styles.image} source={{ uri: pickedImage }} />
                      )}
                  </View>
                  <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
              </View>
          );
      }

      const styles = StyleSheet.create({
          imagePicker: {
              alignItems: 'center',
          },
          imagePreview: {
              width: '100%',
              height: 200,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#ccc',
              borderWidth: 1,
          },
          image: {
              width: '100%',
              height: '100%',
          },
      });

      export default ImgPicker;
    ```

<h2 id='mappreview'>Map Preview</h2>

[Go Back to Summary](#summary)

-   in `components/MapPreview.js`
-   With the location configured (`LocationPicker`) we then can configure a preview of the map
-   First we need to get a google api key from [google's api](https://console.cloud.google.com/) to have access to geo location and map.
-   To display the map we can use an `Image` component from `react-native`

    ```JavaScript
      import React from 'react';
      import { Image, StyleSheet, TouchableOpacity } from 'react-native';
      import ENV from '../env';

      function MapPreview(props) {
          let imagePreviewUrl;

          if (props.location) {
              imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${
                  props.location.lng
              }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${
                  props.location.lng
              }&key=${ENV().googleApiKey}`;
          }

          return (
              <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
                  {props.location ? (
                      <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
                  ) : (
                      props.children
                  )}
              </TouchableOpacity>
          );
      }

      const styles = StyleSheet.create({
          mapPreview: {
              justifyContent: 'center',
              alignItems: 'center',
          },
          mapImage: {
              width: '100%',
              height: '100%',
          },
      });

      export default MapPreview;
    ```

<h1 id='localdb'>Local Database - SQLite</h1>

<h2 id='database'>Create Database</h2>

[Go Back to Summary](#summary)

-   [SQLite](https://docs.expo.io/versions/latest/sdk/sqlite/) is a local database for android/iOS

    ```Bash
      expo install expo-sqlite
    ```

-   in `helpers/db.js`

    -   import **SQLite** from `expo-sqlite`
    -   then open/create the database
        -   `const db = SQLite.openDatabase('places.db');`
        -   if the database doesn't exist, SQLite will create one
    -   after accessing the database
        -   we then initialize/create our table
    -   SQLite has a method called `transaction()` that takes a function as an argument which gives us access to the transaction object
        -   The idea of `transaction` is to guarantee that our query is executed as a whole, if some part of the query fails, the whole process stops to avoid us ending up with corrupted data. That's why we wrap all of query with the `transaction`
    -   To insert a new place, SQLite help us to protect our database from attacks (injecting malicious code to run other codes)

        ```JavaScript
          export const insertPlace = (title, imageUri, address, lat, lng) => {
              const promise = new Promise((resolve, reject) => {
                  db.transaction((tx) => {
                      tx.executeSql(
                          `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                          [title, imageUri, address, lat, lng],
                          (_, data) => {
                              resolve(data);
                          },
                          (_, error) => {
                              reject(error);
                          },
                      );
                  });
              });

              return promise;
          };
        ```

        -   We just replace the values with `?`, and then we pass the values for each `?` as and array. The sequel package will validate the information before injecting into the `?`
        -   And then the the last parameter is the callback where
            -   the first argument is the repetitions of the query `_`
            -   the second argument is the `data`

    ```JavaScript
      import * as SQLite from 'expo-sqlite';

      const db = SQLite.openDatabase('places.db');

      export const init = () => {
          const promise = new Promise((resolve, reject) => {
              db.transaction((tx) => {
                  tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                      [],
                      () => {
                          resolve();
                      },
                      (_, error) => {
                          reject(error);
                      },
                  );
              });
          });

          return promise;
      };

      export const insertPlace = (title, imageUri, address, lat, lng) => {
          const promise = new Promise((resolve, reject) => {
              db.transaction((tx) => {
                  tx.executeSql(
                      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                      [title, imageUri, address, lat, lng],
                      (_, data) => {
                          resolve(data);
                      },
                      (_, error) => {
                          reject(error);
                      },
                  );
              });
          });

          return promise;
      };

      export const fetchPlaces = () => {
          const promise = new Promise((resolve, reject) => {
              db.transaction((tx) => {
                  tx.executeSql(
                      `SELECT * FROM places`,
                      [],
                      (_, data) => {
                          resolve(data);
                      },
                      (_, error) => {
                          reject(error);
                      },
                  );
              });
          });

          return promise;
      };
    ```

<h2 id='initdatabase'>Initialize Database - App.js</h2>

[Go Back to Summary](#summary)

```JavaScript
  import React from 'react';
  import { Provider } from 'react-redux';
  import { applyMiddleware, combineReducers, createStore } from 'redux';
  import ReduxThunk from 'redux-thunk';
  import { init } from './helpers/db';
  import PlacesNavigator from './navigation/PlacesNavigator';
  import placesReducer from './store/places';

  init()
      .then(() => {
          console.log('Initializing database');
      })
      .catch((error) => {
          console.log('Initializing database failed');
          console.log(error);
      });

  const rootReducer = combineReducers({
      places: placesReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  export default function App() {
      return (
          <Provider store={store}>
              <PlacesNavigator />
          </Provider>
      );
  }
```

<h2 id='updateredux'>Update Redux</h2>

[Go Back to Summary](#summary)

-   Update our redux store to use our local database to fetch or add new places

    ```JavaScript
      const ADD_PLACE = 'ADD_PLACE';
      const SET_PLACES = 'SET_PLACES';
      import * as FileSystem from 'expo-file-system';
      import ENV from '../env';
      import { fetchPlaces, insertPlace } from '../helpers/db';
      import Place from '../models/place';

      export const loadPlaces = () => {
          try {
              return async (dispatch) => {
                  const dbResult = await fetchPlaces();

                  dispatch({
                      type: SET_PLACES,
                      places: dbResult.rows._array,
                  });
              };
          } catch (error) {
              console.log(error);
              throw error;
          }
      };

      export const addPlace = (title, imageUri, location) => {
          return async (dispatch) => {
              const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${
                      ENV().googleApiKey
                  }`,
              );

              if (!response.ok) {
                  throw new Error('Something went wrong');
              }

              const resData = await response.json();

              if (!resData.results) {
                  throw new Error('Something went wrong');
              }

              const address = resData.results[0].formatted_address;
              const fileName = imageUri.split('/').pop();
              const newPath = FileSystem.documentDirectory + fileName;

              try {
                  await FileSystem.moveAsync({
                      from: imageUri,
                      to: newPath,
                  });

                  const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);

                  dispatch({
                      type: ADD_PLACE,
                      placeData: {
                          id: dbResult.insertId,
                          title,
                          imageUri: newPath,
                          address,
                          coords: {
                              lat: location.lat,
                              lng: location.lng,
                          },
                      },
                  });
              } catch (error) {
                  console.log(error);
                  throw error;
              }
          };
      };

      const initialState = {
          places: [],
      };

      const placesReducer = (state = initialState, action) => {
          switch (action.type) {
              case SET_PLACES:
                  return {
                      places: action.places.map(
                          (place) =>
                              new Place(
                                  place.id.toString(),
                                  place.title,
                                  place.imageUri,
                                  place.address,
                                  place.lat,
                                  place.lng,
                              ),
                      ),
                  };
              case ADD_PLACE:
                  const newPlace = new Place(
                      action.placeData.id.toString(),
                      action.placeData.title,
                      action.placeData.imageUri,
                      action.placeData.address,
                      action.placeData.coords.lat,
                      action.placeData.coords.lng,
                  );
                  return {
                      places: state.places.concat(newPlace),
                  };
              default:
                  return state;
          }
      };

      export default placesReducer;
    ```

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
      touch -n components/CustomHeaderButton.js + PlaceItem.js
      touch -n css/Colors.js
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
      │  └─ splash.png
      ├─ babel.config.js
      ├─ components
      │  ├─ CustomHeaderButton.js
      │  └─ PlaceItem.js
      ├─ css
      │  └─ Colors.js
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
              constructor(id, title) {
                  this.id = id;
                  this.title = title;
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

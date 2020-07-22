<h1 id='summary'>Summary</h1>

-   [Start a New Project](#newproject)
-   [Third-party Library - Navigation](#thirdpartylibrary)
-   [Packages](#installnav3)
-   [Create Folders and Files](#folderfiles3)
-   [Start Build Our App](#startourapp3)
    -   [App.js](#app31)
    -   [Meals Navigation](#navigation3)
    -   [CategoriesScreen.js](#categoriesscreen3)
-   [Shop App](#shopapp)
    -   [Packages](#packages)
    -   [Folder and Files](#folderfiles)
    -   [Constants - Global "CSS"](#css)
    -   [Models - Schema](#models)
    -   [Database - Dummy Data](#database)
    -   [React Redux](#redux)
        -   [Reducers](#reducers)
        -   [Create Redux Store](#createstore)
    -   [Screens - ProductsOverviewScreen](#productsoverviewscreen)
    -   [Shop Navigator](#shopnavigator)
-   [Redux Thunk](#reduxthunk)
    -   [Package](#thunkpackage)
    -   [Config Redux Thunk](#configthunk)
        -   [Config - App.js](#appjs)
        -   [Use Redux Thunk - Actions](#usethunk)
-   [Authentication](#auth)
    -   [When The App Launches](#whenapplaunches)
        -   [Authentication Screen](#authscreen)
    -   [Auth Config](#actionauth)
-   [Local Storage - AsyncStorage](#localstorage)
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

<h1 id='newproject'>Start a New Project</h1>

[Go Back to Summary](#summary)

```Bash
  expo init 1_rn_first_app
```

-   During the creation of your new project
    -   Choose a template: `blank`
        -   If we choose `bare-mininum` it won't config expo
-   CD to `1_rn_first_app`
-   run `npm start`
    -   It will start the expo development tool

<h1 id='thirdpartylibrary'>Third-party Library - Navigation</h1>

[Go Back to Summary](#summary)

-   Let's install a third-party library to help us to easily navigate and add animations between screens.

-   Import the fonts from `./assets/fonts/`

    ```JavaScript
      import * as Front from 'expo-font'
    ```

    -   If the library is not working we have to manually install it
    -   `npm i expo-font`

-   Import the ` AppLoading`` from `expo` to prolong the splash screen when the app starts until our fonts are loaded

<h2 id='installnav3'>Packages</h2>

[Go Back to Summary](#summary)

```Bash
  npm i react-navigation
```

-   then we need to stall a bunch of dependencies, just like we can find in the docs

    ```Bash
      expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
    ```

-   React Navigation v4 or higher, we need to install the different navigators which so we can use `StackNavigator`, `DrawerNavigator`, `TabsNavigator` separately.

    ```Bash
      npm install --save react-navigation-stack
    ```

<h2 id='folderfiles3'>Create Folders and Files</h2>

[Go Back to Summary](#summary)

-   Create folders and files

    ```Bash
      ├─ 3_Meals_App
      │  ├─ .expo
      │  │  ├─ packager-info.json
      │  │  └─ settings.json
      │  ├─ .expo-shared
      │  │  └─ assets.json
      │  ├─ App.js
      │  ├─ app.json
      │  ├─ assets
      │  │  ├─ fonts                    <--- New
      │  │  │  ├─ OpenSans-Bold.ttf     <--- New
      │  │  │  └─ OpenSans-Regular.ttf  <--- New
      │  │  ├─ icon.png
      │  │  └─ splash.png
      │  ├─ babel.config.js
      │  ├─ components                  <--- New
      │  ├─ navigation                  <--- New
      │  │  └─ MealsNavigation.js       <--- New
      │  ├─ package-lock.json
      │  ├─ package.json
      │  └─ screens                     <--- New
      │     ├─ CategoriesScreen.js      <--- New
      │     ├─ CategoryMealsScreen.js   <--- New
      │     ├─ FavoritesScreen.js       <--- New
      │     ├─ FiltersScreen.js         <--- New
      │     └─ MealDetailScreen.js      <--- New
      └─ LICENSE
    ```

<h2 id='startourapp3'>Start Build Our App</h2>

<h3 id='app31'>App.js</h3>

[Go Back to Summary](#summary)

-   Import

    ```JavaScript
      import * as Font from 'expo-font';
      import { AppLoading } from 'expo';
    ```

-   Then create an external object (outside of our `App` function) so this object won't be rendered every time our component renders

    -   Load our fonts

        ```JavaScript
          const fetchFonts = () => {
              Font.loadAsync({
                  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
              });
          };
        ```

-   Then we create an `useState` to check if our fonts were completed loaded, and we use `AppLoading` to prolong our splash screen

    -   We assign the `startAsync` to fetch our fonts, AppLoading is a promise, then we can assign `onFinish` to execute an action once this promise is resolved

        ```JavaScript
          const [fontLoaded, setFontLoaded] = useState(false);

          if (!fontLoaded) {
              return <AppLoading startAsync={fetchFonts} onFinish={setFontLoaded(true)} />;
          }
        ```

-   In the end we will have a structure like this:

    ```JavaScript
      import React, { useState } from 'react';
      import { StyleSheet, Text, View } from 'react-native';
      import * as Font from 'expo-font';
      import { AppLoading } from 'expo';

      const fetchFonts = () => {
          Font.loadAsync({
              'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
              'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
          });
      };

      export default function App() {
          const [fontLoaded, setFontLoaded] = useState(false);

          if (!fontLoaded) {
              return <AppLoading startAsync={fetchFonts} onFinish={setFontLoaded(true)} />;
          }

          return (
              <View>
                  <Text>Open up App.js to start working on your app!</Text>
              </View>
          );
      }
    ```

<h3 id='navigation3'>Meals Navigation</h3>

[Go Back to Summary](#summary)

-   in `navigation/MealsNavigation.js`

    -   We have to import `createStackNavigator` from `react-navigator-stack`

        -   Then we need to call `createStackNavigator`, it takes at least on argument (a JS object) where we configure the different screens that we want to move between.
        -   The object is a key/value pairs, and the convention is to capitalize the first letter of the key
            -   The key could be andy name of our choice
            -   The value, is a pointer to the screen that we want to load for this screen
                -   To to that we have to import the screen then we map to the key
            -   All component mapped in our `createStackNavigator` gets a special prop passed in automatically
                -   **Just the top level, not nested components**
                -   i.e `navigate, pop, popToTop, push, replace, reset,`
        -   `createStackNavigator` returns a navigation container and it's a react component, so we can assign to a variable

    -   Then we need to add `createAppContainer` (createAppContainer is **always** imported from `react-navigation` no matter what version we are using).

        -   We need to wrap our navigator with the `createAppContainer`

    ```JavaScript
      import { createStackNavigator } from 'react-navigation-stack';

      import CategoriesScreen from '../screens/CategoriesScreen';
      import CategoryMealsScreen from '../screens/CategoryMealsScreen';
      import MealDetailScreen from '../screens/MealDetailScreen';
      import { createAppContainer } from 'react-navigation';

      const MealsNavigator = createStackNavigator({
          Categories: CategoriesScreen,
          CategoryMeals: {
              screen: CategoryMealsScreen
          },
          MealDetail: MealDetailScreen
      });

      export default createAppCon
    ```

-   in `App.js`

    -   We import the `MealsNavigation` component, and use this component in our `return`

        -   We also don't need the `import { StyleSheet, Text, View } from 'react-native';` since we are not building anything on this screen

        ```JavaScript
          import React, { useState } from 'react';
          import * as Font from 'expo-font';
          import { AppLoading } from 'expo';

          import MealsNavigation from './navigation/MealsNavigation';

          const fetchFonts = () => {
              Font.loadAsync({
                  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
                  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
              });
          };

          export default function App() {
              const [fontLoaded, setFontLoaded] = useState(false);

              if (!fontLoaded) {
                  return <AppLoading startAsync={fetchFonts} onFinish={setFontLoaded(true)} />;
              }

              return <MealsNavigation />;
          }
        ```

<h3 id='categoriesscreen3'>CategoriesScreen.js</h3>

[Go Back to Summary](#summary)

```JavaScript
  import React from 'react';
  import { View, Text, StyleSheet, Button } from 'react-native';

  function CategoriesScreen({ navigation }) {
      return (
          <View style={styles.screen}>
              <Text style={styles.stylesText}>CategoriesScreen</Text>
              <Button
                  title="Go to Meals!"
                  onPress={() => {
                      navigation.navigate({ routeName: 'CategoryMeals' });
                  }}
              />
          </View>
      );
  }

  const styles = StyleSheet.create({
      screen: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      },
      stylesText: {}
  });

  export default CategoriesScreen;
```

-   The `navigation` props, has a `navigate` method (The most important method) that we can navigate to a specific route

    -   `navigate` takes an object as an argument, and this object we can set up the route name to which we want to navigate
    -   the `routeName` has to be one of the route names that we specified in `navigation/MealsNavigation.js`
        -   Then we point to a the route as a string

-   `pushing, popping & replacing`

    -   an alternative to `navigation.navigate()` we could use `navigation.push('CategoryMeals')`
        -   This allows us to render the same screen over and over again, this is useful when the screen is the same, but we want to change the content (like a folder)
        -   `.goBack()`, `.pop`, `.goToTop()` `.replace()`
    -   [Oficial Docs](https://reactnavigation.org/docs/4.x/navigation-prop)

<h1 id='shopapp'>Shop App</h1>

<h2 id='packages'>Packages</h2>

[Go Back to Summary](#summary)

-   Create a new react native app

    ```Bash
      expo init 4_rn_shop_app
    ```

-   Install

    ```Bash
      npm i redux react-redux
        react-navigation
        react-navigation-header-buttons
        react-navigation-stack
        @expo/vector-icons
        react-navigation-drawer
        moment
      expo install react-native-gesture-handler
        react-native-reanimated
        react-native-screens
        react-native-safe-area-context
        @react-native-community/masked-view
        expo-font
      npm i --save-dev redux-devtools-extension
    ```

    -   `moment` so we can use a nice date format like `June 5, 2020, 12:15 PM`, that is not supported by the android engine.

<h2 id='folderfiles'>Folder and Files</h2>

[Go Back to Summary](#summary)

-   Create the following folder structure

    ```Bash
      mkdir components css navigation screens screens/shop screens/user store store/actions store/reducers models database assets/fonts
    ```

-   Create the following files

    ```Bash
      touch css/Colors.js screens/shop/ProductsOverviewScreen.js screens/shop/ProductDetailsScreen.js screens/shop/CartScreen.js screens/shop/OrdersScreen.js screens/user/UserProductsScreen.js screens/user/EditProductScreen.js store/actions/product.js store/reducers/product.js store/actions/users.js store/reducers/users.js models/products.js models/users.js database/dummy-data.js navigation/ShopNavigator.js
    ```

-   Folder structure

    ```Bash
        4_Shop_App
        ├─ App.js
        ├─ app.json
        ├─ assets
        │  ├─ icon.png
        │  └─ splash.png
        ├─ babel.config.js
        ├─ components
        ├─ css
        │  └─ Colors.js
        ├─ database
        │  └─ dummy-data.js
        ├─ models
        │  ├─ product.js
        │  └─ user.js
        ├─ navigation
        │  └─ ShopNavigator.js
        ├─ package-lock.json
        ├─ package.json
        ├─ screens
        │  ├─ shop
        │  │  ├─ CartScreen.js
        │  │  ├─ OrdersScreen.js
        │  │  ├─ ProductDetailsScreen.js
        │  │  └─ ProductsOverviewScreen.js
        │  └─ user
        │     ├─ EditProductScreen.js
        │     └─ UserProductsScreen.js
        └─ store
          ├─ actions
          │  ├─ products.js
          │  └─ users.js
          └─ reducers
              ├─ products.js
              └─ users.js
    ```

<h2 id='css'>Constants - Global "CSS"</h2>

[Go Back to Summary](#summary)

-   in `css/Colors.js`

*   Create one object (css constants) and export as default

    ```JavaScript
      export default {
          primary: '#C2185B',
          accent: '#FFC107',
      };
    ```

<h2 id='models'>Models - Schema</h2>

[Go Back to Summary](#summary)

-   Create a schema of our data, for now it's just a class constructor so we can easily identify how our data is structured.
-   in `models/product.js`

    -   create and export as default our **Product** class

        ```JavaScript
          class Product {
              constructor(id, ownerId, title, imageUrl, description, price) {
                  this.id = id;
                  this.ownerId = ownerId;
                  this.title = title;
                  this.imageUrl = imageUrl;
                  this.description = description;
                  this.price = price;
              }
          }

          export default Product;
        ```

<h2 id='database'>Database - Dummy Data</h2>

[Go Back to Summary](#summary)

-   in `database/dummy-data.js`
    -   Add our dummy data

<h2 id='redux'>React Redux</h2>

<h3 id='reducers'>Reducers</h3>

[Go Back to Summary](#summary)

-   in `store/reducers/products.js`

    -   Create our products reducers, at first we are going to hard code the **ownerId** just to display something when the app loads (just to check if is wired up correctly)
    -   Import our Products data base
    -   Create an initialState (when the app loads)
    -   return just the state

        ```JavaScript
          import PRODUCTS from '../../database/dummy-data';

          const initialState = {
              availableProducts: PRODUCTS,
              userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
          };

          const productsReducer = (state = initialState, action) => {
              switch (action.type) {
                  default:
                      return state;
              }
          };

          export default productsReducer;
        ```

<h3 id='createstore'>Create Redux Store</h3>

[Go Back to Summary](#summary)

-   in `App.js`

    -   Import **createStore** and **combineReducers** from `redux`
    -   Import **Provider** from `react-redux`
    -   Import the products reducer
        -   Combine the reducers with `combineReducers` and assign to a new variable (rootReducer)
            -   Create the store with `createStore` and pass the **rootReducer**
                -   For last, wrap our main app with **Provider** component and connect store
    -   Import **AppLoading** from `expo`
        -   So we can await for the app to load all the dependencies (fonts)
    -   Import custom Fonts with `expo-font`
    -   Import **composeWithDevTools** from `redux-devtools-extension`
        -   We use the `redux-devtools-extension` with **React Native Debugger**

    ```JavaScript
      import React from 'react';
      import { createStore, combineReducers } from 'redux';
      import { Provider } from 'react-redux';
      import { AppLoading } from 'expo';
      import * as Font from 'expo-font';
      import { composeWithDevTools } from 'redux-devtools-extension'

      import productsReducer from './store/reducers/products';
      import ShopNavigator from './navigation/ShopNavigator';

      const rootReducer = combineReducers({
          products: productsReducer,
      });

      const store = createStore(rootReducer, composeWithDevTools());

      const fetchFonts = () => {
          return Font.loadAsync({
              'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
              'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          });
      };

      export default function App() {
          const [fontLoaded, setFontLoaded] = useState(false);

          if (!fontLoaded) {
              return (
                  <AppLoading
                      startAsync={fetchFonts}
                      onFinish={() => {
                          setFontLoaded(true);
                      }}
                  />
              );
          }

          return (
              <Provider store={store}>
                  <ShopNavigator />
              </Provider>
          );
      }
    ```

<h2 id='productsoverviewscreen'>Screens - ProductsOverviewScreen</h2>

[Go Back to Summary](#summary)

-   Create our first screen just to display the dummy data, to test our redux
-   in `screens/shop/ProductsOverviewScreen.js`

    -   Import **useSelector** hook from `react-redux` to get data form the store
    -   Import **FlatList** from `react-native` (alternative for `.map()`)
        -   With **FlatList** we have to pass 2~3 properties
            -   1st - is our data (`data={array_of_data}`)
            -   2nd - optional for the newer version of react (`keyExtractor={(item) => item.id}`)
                -   This is used for old versions of react where we need to extract the unique id
                -   The newer version we don't need to that anymore
            -   3rd - `renderItem{(itemData) => ...}`
    -   Add **navigationOptions** to the `ProductsOverviewScreen` component
        -   Where we can define the `headerTitle` for this specific screen

    ```JavaScript
      import React from 'react';
      import { Text, FlatList } from 'react-native';
      import { useSelector } from 'react-redux';

      function ProductsOverviewScreen(props) {
          const products = useSelector((state) => state.products.availableProducts);

          return (
              <FlatList
                  data={products}
                  keyExtractor={(item) => item.id}
                  renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
              />
          );
      }

      ProductsOverviewScreen.navigationOptions = {
          headerTitle: 'All Products',
      };

      export default ProductsOverviewScreen;
    ```

<h2 id='shopnavigator'>Shop Navigator</h2>

[Go Back to Summary](#summary)

-   in `navigation/ShopNavigator.js`

    -   Create our stack navigator for our app

        -   Import **createStackNavigator** from `react-navigation-stack`
            -   This we have to use from `...-stack`, older versions uses from `react-navigation`
        -   Import **createAppContainer** from `react-navigation`
        -   Import **Platform** from `react-native`, so we can differentiate the OS to use a custom style
        -   Import our screens (for now just `ProductsOverviewScreen`)
        -   Create our stack navigator and assign to a variable, the **createStackNavigator** returns a react component (our variable `ProductsNavigator`)
            -   the first argument is an object where we define all the screen names
                -   We could also define the style here, for that specific component, but for now we are going to use the default options
            -   the second argument is an object where we can define our **defaultNavigationOptions**
                -   Where we can define custom styles for our screens
        -   For last we create our app using **createAppContainer** and pass our `ProductsNavigator`

    ```JavaScript
      import { createStackNavigator } from 'react-navigation-stack';
      import { createAppContainer } from 'react-navigation';
      import { Platform } from 'react-native';

      import Colors from '../css/Colors';

      import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

      const ProductsNavigator = createStackNavigator(
          {
              ProductsOverview: ProductsOverviewScreen,
          },
          {
              defaultNavigationOptions: {
                  headerStyle: {
                      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                  },
                  headerTitleStyle: {
                      fontFamily: 'open-sans-bold',
                  },
                  headerBackTitleStyle: {
                      fontFamily: 'open-sans',
                  },
                  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
              },
          },
      );

      export default createAppContainer(ProductsNavigator);
    ```

<h1 id='reduxthunk'>Redux Thunk</h1>

<h2 id='thunkpackage'>Package</h2>

[Go Back to Summary](#summary)

```Bash
  npm i redux-thunk
```

<h2 id='configthunk'>Config Redux Thunk</h2>

<h3 id='appjs'>Config - App.js</h3>

[Go Back to Summary](#summary)

-   In `App.js`

    -   Import ReduxThunk from `redux-thunk`
        -   **ReduxThunk** can be any name
    -   Import **applyMiddleware** from `redux`
        -   In **createStore** pass the **applyMiddleware** as a second argument and pass it **ReduxThunk**

    ```JavaScript
      import React, { useState } from 'react';
      import { createStore, combineReducers, applyMiddleware } from 'redux';
      import { Provider } from 'react-redux';
      import { AppLoading } from 'expo';
      import * as Font from 'expo-font';
      import ReduxThunk from 'redux-thunk';

      import productsReducer from './store/reducers/products';
      import cartReducer from './store/reducers/cart';
      import ordersReducer from './store/reducers/orders';
      import ShopNavigator from './navigation/ShopNavigator';

      const rootReducer = combineReducers({
          ...
      });

      const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

      const fetchFonts = () => {
          ...
      };

      export default function App() {
          ...
      }
    ```

<h3 id='usethunk'>Use Redux Thunk - Actions</h3>

[Go Back to Summary](#summary)

-   in `store/actions/orders.js`
-   Redux thunk already gives us a **dispatch** function by default
-   We can use the dispatch function to update our store after executing an async code (api calls)

    ```JavaScript

      import Order from '../../models/order';
      export const ADD_ORDER = 'ADD_ORDER';
      export const SET_ORDERS = 'SET_ORDERS';

      export const fetchOrders = () => {
          try {
              return async (dispatch) => {
                  const response = await fetch('https://react-native-7b3b3.firebaseio.com/orders/u1.json');

                  if (!response.ok) {
                      throw new Error('Something went wrong!');
                  }

                  const resData = await response.json();
                  const loadedOrders = [];

                  for (const key in resData) {
                      loadedOrders.push(
                          new Order(
                              key,
                              resData[key].cartItems,
                              resData[key].totalAmount,
                              new Date(resData[key].date),
                          ),
                      );
                  }

                  dispatch({
                      type: SET_ORDERS,
                      orders: loadedOrders,
                  });
              };
          } catch (error) {
              throw error;
          }
      };

      export const addOrder = (cartItems, totalAmount) => {
          try {
              const date = new Date().toISOString();

              return async (dispatch) => {
                  const response = await fetch('https://react-native-7b3b3.firebaseio.com/orders/u1.json', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ cartItems, totalAmount, date }),
                  });

                  if (!response.ok) {
                      throw new Error('Something went wrong!');
                  }

                  const resData = await response.json();

                  dispatch({
                      type: ADD_ORDER,
                      orderData: {
                          id: resData.name,
                          items: cartItems,
                          amount: totalAmount,
                          date,
                      },
                  });
              };
          } catch (error) {
              throw error;
          }
      };
    ```

<h1 id='auth'>Authentication</h1>

<h2 id='whenapplaunches'>When The App Launches</h2>

[Go Back to Summary](#summary)

-   In `navigation/ShopNavigation`

    -   Import **createSwitchNavigator** from `react-navigation`
        -   This function will help use to authenticate the user with our backend
        -   This screen has a special behavior that it doesn't allow us to go back to the log in screen if you just logged in
    -   First we need to create a new stack navigator to our auth screen
    -   Then create a new navigator (`MainNavigator`) using `createSwitchNavigator`
        -   `createSwitchNavigator` takes an object, and there we bind our:
            -   **Auth** screen / auth stack
            -   **Shop** shop stack
        -   Auth screen will be rendered as our first screen
    -   Update our **createAppContainer** to use our new **MainNavigator** stack

        ```JavaScript
            import React from 'react';
            import { createStackNavigator } from 'react-navigation-stack';
            import { createAppContainer, createSwitchNavigator } from 'react-navigation';
            import { createDrawerNavigator } from 'react-navigation-drawer';
            import { Platform } from 'react-native';
            import { Ionicons } from '@expo/vector-icons';

            import Colors from '../css/Colors';

            import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
            import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
            import CartScreen from '../screens/shop/CartScreen';
            import OrdersScreen from '../screens/shop/OrdersScreen';
            import UserProductsScreen from '../screens/user/UserProductsScreen';
            import EditProductScreen from '../screens/user/EditProductScreen';
            import AuthScreen from "../screens/user/AuthScreen";

            const defaultNavOptions = {
                ...
            };

            const ProductsNavigator = createStackNavigator(
                ...
            );

            const OrdersNavigator = createStackNavigator(
                ...
            );

            const AdminNavigator = createStackNavigator(
                ...
            );

            const AuthNavigator = createStackNavigator({
                Auth: AuthScreen
            })

            const ShopNavigator = createDrawerNavigator(
                ...
            );

            const MainNavigator = createSwitchNavigator({
                Auth: AuthNavigator,
                Shop: ShopNavigator
            })

            export default createAppContainer(MainNavigator);
        ```

<h3 id='authscreen'>Authentication Screen</h3>

[Go Back to Summary](#summary)

-   create a new file `screens/users/AuthScreen.js` to handle handle the login/sign up form

    -   After a successful login, the user will be redirect to the "Shop" screen

        ```JavaScript
            import React, { useState, useReducer, useCallback, useEffect } from 'react';
            import {
                View,
                StyleSheet,
                ScrollView,
                KeyboardAvoidingView,
                Button,
                ActivityIndicator,
                Alert,
            } from 'react-native';
            import { LinearGradient } from 'expo-linear-gradient';
            import { useDispatch } from 'react-redux';

            import Input from '../../components/UI/Input';
            import Card from '../../components/UI/Card';
            import Colors from '../../css/Colors';
            import * as authActions from '../../store/actions/auth';

            const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

            const formReducer = (state, action) => {
                switch (action.type) {
                    case FORM_INPUT_UPDATE:
                        const updatedValues = {
                            ...state.inputValues,
                            [action.input]: action.value,
                        };
                        const updatedValidities = {
                            ...state.inputValidities,
                            [action.input]: action.isValid,
                        };
                        let updatedFormIsValid = true;

                        for (const key in updatedValidities) {
                            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
                        }

                        return {
                            formIsValid: updatedFormIsValid,
                            inputValidities: updatedValidities,
                            inputValues: updatedValues,
                        };
                    default:
                        return state;
                }
            };

            function AuthScreen({ navigation }) {
                const [isSignup, setIsSignup] = useState(false);
                const [isLoading, setIsLoading] = useState(false);
                const [error, setError] = useState();
                const dispatch = useDispatch();

                const [formState, dispatchFormState] = useReducer(formReducer, {
                    inputValues: {
                        email: '',
                        password: '',
                    },
                    inputValidities: {
                        email: false,
                        password: false,
                    },
                    formIsValid: false,
                });

                useEffect(() => {
                    if (error) {
                        Alert.alert('An Error Ocurred!', error, [{ text: 'Ok' }]);
                    }
                }, [error]);

                const authHandler = async () => {
                    let action;

                    if (isSignup) {
                        action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
                    } else {
                        action = authActions.login(formState.inputValues.email, formState.inputValues.password);
                    }

                    setError(null);
                    setIsLoading(true);

                    try {
                        await dispatch(action);
                        navigation.navigate('Shop');
                    } catch (error) {
                        setError(error.message);
                        setIsLoading(false);
                    }
                };

                const inputChangeHandler = useCallback(
                    (inputIdentifier, inputValue, inputValidity) => {
                        dispatchFormState({
                            type: FORM_INPUT_UPDATE,
                            input: inputIdentifier,
                            value: inputValue,
                            isValid: inputValidity,
                        });
                    },
                    [dispatchFormState],
                );

                return (
                    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
                        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                            <Card style={styles.authContainer}>
                                <ScrollView>
                                    <Input
                                        id="email"
                                        label="E-Mail"
                                        keyboardType="email-address"
                                        required
                                        email
                                        autoCapitalize="none"
                                        errorText="Please enter a valid e-mail address"
                                        onInputChange={inputChangeHandler}
                                        initialValue=""
                                    />
                                    <Input
                                        id="password"
                                        label="Password"
                                        keyboardType="default"
                                        secureTextEntry
                                        required
                                        minLength={5}
                                        autoCapitalize="none"
                                        errorText="Please enter a valid password"
                                        onInputChange={inputChangeHandler}
                                        initialValue=""
                                    />

                                    <View style={styles.buttonContainer}>
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color={Colors.primary} />
                                        ) : (
                                            <Button
                                                title={isSignup ? 'Sign Up' : 'Login'}
                                                color={Colors.primary}
                                                onPress={authHandler}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button
                                            title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                            color={Colors.accent}
                                            onPress={() => setIsSignup(!isSignup)}
                                        />
                                    </View>
                                </ScrollView>
                            </Card>
                        </LinearGradient>
                    </KeyboardAvoidingView>
                );
            }

            AuthScreen.navigationOptions = {
                headerTitle: 'Authenticate',
            };

            const styles = StyleSheet.create({
                screen: {
                    flex: 1,
                },
                gradient: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                authContainer: {
                    width: '80%',
                    maxWidth: 400,
                    maxHeight: 400,
                    padding: 20,
                },
                buttonContainer: {
                    marginTop: 10,
                },
            });

            export default AuthScreen;
        ```

<h2 id='actionauth'>Auth Config</h2>

[Go Back to Summary](#summary)

-   create `auth` folder and files redux

```Bash
    touch store/actions/auth.js store/reducers/auth.js
```

-   In `store/actions/auth.js`

    -   Since we are using redux-thunk to fetch and dispatch our data
    -   redux-thunk give us the **dispatch** function to dispatch our actions to reducers
    -   and redux-thunk also gives us the **getState** as a second argument to get the data from our store
    -   Sign Up
        -   Firebase gives us an link to sign up new users we just have to provide our authentication key
        -   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`
    -   Login

        -   Just like singing up, firebase gives us a link to authenticate users
        -   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`

        ```JavaScript
            import { FIREBASE_KEY } from 'react-native-dotenv';
            export const SIGNUP = 'SIGNUP';
            export const LOGIN = 'LOGIN';

            export const signup = (email, password) => {
                return async (dispatch) => {
                    try {
                        const response = await fetch(
                            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email,
                                    password,
                                    returnSecureToken: true,
                                }),
                            },
                        );

                        if (!response.ok) {
                            const errorResData = await response.json();
                            const errorId = errorResData.error.message;
                            let message;

                            switch (errorId) {
                                case 'EMAIL_EXISTS':
                                    message = 'This email exists already!';

                                    break;
                                default:
                                    message = 'Something went wrong';

                                    break;
                            }

                            throw new Error(message);
                        }

                        const resData = await response.json();

                        dispatch({
                            type: SIGNUP,
                            token: resData.idToken,
                            userId: resData.localId,
                        });
                    } catch (error) {
                        throw error;
                    }
                };
            };

            export const login = (email, password) => {
                return async (dispatch) => {
                    try {
                        const response = await fetch(
                            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email,
                                    password,
                                    returnSecureToken: true,
                                }),
                            },
                        );

                        if (!response.ok) {
                            const errorResData = await response.json();
                            const errorId = errorResData.error.message;
                            let message;

                            switch (errorId) {
                                case 'EMAIL_NOT_FOUND':
                                    message = 'This email could not be found!';

                                    break;
                                case 'INVALID_PASSWORD':
                                    message = 'This password is not valid!';
                                    break;
                                default:
                                    message = 'Something went wrong';

                                    break;
                            }

                            throw new Error(message);
                        }

                        const resData = await response.json();
                        dispatch({
                            type: LOGIN,
                            token: resData.idToken,
                            userId: resData.localId,
                        });
                    } catch (error) {
                        throw error;
                    }
                };
            };
        ```

-   in `store/reducers/auth.js`

    -   We get our **token** and **userId** that we defined on the login/signup methods in our actions

        ```JavaScript
            import { LOGIN, SIGNUP } from '../actions/auth';

            const initialState = {
                token: null,
                userId: null,
            };

            const authReducer = (state = initialState, action) => {
                switch (action.type) {
                    case LOGIN:
                        return {
                            token: action.token,
                            userId: action.userId,
                        };
                    case SIGNUP:
                        return {
                            token: action.token,
                            userId: action.userId,
                        };
                    default:
                        return state;
                }
            };

            export default authReducer;
        ```

<h1 id='localstorage'>Local Storage - AsyncStorage</h1>

[Go Back to Summary](#summary)

-   In `store/actions/auth.js`

    -   Import **AsyncStorage** from `react-native`
        -   `removeItem('key')` to remove key/value from local storage
        -   `setItem('key', 'value')` to add key/value pair in the local storage
            -   It has to be a string, so we have to JSON.stringify()
        -   `getItem('key')` to get an item from local storage

    ```JavaScript
      import { AsyncStorage } from 'react-native';
      import { FIREBASE_KEY } from 'react-native-dotenv';
      export const AUTHENTICATE = 'AUTHENTICATE';
      export const LOGOUT = 'LOGOUT';
      let timer;

      export const authenticate = (userId, token, expiryTime) => {
          return (dispatch) => {
              dispatch(setLogoutTimer(expiryTime));
              dispatch({ type: AUTHENTICATE, userId, token });
          };
      };

      export const signup = (email, password) => {
          return async (dispatch) => {...};
      };

      export const login = (email, password) => {
          return async (dispatch) => {...};
      };

      export const logout = () => {
          clearLogoutTimer();
          AsyncStorage.removeItem('userData');
          return { type: LOGOUT };
      };

      const clearLogoutTimer = () => {
          if (timer) {
              clearTimeout(timer);
          }
      };

      const setLogoutTimer = (expirationTime) => {
          return (dispatch) => {
              timer = setTimeout(() => {
                  dispatch(logout());
              }, expirationTime);
          };
      };

      const saveDataToStorage = (token, userId, expirationDate) => {
          AsyncStorage.setItem(
              'userData',
              JSON.stringify({
                  token,
                  userId,
                  expiryDate: expirationDate.toISOString(),
              }),
          );
      };
    ```

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

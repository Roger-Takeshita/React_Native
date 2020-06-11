<h1 id='summary'>Summary</h1>

[Go Back to Summary](#summary)

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

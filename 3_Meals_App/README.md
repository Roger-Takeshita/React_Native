<h1 id='screens'>Third-party Library - Navigation</h1>

[Go Back to Summary](#summary)

-   Let's install a third-party library to help us to easily navigate and add animations between screens.

-   Import the fonts from `./assets/fonts/`

    ```JavaScript
      import * as Front from 'expo-font'
    ```

    -   If the library is not working we have to manually install it
    -   `npm i expo-font`

-   Import the ` AppLoading`` from `expo` to prolong the splash screen when the app starts until our fonts are loaded

<h2 id='installnav'>Packages</h2>

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

<h2 id='folderfiles'>Create Folders and Files</h2>

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

<h2 id='startourapp'>Start Build Our App</h2>

<h3 id='app1'>App.js</h3>

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

<h3 id='navigation'>Meals Navigation</h3>

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

<h3 id='categoriesscreen'>CategoriesScreen.js</h3>

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

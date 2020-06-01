import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../css/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    // headerTitleStyle: {  // FIXME removed font family
    //     fontFamily: 'open-sans-bold'
    // },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        // fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        // fontFamily: 'open-sans',
        fontSize: 13
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: MealDetailScreen
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavoriteNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android' ? <Text>My Meals</Text> : 'My Meals',
            // tabBarLabel:Platform.OS === 'android' ?  <Text style={{ fontFamily: 'open-sans-bold' }}>My Meals</Text> : 'My Meals',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android' ? <Text>My Favorites</Text> : 'My Favorites',
            // tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>My Favorites</Text> : 'My Favorites',

            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor
        }
    }
};

const MealsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
              activeColor: 'white',
              shifting: true
              //   barStyle: {
              //       backgroundColor: Colors.primaryColor
              //   }
          })
        : createBottomTabNavigator(tabScreenConfig, {
              labelStyle: {
                  //   fontFamily: 'open-sans-bold'
              },
              tabBarOptions: {
                  activeTintColor: Colors.accentColor
              }
          });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'My Meals'
            }
        },
        Filters: {
            screen: FiltersNavigator,
            navigationOptions: {
                drawerLabel: 'My Filters'
            }
        }
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor
            // labelStyle: {
            //   fontFamily: 'open-sans-bold'
            // }
        }
    }
);

export default createAppContainer(MainNavigator);

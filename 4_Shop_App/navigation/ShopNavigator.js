import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import Colors from '../css/Colors';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailsScreen,
        Cart: CartScreen,
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

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import StartupScreen from '../screens/StartupScreen';
import { AuthNavigator, ShopNavigator } from './ShopNavigator';

function AppNavigator(props) {
    const isAuth = useSelector((state) => !!state.auth.token);
    const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;

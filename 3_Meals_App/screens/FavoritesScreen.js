import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import { MEALS } from '../database/dummy-data';

import MealList from '../components/MealList';

function FavoritesScreen({ navigation }) {
    const favMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');
    return <MealList listData={favMeals} navigation={navigation} />;
}

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    };
};

export default FavoritesScreen;

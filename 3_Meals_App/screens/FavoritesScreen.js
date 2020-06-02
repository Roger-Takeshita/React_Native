import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { View, StyleSheet } from 'react-native';

import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomText from '../components/CustomText';
import MealList from '../components/MealList';

function FavoritesScreen({ navigation }) {
    const favMeals = useSelector((state) => state.meals.favoriteMeals);
    if (!favMeals || favMeals.length === 0) {
        return (
            <View style={styles.content}>
                <CustomText>No favorite meals found. Start adding some!</CustomText>
            </View>
        );
    }
    return <MealList listData={favMeals} navigation={navigation} />;
}

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FavoritesScreen;

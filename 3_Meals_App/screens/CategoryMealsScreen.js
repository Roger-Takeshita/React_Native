import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../database/dummy-data';
import MealList from '../components/MealList';
import CustomText from '../components/CustomText';

function CategoryMealsScreen({ navigation }) {
    const catId = navigation.getParam('categoryId');
    const availableMeals = useSelector((state) => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <CustomText>No meals found, maybe check your filters?</CustomText>
            </View>
        );
    }

    return <MealList listData={displayedMeals} navigation={navigation} />;
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoryMealsScreen;

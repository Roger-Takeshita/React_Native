import React from 'react';

import { CATEGORIES, MEALS } from '../database/dummy-data';
import MealList from '../components/MealList';

function CategoryMealsScreen({ navigation }) {
    const catId = navigation.getParam('categoryId');
    const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

    return <MealList listData={displayedMeals} navigation={navigation} />;
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

export default CategoryMealsScreen;

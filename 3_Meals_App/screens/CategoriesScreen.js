import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../database/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile';

function CategoriesScreen({ navigation }) {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                color={itemData.item.color}
                title={itemData.item.title}
                onSelect={() =>
                    navigation.navigate({
                        routeName: 'CategoryMeals',
                        params: {
                            categoryId: itemData.item.id
                        }
                    })
                }
            />
        );
    };

    return <FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />;
}

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
};

export default CategoriesScreen;

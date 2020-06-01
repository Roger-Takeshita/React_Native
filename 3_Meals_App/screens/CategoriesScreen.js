import React from 'react';
import { FlatList } from 'react-native';
import { CATEGORIES } from '../database/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';

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

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    };
};

export default CategoriesScreen;

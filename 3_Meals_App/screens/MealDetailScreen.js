import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../database/dummy-data';
import CustomHeaderButton from '../components/CustomHeaderButton';
import CustomText from '../components/CustomText';

const ListItem = ({ children }) => {
    return (
        <View style={styles.listItem}>
            <CustomText>{children}</CustomText>
        </View>
    );
};

function MealDetailScreen({ navigation }) {
    const mealId = navigation.getParam('mealId');

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <CustomText>{selectedMeal.duration}m</CustomText>
                <CustomText>{selectedMeal.complexity.toUpperCase()}</CustomText>
                <CustomText>{selectedMeal.affordability.toUpperCase()}</CustomText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((step) => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title={'Favorite'}
                    iconName="ios-star"
                    onPress={() => {
                        console.log('Marked as favorite');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        // fontFamily: 'open-sans-bold', // FIXME removed font family
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;

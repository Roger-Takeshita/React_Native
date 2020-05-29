import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function CategoryMealsScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.stylesText}>CategoryMealsScreen</Text>
            <Button title="Go to Detail" onPress={() => navigation.navigate({ routeName: 'MealDetail' })} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stylesText: {}
});

export default CategoryMealsScreen;

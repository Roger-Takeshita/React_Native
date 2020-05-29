import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function CategoriesScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.stylesText}>CategoriesScreen</Text>
            <Button
                title="Go to Meals!"
                onPress={() => {
                    navigation.navigate({ routeName: 'CategoryMeals' });
                }}
            />
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

export default CategoriesScreen;

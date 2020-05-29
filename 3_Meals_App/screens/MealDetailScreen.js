import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MealDetailScreen(props) {
    return (
        <View style={styles.screen}>
            <Text style={styles.stylesText}>MealDetailScreen</Text>
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

export default MealDetailScreen;

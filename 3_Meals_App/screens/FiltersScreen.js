import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FiltersScreen(props) {
    return (
        <View style={styles.screen}>
            <Text style={styles.stylesText}>FiltersScreen</Text>
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

export default FiltersScreen;

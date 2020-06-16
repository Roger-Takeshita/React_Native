import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function PlaceDetailScreen(props) {
    return (
        <View style={styles.stylesView}>
            <Text style={styles.stylesText}>PlaceDetailScreen</Text>
        </View>
    );
}

PlaceDetailScreen.navigationOptions = (data) => {
    return {
        headerTitle: data.navigation.getParam('placeTitle'),
    };
};

const styles = StyleSheet.create({
    stylesView: {},
    stylesText: {},
});

export default PlaceDetailScreen;

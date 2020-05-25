import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card({ children, style }) {
    return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10
    }
});

export default Card;

import React from 'react';
import { Text, StyleSheet } from 'react-native';

function BodyText({ children }) {
    return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});

export default BodyText;

import React from 'react';
import { Text, StyleSheet } from 'react-native';

function CustomText({ children }) {
    return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        // fontFamily: 'open-sans', // FIXME removed font family
    },
});

export default CustomText;

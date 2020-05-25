import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Test({ id, item, onDelete }) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onDelete.bind(this, id)}>
            <View style={styles.listItem}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    }
});

export default Test;

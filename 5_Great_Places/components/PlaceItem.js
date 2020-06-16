import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../css/Colors';

function PlaceItem({ onSelect, image, title, address }) {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    address: {
        color: '#666',
        fontSize: 16,
    },
});

export default PlaceItem;
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../css/Colors';
import * as placesActions from '../store/places';

function NewPlaceScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setTitle(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={title} />
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'New Place',
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});

export default NewPlaceScreen;

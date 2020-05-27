import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import DefaultStyles from '../css/default-styles';
import Colors from '../css/colors';

import MainButton from '../components/MainButton';

function GameOverPage({ roundsNumber, userNumber, onRestart }) {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://pbs.twimg.com/profile_banners/249990725/1586458854/1500x500'
                    }}
                    // source={require('../assets/images/success.png')}
                    resizeMethod="auto"
                />
            </View>
            <View style={styles.resultContainer}>
                <Text style={(DefaultStyles.bodyText, styles.resultText)}>
                    Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the
                    number <Text style={styles.highlight}>{userNumber}</Text>.
                </Text>
            </View>
            <MainButton onPress={onRestart}>NEW GAME</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        margin: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverPage;

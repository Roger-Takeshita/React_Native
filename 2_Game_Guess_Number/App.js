import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';

import StartGamePage from './pages/StartGamePage';
import GamePage from './pages/GamePage';
import GameOverPage from './pages/GameOverPage';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    const handleStart = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(error) => console.log(error)}
            />
        );
    }

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    let content = <StartGamePage onStartGame={handleStart} />;
    if (userNumber && guessRounds <= 0) {
        content = <GamePage userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRounds > 0) {
        content = (
            <GameOverPage
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={configureNewGameHandler}
            />
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={'Guess a Number'} />
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

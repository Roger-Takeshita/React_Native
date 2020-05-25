import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';

import StartGamePage from './pages/StartGamePage';
import GamePage from './pages/GamePage';

export default function App() {
    const [userNumber, setUserNumber] = useState();

    const handleStart = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    let content = <StartGamePage onStartGame={handleStart} />;
    if (userNumber) content = <GamePage userChoice={userNumber} />;

    return (
        <View style={styles.screen}>
            <Header title={'Guess a Number'} />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

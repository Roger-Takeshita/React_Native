import React, { useState } from 'react';
// import * as Font from 'expo-font';   // FIXME font imports
// import { AppLoading } from 'expo';   //= imports
import { enableScreens } from 'react-native-screens';

import MealsNavigation from './navigation/MealsNavigation';

enableScreens();

//= fetchFonts
// const fetchFonts = () => {
//     return Font.loadAsync({
//         'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//         'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
//     });
// };

export default function App() {
    //= fontLoaded
    // const [fontLoaded, setFontLoaded] = useState(false);

    // if (!fontLoaded) {
    //     return <AppLoading startAsync={fetchFonts} onFinish={setFontLoaded(true)} />;
    // }

    return <MealsNavigation />;
}

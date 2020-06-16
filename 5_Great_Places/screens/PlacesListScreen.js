import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

function PlacesListScreen({ navigation }) {
    const places = useSelector((state) => state.places.places);

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={(data) => (
                <PlaceItem
                    image={'http://image.com'}
                    title={data.item.title}
                    address={null}
                    onSelect={() =>
                        navigation.navigate('PlaceDetail', {
                            placeTitle: data.item.title,
                            placeId: data.item.id,
                        })
                    }
                />
            )}
        />
    );
}

PlacesListScreen.navigationOptions = (data) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => data.navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        ),
    };
};

export default PlacesListScreen;

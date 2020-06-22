import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places';

function PlacesListScreen({ navigation }) {
    const places = useSelector((state) => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={(data) => (
                <PlaceItem
                    image={data.item.imageUri}
                    title={data.item.title}
                    address={data.item.address}
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

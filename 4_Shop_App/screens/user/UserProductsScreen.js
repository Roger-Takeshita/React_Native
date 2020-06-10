import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as productsActions from '../../store/actions/products';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../css/Colors';

function UserProductsScreen({ navigation }) {
    const userProducts = useSelector((state) => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', {
            productId: id,
        });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => dispatch(productsActions.deleteProduct(id)),
            },
        ]);
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button
                        color={Colors.primary}
                        title="Edit"
                        onPress={() => editProductHandler(itemData.item.id)}
                    />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => deleteHandler(itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
}

UserProductsScreen.navigationOptions = (data) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => data.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => data.navigation.navigate('EditProduct')}
                />
            </HeaderButtons>
        ),
    };
};

export default UserProductsScreen;

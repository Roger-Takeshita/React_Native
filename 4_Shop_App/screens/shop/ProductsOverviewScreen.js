import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../css/Colors';

function ProductsOverviewScreen({ navigation }) {
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title,
        });
    };

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    title={itemData.item.title}
                    imageUrl={itemData.item.imageUrl}
                    price={itemData.item.price}
                    onViewDetail={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => dispatch(cartActions.addToCart(itemData.item))}
                    />
                </ProductItem>
            )}
        />
    );
}

ProductsOverviewScreen.navigationOptions = (data) => {
    return {
        headerTitle: 'All Products',
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
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => data.navigation.navigate('Cart')}
                />
            </HeaderButtons>
        ),
    };
};

export default ProductsOverviewScreen;

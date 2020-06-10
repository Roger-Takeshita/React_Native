import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../css/Colors';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';

function OrdersScreen(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        loadOrders().then(setIsLoading(false));
    }, [loadOrders]);

    const loadOrders = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);

        try {
            await dispatch(ordersActions.fetchOrders());
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }

        setIsRefreshing(false);
    }, [setIsRefreshing, setError, dispatch]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error ocurred!</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No orders found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadOrders}
            refreshing={isRefreshing}
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
}

OrdersScreen.navigationOptions = (data) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => data.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrdersScreen;

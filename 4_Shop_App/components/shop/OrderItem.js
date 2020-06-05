import React, { useState } from 'react';
import { View, Text, StyleSheet, But, Button } from 'react-native';

import CartItem from './CartItem';
import Card from '../UI/Card';
import Colors from '../../css/Colors';

function OrderItem({ amount, date, items }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}> {date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => setShowDetails(!showDetails)}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {items.map((cartItem) => (
                        <CartItem
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            title={cartItem.productTitle}
                            amount={cartItem.sum}
                        />
                    ))}
                </View>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: 'red',
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888',
    },
    detailItems: {
        width: '100%',
    },
});

export default OrderItem;

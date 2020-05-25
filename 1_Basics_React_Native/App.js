import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const buttonHandler = (goal) => {
        setCourseGoals([...courseGoals, { id: Math.random().toString(), value: goal }]);
        setIsAddMode(false);
    };

    const deleteHandler = (id) => {
        setCourseGoals((courseGoals) => {
            return courseGoals.filter((goal) => goal.id !== id);
        });
    };

    const cancelHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.container}>
            <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
            <GoalInput visible={isAddMode} buttonHandler={buttonHandler} onCancel={cancelHandler} />
            <FlatList
                data={courseGoals}
                renderItem={(itemData) => (
                    <GoalItem id={itemData.item.id} item={itemData.item.value} onDelete={deleteHandler} />
                )}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50
    }
});

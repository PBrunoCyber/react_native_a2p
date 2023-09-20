import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import styles from '../app/form/patrimonio.style';


const Form = () => {
    const [progress, setProgress] = useState(50);
    const progressAdmin = useRef(new Animated.Value(0)).current;
    const [screen, setScren] = useState();


    const animateProgress = () => {
        Animated.timing(progressAdmin, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        animateProgress();
        return () => { };
    }, [progress])

    const { school } = useLocalSearchParams();
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <Text style={styles.label}>Progress {progress}%</Text>
                <View style={styles.progressBG}>
                    <Animated.View
                        style={[styles.progress,
                        { width: progressAdmin.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]}
                    />
                </View>
            </View>
        </>
    )
}


export default Form;

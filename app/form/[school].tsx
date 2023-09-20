import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './patrimonio.style';

function ComponenteA() {
    return <Text>Componente A</Text>;
}

function ComponenteB() {
    return <Text>Componente B</Text>;
}

function ComponenteC() {
    return <Text>Componente C</Text>;
}

function App() {
    const [componenteSelecionado, setComponenteSelecionado] = useState('A');

    const renderizarComponente = () => {
        switch (componenteSelecionado) {
            case 'A':
                return <ComponenteA />;
            case 'B':
                return <ComponenteB />;
            case 'C':
                return <ComponenteC />;
            default:
                return null;
        }
    };

    const [progress, setProgress] = useState(5);
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

            <Stack.Screen options={{ title: "Formulário" }} />
            <View style={styles.container}>
                <View style={styles.progressBG}>
                    <Animated.View
                        style={[styles.progress,
                        { width: progressAdmin.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]}
                    />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {renderizarComponente()}

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { setComponenteSelecionado('A'); setProgress(5) }}>
                        <Text>Componente A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setComponenteSelecionado('B'); setProgress(50) }}>
                        <Text>Componente B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setComponenteSelecionado('C'); setProgress(100) }}>
                        <Text>Componente C</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default App;
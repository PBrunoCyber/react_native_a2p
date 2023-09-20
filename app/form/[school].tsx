import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import styles from './patrimonio.style';
import FormPatrimonio from '../../components/FormPatrimonio';
import InputLabel from '../../components/InputLabel';
import InputScroll from '../../components/InputScroll';


function Form() {
    const [componenteSelecionado, setComponenteSelecionado] = useState('A');
    const [progress, setProgress] = useState(5);
    const progressAdmin = useRef(new Animated.Value(0)).current;
    const [screen, setScren] = useState();
    const { school } = useLocalSearchParams();
    const [formData, setFormData] = useState({});

    // const updatedData = (data: Object, screen: string, progress: number): void => {
    //     setComponenteSelecionado(screen);
    //     setProgress(progress);
    //     setFormData({ ...data, data });
    // }

    const onValueChange = (key: string, value: string | number) => {
        setFormData({ ...formData, [key]: value });
    }

    function FormParte1() {
        return (
            <InputScroll>
                <InputLabel chave='nomeDoItem' text='Nome Do Item' onValueChange={onValueChange} />
                <InputLabel chave='nomeDoBem' text='Nome Do Bem' onValueChange={onValueChange} />
                <TouchableOpacity style={[styles.btn, { width: '100%' }]} onPress={() => { setComponenteSelecionado('B'); setProgress(10) }}><Text>Próxima Etapa</Text></TouchableOpacity>
            </InputScroll>
        )
    }

    function FormPart2() {
        return (
            <InputScroll>
                <InputLabel chave='marcaDoBem' text='Marca do Bem' onValueChange={onValueChange} />
                <InputLabel chave='descricaoDoBem' text='Descrição do Bem' onValueChange={onValueChange} />
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={[styles.btn, { width: '50%' }]} onPress={() => { setComponenteSelecionado('A'); setProgress(5) }}><Text>Voltar</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { width: '50%' }]} onPress={() => { setComponenteSelecionado('C'); setProgress(10) }}><Text>Próxima Etapa</Text></TouchableOpacity>
                </View>
            </InputScroll>
        )
    }


    const renderizarComponente = () => {
        switch (componenteSelecionado) {
            case 'A':
                return <FormParte1 />;
            case 'B':
                return <FormPart2 />;
            default:
                return null;
        }
    };

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

    return (
        <>
            <Stack.Screen options={{ title: "Controle Patrimonial" }} />
            <View style={styles.container}>
                <View style={styles.progressBG}>
                    <Animated.View
                        style={[styles.progress,
                        { width: progressAdmin.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]}
                    />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                {renderizarComponente()}
            </View>
        </>
    );
}

export default Form;
import { Stack } from 'expo-router';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { url } from '../../../constants/url';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from '../../../constants/theme'
import { Text } from 'react-native';
import styles from '../../../styles/loadEscolas.style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

interface ILoadEscolas {
    gre: string,
    senha: string
}

interface IHashDelete {
    senha: string,
}

const LoadEscolas = () => {

    const [answer, setAnswer] = useState<ILoadEscolas>({ gre: '', senha: '' });
    const [hashDelete, setHashDelete] = useState<IHashDelete>({ senha: '' });
    const [isLoadingLoadEscolas, setIsLoadingLoadEscolas] = useState(false);
    const [isLoadingDangerZone, setIsLoadingDangerZone] = useState(false);

    const handleOptionChange = (name: string, value: string) => {
        setAnswer((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleDeleteChange = (name: string, value: string) => {
        setHashDelete((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const carregarEscolas = () => {
        setIsLoadingLoadEscolas(!isLoadingLoadEscolas);
        console.log(answer);
    }

    const apagarEscolas = () => {
        setIsLoadingDangerZone(!isLoadingDangerZone);
        console.log(hashDelete);
    }

    return (
        <ScrollView contentContainerStyle={{ minHeight: 900 }}>
            <View style={styles.card}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.green }}>Carregar Escolas</Text>
                <Text style={{ fontSize: 14, marginTop: 10 }}>Digite o número GRE e a senha de acesso para que as escolas sejam adicionadas</Text>
                <View style={styles.gre_senha}>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Número GRE</Text>
                        <TextInput onChangeText={(txt) => handleOptionChange('gre', txt)} style={styles.input} />
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Código de Acesso</Text>
                        <TextInput onChangeText={(txt) => handleOptionChange('senha', txt)} style={styles.input} />
                    </View>
                </View>
                <TouchableOpacity disabled={isLoadingLoadEscolas ? true : false} onPress={() => carregarEscolas()} style={[styles.btnLoad, isLoadingLoadEscolas ? { backgroundColor: COLORS.disableGreen } : { backgroundColor: COLORS.green }]}>
                    {!isLoadingLoadEscolas ? <><Ionicons name='cloud-download-outline' color={COLORS.white} size={20} />
                        <Text style={{ color: COLORS.white }}>Carregar Escolas</Text></>
                        : <ActivityIndicator style={{ width: 160 }} color={COLORS.white} />}
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.darkRed }}>Danger Zone</Text>
                <Text style={{ fontSize: 14, marginTop: 10 }}>Essa ação irá apagar todas as escolas e os respectivos formulários do banco local</Text>
                <View style={styles.gre_senha}>
                    <View style={{ flexGrow: 1, maxWidth: 400 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Código de Acesso</Text>
                        <TextInput onChangeText={(txt) => handleDeleteChange('senha', txt)} style={styles.input} />
                    </View>
                </View>
                <TouchableOpacity disabled={isLoadingDangerZone ? true : false} onPress={() => apagarEscolas()} style={[styles.btnLoad, isLoadingDangerZone ? { backgroundColor: COLORS.darkRed } : { backgroundColor: COLORS.darkRed }]}>
                    {!isLoadingDangerZone ? <><Ionicons name='trash-outline' color={COLORS.white} size={20} />
                        <Text style={{ color: COLORS.white }}>Apagar Escolas</Text></>
                        : <ActivityIndicator style={{ width: 160 }} color={COLORS.white} />}
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LoadEscolas;
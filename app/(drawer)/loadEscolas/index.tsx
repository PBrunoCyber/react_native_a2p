import { Stack, router, useFocusEffect } from 'expo-router';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { url } from '../../../constants/url';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from '../../../constants/theme'
import { Text } from 'react-native';
import styles from '../../../styles/loadEscolas.style'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useCallback, useState } from 'react';
import Escola from '../../../services/Escola';
import EstruturaFisicaEscolar from '../../../services/EstruturaFisicaEscolar';
import axios from 'axios';

interface ILoadEscolas {
    gre: string,
    senha: string
}

const LoadEscolas = () => {

    const [answer, setAnswer] = useState<ILoadEscolas>({ gre: '', senha: '' });
    const [answerDelete, setAnswerDelete] = useState<ILoadEscolas>({ gre: '', senha: '' });
    const [isLoadingLoadEscolas, setIsLoadingLoadEscolas] = useState(false);
    const [isLoadingDangerZone, setIsLoadingDangerZone] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [messageOk, setMessageOk] = useState('');
    const [finished, setFinished] = useState(false);
    const [formErrors, setFormErrors] = useState<ILoadEscolas>();
    const [formErrorsDelete, setFormErrorsDelete] = useState<ILoadEscolas>();

    const handleOptionChange = (name: string, value: string) => {
        setAnswer((prev) => ({
            ...prev,
            [name]: value
        }));
        setFormErrors({ gre: '', senha: '' });
    }

    const handleDeleteChange = (name: string, value: string) => {
        setAnswerDelete((prev) => ({
            ...prev,
            [name]: value
        }));
        setFormErrorsDelete({ gre: '', senha: '' });
    }

    interface IResponse {
        nr_cod_inep: string,
        ds_nome: string,
        cod_gre: string
    }

    useFocusEffect(
        useCallback(() => {
            setAnswer({ gre: '', senha: '' });
            setAnswerDelete({ gre: '', senha: '' });
        }, [])
    )

    const createOrNotEstruturaFisicaEscolar = async () => {
        const res = await EstruturaFisicaEscolar.existsEstruturaFisicaEscolar();
        if (res != true) {
            await EstruturaFisicaEscolar.createTBEstruturaFisicaEscolar();
        }
    }

    const createOrNotEscola = async () => {
        const res: any = await Escola.existsEscola();
        if (res != true) {
            await Escola.createTBEscola();
        }
    }

    const carregarEscolas = async () => {
        createOrNotEscola();
        createOrNotEstruturaFisicaEscolar();
        setIsLoadingLoadEscolas(true);

        const errors: any = {};
        if (!answer.gre) {
            errors.gre = "Campo obrigatório"
        }
        if (!answer.senha) {
            errors.senha = "Campo obrigatório"
        }

        if (answer.gre && !/^\d+$/g.test(answer.gre)) {
            errors.gre = "Digite apenas números"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsLoadingLoadEscolas(false);
            return;
        }


        const res: any = await Escola.getByCodGre(parseInt(answer.gre));
        if (res != false) {
            setMessageError("As escolas com a GRE informada já foram carregadas!");
            setTimeout(() => {
                setMessageError('');
                setIsLoadingLoadEscolas(false);
                setFinished(false);
            }, 3000);
            return;
        }
        try {
            setMessageOk('Baixando Escolas...');
            const response: any = await axios.get(`${url}/schools/${answer.gre}/${answer.senha.toString()}`);
            console.log(response.data.length);
            if (response?.data.length === 0) {
                setMessageError("Não há nenhuma escola com a GRE informada!");
                setMessageOk('');
                setTimeout(() => {
                    setMessageError('');
                    setIsLoadingLoadEscolas(false);
                    setFinished(false);
                }, 3000);
                return;
            }
            setMessageOk('Inserindo escolas no banco local...')
            const promise = response?.data.map(async (item: IResponse) => {
                await Escola.insertEscola({ nome: item.ds_nome, inep: item.nr_cod_inep, cod_gre: parseInt(item.cod_gre) })
            });
            await Promise.all(promise);
            setFinished(true);
            setMessageOk('Dados carregados com sucesso!');
            setTimeout(() => {
                setMessageOk('');
                setIsLoadingLoadEscolas(false);
                setFinished(false);
                router.push('/');
            }, 2000);
            return;
        } catch (error: any) {
            console.log(error);
            if (error && error?.response?.data.error) {
                setMessageOk('');
                setMessageError(error?.response?.data.error);
                setTimeout(() => {
                    setMessageError('');
                    setIsLoadingLoadEscolas(false);
                    setFinished(false);
                }, 2000);
                return;
            } else {
                setMessageOk('');
                setMessageError("Verifique sua conexão e tente novamente!");
                setTimeout(() => {
                    setMessageError('');
                    setIsLoadingLoadEscolas(false);
                    setFinished(false);
                }, 2000);
                return;
            }
        }
    }


    const apagarEscolas = async () => {
        setIsLoadingDangerZone(true);

        const errors: any = {};
        if (!answerDelete.gre) {
            errors.gre = "Campo obrigatório"
        }
        if (!answerDelete.senha) {
            errors.senha = "Campo obrigatório"
        }
        if (answerDelete.gre && !/^\d+$/g.test(answerDelete.gre)) {
            errors.gre = "Digite apenas números"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrorsDelete(errors);
            setIsLoadingDangerZone(false);
            return;
        }
        const res_verify: any = await axios.get(`${url}/schools-check-credential/${answerDelete.senha.toString()}`)
        if (!res_verify?.data) {
            setMessageError('Credenciais inválidas!');
            setTimeout(() => {
                setMessageError('');
                setIsLoadingDangerZone(false);
            }, 3000);
            return;
        }

        const response: any = await Escola.getByCodGre(parseInt(answerDelete.gre));
        if (!response) {
            setMessageError('Escolas com a GRE informada não estão cadastradas no banco local, portanto não há o que excluir!');
            setTimeout(() => {
                setMessageError('');
                setIsLoadingDangerZone(false);
            }, 4000);
            return;
        }

        setMessageOk(`Apagando questionários da GRE: ${answerDelete.gre} ...`)
        const promise = response.map(async (item: string, index: number) => {
            await EstruturaFisicaEscolar.deleteEstruturaFisicaEscolar(item);
        });
        await Promise.all(promise);
        setMessageOk(`Apagando escolas da GRE: ${answerDelete.gre}...`)
        const res: any = await Escola.deleteByCodGre(parseInt(answerDelete.gre));
        if (res) {
            setMessageOk('Escolas e formulários apagados com sucesso!');
            setFinished(true);
            setTimeout(() => {
                setMessageOk('');
                router.push('/');
                setIsLoadingDangerZone(false);
                setFinished(false);
            }, 2000);
            return;
        } else {
            setMessageError('Ocorreu algum erro ao apagar as escolas..');
            setTimeout(() => {
                setMessageError('');
                setIsLoadingDangerZone(false);
            }, 3000);
            return;
        }
    }

    return (
        <>
            {messageOk ? <View style={styles.messageOk}>{finished ? <Ionicons name='checkmark' size={25} color={COLORS.green} /> : <ActivityIndicator color={COLORS.green} />}<Text style={{ fontWeight: 'bold', color: COLORS.green, maxWidth: 260 }}>{messageOk}</Text></View> : null}
            {messageError ? <View style={styles.messageError}><Ionicons name='close-circle-outline' size={40} color={COLORS.red} /><Text style={{ fontWeight: 'bold', color: COLORS.red, maxWidth: 260 }}>{messageError}</Text></View> : null}
            <ScrollView contentContainerStyle={{ minHeight: 900 }}>
                <View style={styles.card}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.green }}>Carregar Escolas</Text>
                    <Text style={{ fontSize: 14, marginTop: 10 }}>Digite o número GRE e a senha de acesso para que as escolas sejam adicionadas</Text>
                    <View style={styles.gre_senha}>
                        <View style={{ flexGrow: 1, flexDirection: 'column', flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Número GRE</Text>
                            <TextInput value={answer.gre} onChangeText={(txt) => handleOptionChange('gre', txt)} style={styles.input} />
                            {formErrors?.gre ? <Text style={{ color: COLORS.red, marginTop: 5 }}>{formErrors?.gre}</Text> : null}
                        </View>

                        <View style={{ flexGrow: 1, flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Código de Acesso</Text>
                            <TextInput value={answer.senha} onChangeText={(txt) => handleOptionChange('senha', txt)} style={styles.input} />
                            {formErrors?.senha ? <Text style={{ color: COLORS.red, marginTop: 5 }}>{formErrors?.senha}</Text> : null}
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
                        <View style={{ flexGrow: 1 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Número GRE</Text>
                            <TextInput value={answerDelete.gre} onChangeText={(txt) => handleDeleteChange('gre', txt)} style={styles.input} />
                            {formErrorsDelete?.gre ? <Text style={{ color: COLORS.red, marginTop: 5 }}>{formErrorsDelete?.gre}</Text> : null}
                        </View>
                        <View style={{ flexGrow: 1 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Código de Acesso</Text>
                            <TextInput value={answerDelete.senha} onChangeText={(txt) => handleDeleteChange('senha', txt)} style={styles.input} />
                            {formErrorsDelete?.senha ? <Text style={{ color: COLORS.red, marginTop: 5 }}>{formErrorsDelete?.senha}</Text> : null}
                        </View>
                    </View>
                    <TouchableOpacity disabled={isLoadingDangerZone ? true : false} onPress={() => apagarEscolas()} style={[styles.btnLoad, isLoadingDangerZone ? { backgroundColor: COLORS.darkRed } : { backgroundColor: COLORS.darkRed }]}>
                        {!isLoadingDangerZone ? <><Ionicons name='trash-outline' color={COLORS.white} size={20} />
                            <Text style={{ color: COLORS.white }}>Apagar Escolas</Text></>
                            : <ActivityIndicator style={{ width: 160 }} color={COLORS.white} />}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>

    )
}

export default LoadEscolas;
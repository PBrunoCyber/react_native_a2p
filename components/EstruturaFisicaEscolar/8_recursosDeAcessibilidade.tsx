import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { ILocalDeFuncionamento, IRecursosDeAcessibilidade } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    recursosDeAcessibilidade?: (value: IRecursosDeAcessibilidade) => void,
    answerLocalDeFuncionamento?: ILocalDeFuncionamento | undefined
    formErrors?: any,
    data?: IRecursosDeAcessibilidade
}

const RecursosDeAcessibilidade = ({ recursosDeAcessibilidade, answerLocalDeFuncionamento, data, formErrors }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IRecursosDeAcessibilidade>(data || { campo_78: null, campo_79: null, campo_80: null, campo_81: null, campo_82: null, campo_83: null, campo_84: null, campo_85: null, campo_86: 0, campo_87: '', campo_88: '', campo_89: '', campo_90: '' });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        recursosDeAcessibilidade &&
            recursosDeAcessibilidade(answer);
        for (const key in answer) {
            if (answer[key as keyof IRecursosDeAcessibilidade]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || { campo_78: null, campo_79: null, campo_80: null, campo_81: null, campo_82: null, campo_83: null, campo_84: null, campo_85: null, campo_86: 0, campo_87: '', campo_88: '', campo_89: '', campo_90: '' });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_86' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_78']: null,
                ['campo_79']: null,
                ['campo_80']: null,
                ['campo_81']: null,
                ['campo_82']: null,
                ['campo_83']: null,
                ['campo_84']: null,
                ['campo_85']: null,
            }));
        }
        if (question === 'campo_87' && !answer || question === 'campo_88' && !answer) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_89']: '',
                ['campo_90']: ''
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>VIII - RECURSOS DE ACESSIBILIDADE</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.recursosDeAcessibilidade && <Text style={styles.messageError}>{formErrors?.recursosDeAcessibilidade}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_86} label='Nenhum dos recursos de acessibilidade listados*' onSelect={(value) => handleOptionChange('campo_86', value)} />
                    {formErrors?.campo_86 && <Text style={styles.messageError}>{formErrors?.campo_86}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_78} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_78} textOption={textOption} fontWeight='normal' question='1 - Corrimão e guarda-corpos*' onSelect={(option) => handleOptionChange('campo_78', option)} />
                    {formErrors?.campo_78 && <Text style={styles.messageError}>{formErrors?.campo_78}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_79} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_79} textOption={textOption} fontWeight='normal' question='2 - Elevador*' onSelect={(option) => handleOptionChange('campo_79', option)} />
                    {formErrors?.campo_79 && <Text style={styles.messageError}>{formErrors?.campo_79}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_80} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_80} textOption={textOption} fontWeight='normal' question='3 - Pisos Táteis*' onSelect={(option) => handleOptionChange('campo_80', option)} />
                    {formErrors?.campo_80 && <Text style={styles.messageError}>{formErrors?.campo_80}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_81} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_81} textOption={textOption} fontWeight='normal' question='4 - Portas com vão livre de no mínimo 80 cm*' onSelect={(option) => handleOptionChange('campo_81', option)} />
                    {formErrors?.campo_81 && <Text style={styles.messageError}>{formErrors?.campo_81}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_82} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_82} textOption={textOption} fontWeight='normal' question='5 - Rampas*' onSelect={(option) => handleOptionChange('campo_82', option)} />
                    {formErrors?.campo_82 && <Text style={styles.messageError}>{formErrors?.campo_82}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_83} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_83} textOption={textOption} fontWeight='normal' question='6 - Sinalização sonora*' onSelect={(option) => handleOptionChange('campo_83', option)} />
                    {formErrors?.campo_83 && <Text style={styles.messageError}>{formErrors?.campo_83}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_84} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_84} textOption={textOption} fontWeight='normal' question='7 - Sinalização tátil*' onSelect={(option) => handleOptionChange('campo_84', option)} />
                    {formErrors?.campo_84 && <Text style={styles.messageError}>{formErrors?.campo_84}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_85} disable={answer.campo_86 === 1 || data ? true : false} value={answer.campo_85} textOption={textOption} fontWeight='normal' question='8 - Sinalização visual (piso/paredes)*' onSelect={(option) => handleOptionChange('campo_85', option)} />
                    {formErrors?.campo_85 && <Text style={styles.messageError}>{formErrors?.campo_85}</Text>}
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>9 - Número de salas de aula utilizadas na escola dentro do prédio escolar*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_87 ? data.campo_87 : answerLocalDeFuncionamento?.campo_3 == 1 ? answer.campo_87 : ''} style={[styles.input, answerLocalDeFuncionamento?.campo_3 == 0 || data || answerLocalDeFuncionamento?.campo_3 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answerLocalDeFuncionamento?.campo_3 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_87', txt)} />
                                {formErrors?.campo_87 && <Text style={styles.messageError}>{formErrors?.campo_87}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>10 - Número de salas de aula utilizadas na escola fora do prédio escolar*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_88 ? data.campo_88 : answerLocalDeFuncionamento?.campo_3 == 1 ? answer.campo_88 : ''} style={[styles.input, answerLocalDeFuncionamento?.campo_3 == 0 || data || answerLocalDeFuncionamento?.campo_3 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answerLocalDeFuncionamento?.campo_3 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_88', txt)} />
                                {formErrors?.campo_88 && <Text style={styles.messageError}>{formErrors?.campo_88}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>11 - Número de salas de aula climatizadas (ar condicionado, aquecedor ou climatizador)*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_89 ? data.campo_89 : answer?.campo_89} style={[styles.input, (!answer?.campo_87 || !answer.campo_88) || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={(answer?.campo_87 && answer.campo_88) && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_89', txt)} />
                                {formErrors?.campo_89 && <Text style={styles.messageError}>{formErrors?.campo_89}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>12 - Número de salas de aula com acessibilidade para pessoas com deficiência ou mobilidade reduzida*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_90 ? data.campo_90 : answer?.campo_90} style={[styles.input, (!answer?.campo_87 || !answer.campo_88) || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={(answer?.campo_87 && answer.campo_88) && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_90', txt)} />
                                {formErrors?.campo_90 && <Text style={styles.messageError}>{formErrors?.campo_90}</Text>}
                            </View>
                        </View>
                    </View>

                </View>
                : null
            }

        </View >
    );
}

export default RecursosDeAcessibilidade;
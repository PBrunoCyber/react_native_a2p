import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/localDeFuncionamento.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import { IAllValues, ILocalDeFuncionamento } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    localDeFuncionamentoChange?: (value: ILocalDeFuncionamento) => void,
    values?: IAllValues
    formErrors?: any,
    data?: ILocalDeFuncionamento,
    editData?: ILocalDeFuncionamento
}

const AbastecimentoDeAgua = ({ localDeFuncionamentoChange, formErrors, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ILocalDeFuncionamento>(data || editData || { campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' });

    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        localDeFuncionamentoChange &&
            localDeFuncionamentoChange(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' });
            setIsClicked(false);
        }, [])
    )


    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    const handleOptionChange = (question: string, resposta: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: resposta
        }));
        if (question === 'campo_3' && resposta === 0) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_9']: null,
                ['campo_10']: null
            }));
        }
        if (question === 'campo_10' && resposta === 0) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_11']: '',
                ['campo_12']: '',
                ['campo_13']: '',
                ['campo_14']: '',
                ['campo_15']: '',
                ['campo_16']: ''
            }));
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>I - LOCAL DE FUNCIONAMENTO DA ESCOLA</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
            </TouchableOpacity>
            {(isClicked === true || formErrors && Object.keys(formErrors).length > 0) ?
                <View style={styles.formContainer}>
                    {formErrors?.localDeFuncionamento && <Text style={styles.messageError}>{formErrors?.localDeFuncionamento}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_3} value={answer.campo_3} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='1 - Prédio Escolar*' onSelect={(option) => handleOptionChange('campo_3', option)} />
                    {formErrors?.campo_3 && <Text style={styles.messageError}>{formErrors?.campo_3}</Text>}
                    <RadioGroup options={[1, 2, 3]} marked={data ? true : false} selected={data?.campo_9} disable={answer.campo_3 === 1 && !data ? false : true} value={answer.campo_9} textOption={["Próprio", "Cedido", "Alugado"]} fontWeight='normal' question='a) Tipo de Imóvel*' onSelect={(option) => handleOptionChange('campo_9', option)} />
                    {formErrors?.campo_9 && <Text style={styles.messageError}>{formErrors?.campo_9}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_10} disable={answer.campo_3 === 1 && !data ? false : true} value={answer.campo_10} textOption={textOption} fontWeight='normal' question='b) Prédio Escolar Compartilhado com Outra Escola*' onSelect={(option) => handleOptionChange('campo_10', option)} />
                    {formErrors?.campo_10 && <Text style={styles.messageError}>{formErrors?.campo_10}</Text>}
                    <View style={{ marginTop: 40 }}>
                        {formErrors?.campos_repetidos && <Text style={[styles.messageError, { paddingLeft: '10%' }]}>{formErrors?.campos_repetidos}</Text>}
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 10 }]}>
                            <Text style={{ flexGrow: 1 }}>i) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_11 ? data.campo_11 : answer.campo_10 === 1 ? answer.campo_11 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_11', txt)} />
                                {formErrors?.campo_11 && <Text style={styles.messageError}>{formErrors?.campo_11}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 10 }]}>
                            <Text style={{ flexGrow: 1 }}>ii) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_12 ? data.campo_12 : answer.campo_10 == 1 ? answer.campo_12 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_12', txt)} />
                                {formErrors?.campo_12 && <Text style={styles.messageError}>{formErrors?.campo_12}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 10 }]}>
                            <Text style={{ flexGrow: 1 }}>iii) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_13 ? data.campo_13 : answer.campo_10 == 1 ? answer.campo_13 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_13', txt)} />
                                {formErrors?.campo_13 && <Text style={styles.messageError}>{formErrors?.campo_13}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 10 }]}>
                            <Text style={{ flexGrow: 1 }}>iv) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_14 ? data.campo_14 : answer.campo_10 == 1 ? answer.campo_14 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_14', txt)} />
                                {formErrors?.campo_14 && <Text style={styles.messageError}>{formErrors?.campo_14}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 10 }]}>
                            <Text style={{ flexGrow: 1 }}>v) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_15 ? data.campo_15 : answer.campo_10 == 1 ? answer.campo_15 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_15', txt)} />
                                {formErrors?.campo_15 && <Text style={styles.messageError}>{formErrors?.campo_15}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: '10%', marginBottom: 0 }]}>
                            <Text style={{ flexGrow: 1 }}>vi) Código da escola com a qual compartilha*</Text>
                            <View style={{ maxWidth: 300, flexGrow: 1 }}>
                                <TextInput maxLength={8} value={data?.campo_16 ? data.campo_16 : answer.campo_10 == 1 ? answer.campo_16 : ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_10 === 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_16', txt)} />
                                {formErrors?.campo_16 && <Text style={styles.messageError}>{formErrors?.campo_16}</Text>}
                            </View>
                        </View>
                    </View>
                    <RadioGroup options={[1, 0]} value={answer.campo_4} selected={data?.campo_4} marked={data ? true : false} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='2 - Sala(s) em outra escola*' onSelect={(option) => handleOptionChange('campo_4', option)} />
                    {formErrors?.campo_4 && <Text style={styles.messageError}>{formErrors?.campo_4}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_5} selected={data?.campo_5} marked={data ? true : false} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='3 - Galpão / rancho / paiol / barracão*' onSelect={(option) => handleOptionChange('campo_5', option)} />
                    {formErrors?.campo_5 && <Text style={styles.messageError}>{formErrors?.campo_5}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_6} selected={data?.campo_6} marked={data ? true : false} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='4 - Unidade de atendimento Socioeducativa*' onSelect={(option) => handleOptionChange('campo_6', option)} />
                    {formErrors?.campo_6 && <Text style={styles.messageError}>{formErrors?.campo_6}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_7} selected={data?.campo_7} marked={data ? true : false} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='5 - Unidade Prisional*' onSelect={(option) => handleOptionChange('campo_7', option)} />
                    {formErrors?.campo_7 && <Text style={styles.messageError}>{formErrors?.campo_7}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_8} selected={data?.campo_8} marked={data ? true : false} disable={data ? true : false} textOption={textOption} fontWeight='bold' question='6 - Outros*' onSelect={(option) => handleOptionChange('campo_8', option)} />
                    {formErrors?.campo_8 && <Text style={styles.messageError}>{formErrors?.campo_8}</Text>}
                </View> : null
            }
        </View>
    );
}

export default AbastecimentoDeAgua;
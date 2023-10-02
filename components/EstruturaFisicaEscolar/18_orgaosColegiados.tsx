import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IOrgaosColegiados } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    orgaosColegiados?: (value: IOrgaosColegiados) => void,
    formErrors?: any,
    data?: IOrgaosColegiados,
    editData?: IOrgaosColegiados,
}

const OrgaosColegiados = ({ orgaosColegiados, formErrors, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IOrgaosColegiados>(data || editData ||{ campo_164: null, campo_165: null, campo_166: null, campo_167: null, campo_168: null, campo_169: 0 });
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_169' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_164']: null,
                ['campo_165']: null,
                ['campo_166']: null,
                ['campo_167']: null,
                ['campo_168']: null,
            }));
        }
    }

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_164: null, campo_165: null, campo_166: null, campo_167: null, campo_168: null, campo_169: 0 });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        orgaosColegiados &&
            orgaosColegiados(answer);
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    return (
        <View style={{ marginTop: 20, zIndex: -1 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XVIII - ÓRGÃOS COLEGIADOS EM FUNCIONAMENTO NA ESCOLA</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.orgaosColegiados && <Text style={styles.messageError}>{formErrors?.orgaosColegiados}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_169} label='Não há órgãos colegiados em funcionamento*' onSelect={(value) => handleOptionChange('campo_169', value)} />
                    {formErrors?.campo_169 && <Text style={styles.messageError}>{formErrors?.campo_169}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_164} disable={answer.campo_169 === 1 || data ? true : false} value={answer.campo_164} textOption={textOption} fontWeight='normal' question='1 - Associação de Pais*' onSelect={(option) => handleOptionChange('campo_164', option)} />
                    {formErrors?.campo_164 && <Text style={styles.messageError}>{formErrors?.campo_164}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_165} disable={answer.campo_169 === 1 || data ? true : false} value={answer.campo_165} textOption={textOption} fontWeight='normal' question='2 - Associação de pais e mestres*' onSelect={(option) => handleOptionChange('campo_165', option)} />
                    {formErrors?.campo_165 && <Text style={styles.messageError}>{formErrors?.campo_165}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_166} disable={answer.campo_169 === 1 || data ? true : false} value={answer.campo_166} textOption={textOption} fontWeight='normal' question='3 - Conselho escolar*' onSelect={(option) => handleOptionChange('campo_166', option)} />
                    {formErrors?.campo_166 && <Text style={styles.messageError}>{formErrors?.campo_166}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_167} disable={answer.campo_169 === 1 || data ? true : false} value={answer.campo_167} textOption={textOption} fontWeight='normal' question='4 - Grêmio estudantil*' onSelect={(option) => handleOptionChange('campo_167', option)} />
                    {formErrors?.campo_167 && <Text style={styles.messageError}>{formErrors?.campo_167}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_168} disable={answer.campo_169 === 1 || data ? true : false} value={answer.campo_168} textOption={textOption} fontWeight='normal' question='5 - Outros*' onSelect={(option) => handleOptionChange('campo_168', option)} />
                    {formErrors?.campo_168 && <Text style={styles.messageError}>{formErrors?.campo_168}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default OrgaosColegiados;
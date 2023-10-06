import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEsgotamentoSanitario } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    esgotamentoSanitarioChange?: (value: IEsgotamentoSanitario) => void,
    formErrors?: any,
    data?: IEsgotamentoSanitario,
    editData?: IEsgotamentoSanitario
}

const EsgotamentoSanitario = ({ formErrors, esgotamentoSanitarioChange, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEsgotamentoSanitario>(data || editData || { campo_27: null, campo_28: null, campo_29: null, campo_30: 0 });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        esgotamentoSanitarioChange &&
            esgotamentoSanitarioChange(answer);
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_27: null, campo_28: null, campo_29: null, campo_30: 0 });
            setIsClicked(false);
        }, [])
    )

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_30' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_27']: null,
                ['campo_28']: null,
                ['campo_29']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>IV - ESGOTAMENTO SANITÁRIO</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.esgotamentoSanitario && <Text style={styles.messageError}>{formErrors?.esgotamentoSanitario}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_30} label='Não há esgotamento sanitário' onSelect={(value) => handleOptionChange('campo_30', value)} />
                    {formErrors?.campo_30 && <Text style={styles.messageError}>{formErrors?.campo_30}</Text>}
                    <Text style={{ fontWeight: "bold", marginTop: 40, marginBottom: 0 }}>Esgotamento Sanitário</Text>
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_27} disable={answer.campo_30 === 1 || data ? true : false} value={answer.campo_27} textOption={textOption} fontWeight='normal' question='a) Rede Pública*' onSelect={(option) => handleOptionChange('campo_27', option)} />
                    {formErrors?.campo_27 && <Text style={styles.messageError}>{formErrors?.campo_27}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_28} disable={answer.campo_30 === 1 || data ? true : false} value={answer.campo_28} textOption={textOption} fontWeight='normal' question='b) Fossa séptica*' onSelect={(option) => handleOptionChange('campo_28', option)} />
                    {formErrors?.campo_28 && <Text style={styles.messageError}>{formErrors?.campo_28}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_29} disable={answer.campo_30 === 1 || data ? true : false} value={answer.campo_29} textOption={textOption} fontWeight='normal' question='c) Fossa rudimentar/comum*' onSelect={(option) => handleOptionChange('campo_29', option)} />
                    {formErrors?.campo_29 && <Text style={styles.messageError}>{formErrors?.campo_29}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default EsgotamentoSanitario;
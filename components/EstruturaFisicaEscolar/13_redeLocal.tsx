import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEquipamentos, IQuantidadeEquipamentos, IRedeLocal } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    redeLocal?: (value: IRedeLocal) => void,
    answerEquipamentos?: IEquipamentos | undefined,
    answerQuantidadeEquipamentos?: IQuantidadeEquipamentos | undefined,
    formErrors?: any,
    data?: IRedeLocal,
    editData?: IRedeLocal
}

const RedeLocal = ({ redeLocal, answerEquipamentos, answerQuantidadeEquipamentos, data, formErrors, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IRedeLocal>(data || editData || { campo_114: null, campo_115: null, campo_116: 0 });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        redeLocal &&
            redeLocal(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_114: null, campo_115: null, campo_116: 0 });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    useEffect(() => {
        if (answerEquipamentos?.campo_92 === 0 || (!answerQuantidadeEquipamentos?.campo_103 || !answerQuantidadeEquipamentos?.campo_104 || !answerQuantidadeEquipamentos?.campo_105)) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_114']: null,
            }));
        }
    }, [answerEquipamentos, answerQuantidadeEquipamentos?.campo_103, answerQuantidadeEquipamentos?.campo_104, answerQuantidadeEquipamentos?.campo_105])

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if ((question === 'campo_116' && answer === 1)) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_115']: null,
                ['campo_114']: null,

            }));
        }
    }


    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XIII - REDE LOCAL DE INTERLIGAÇÃO DE COMPUTADORES</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.redeLocal && <Text style={styles.messageError}>{formErrors?.redeLocal}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_116} label='Não há rede local interligando computadores' onSelect={(value) => handleOptionChange('campo_116', value)} />
                    {formErrors?.campo_116 && <Text style={styles.messageError}>{formErrors?.campo_116}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_114} disable={answer.campo_116 === 1 || (answerEquipamentos?.campo_92 !== 1 || (!answerQuantidadeEquipamentos?.campo_103 && !answerQuantidadeEquipamentos?.campo_104 && !answerQuantidadeEquipamentos?.campo_105)) || data ? true : false} value={answer.campo_114} textOption={textOption} fontWeight='normal' question='1 - A cabo' onSelect={(option) => handleOptionChange('campo_114', option)} />
                    {formErrors?.campo_114 && <Text style={styles.messageError}>{formErrors?.campo_114}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_115} disable={answer.campo_116 === 1 || answer.campo_114 === null || data ? true : false} value={answer.campo_115} textOption={textOption} fontWeight='normal' question='2 - Wireless*' onSelect={(option) => handleOptionChange('campo_115', option)} />
                    {formErrors?.campo_115 && <Text style={styles.messageError}>{formErrors?.campo_115}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default RedeLocal;
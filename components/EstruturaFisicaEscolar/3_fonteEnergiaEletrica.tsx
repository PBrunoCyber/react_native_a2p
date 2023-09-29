import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEnergiaEletrica } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    fonteEnergiaEletricaChange?: (value: IEnergiaEletrica) => void,
    formErrors?: any,
    data?: IEnergiaEletrica
}

const FonteEnergiaEletrica = ({ formErrors, fonteEnergiaEletricaChange, data }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEnergiaEletrica>({ campo_23: null, campo_24: null, campo_25: null, campo_26: 0 });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        fonteEnergiaEletricaChange &&
            fonteEnergiaEletricaChange(answer);
        for (const key in answer) {
            if (answer[key as keyof IEnergiaEletrica]) {
                setIsClicked(true);
            }
        }

    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_23: null, campo_24: null, campo_25: null, campo_26: 0 });
            setIsClicked(false);
        }, [])
    )

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_26' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_23']: null,
                ['campo_24']: null,
                ['campo_25']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>III - FONTE DE ENERGIA ELÉTRICA</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?

                <View style={styles.formContainer}>
                    {formErrors?.energiaEletrica && <Text style={styles.messageError}>{formErrors?.energiaEletrica}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_26} label='Não há energia elétrica*' onSelect={(value) => handleOptionChange('campo_26', value)} />
                    {formErrors?.campo_26 && <Text style={styles.messageError}>{formErrors?.campo_26}</Text>}
                    <Text style={{ fontWeight: "bold", marginTop: 40, marginBottom: 0 }}>Fonte de energia elétrica*</Text>
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_23} disable={answer.campo_26 === 1 || data ? true : false} value={answer.campo_23} textOption={textOption} fontWeight='normal' question='a) Rede Pública*' onSelect={(option) => handleOptionChange('campo_23', option)} />
                    {formErrors?.campo_23 && <Text style={styles.messageError}>{formErrors?.campo_23}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_24} disable={answer.campo_26 === 1 || data ? true : false} value={answer.campo_24} textOption={textOption} fontWeight='normal' question='b) Gerador movido a combustível fóssil*' onSelect={(option) => handleOptionChange('campo_24', option)} />
                    {formErrors?.campo_24 && <Text style={styles.messageError}>{formErrors?.campo_24}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_25} disable={answer.campo_26 === 1 || data ? true : false} value={answer.campo_25} textOption={textOption} fontWeight='normal' question='c) Fontes de energia renováveis ou alternativas (gerador a biocombustível e/ou biodigestores, eólica, solar, outras)*' onSelect={(option) => handleOptionChange('campo_25', option)} />
                    {formErrors?.campo_25 && <Text style={styles.messageError}>{formErrors?.campo_25}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default FonteEnergiaEletrica;
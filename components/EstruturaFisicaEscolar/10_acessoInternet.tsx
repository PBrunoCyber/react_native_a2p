import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IAcessoInternet } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    acessoInternet: (value: IAcessoInternet) => void,
    formErrors: any,
    context: IAcessoInternet
}

const AcessoInternet = ({ acessoInternet, formErrors, context }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IAcessoInternet>(context);
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        acessoInternet(answer);
        for (const key in answer) {
            if (answer[key as keyof IAcessoInternet]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_106: null, campo_107: null, campo_108: null, campo_109: null, campo_110: 0 });
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
        if (question === 'campo_110' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_106']: null,
                ['campo_107']: null,
                ['campo_108']: null,
                ['campo_109']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>X - ACESSO À INTERNET</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.acessoInternet && <Text style={styles.messageError}>{formErrors.acessoInternet}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_110} label='Não possui acesso à internet*' onSelect={(value) => handleOptionChange('campo_110', value)} />
                    {formErrors.campo_110 && <Text style={styles.messageError}>{formErrors.campo_110}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_110 === 1 ? true : false} value={answer.campo_106} textOption={textOption} fontWeight='normal' question='1 - Para uso administrativo*' onSelect={(option) => handleOptionChange('campo_106', option)} />
                    {formErrors.campo_106 && <Text style={styles.messageError}>{formErrors.campo_106}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_110 === 1 ? true : false} value={answer.campo_107} textOption={textOption} fontWeight='normal' question='2 - Para uso no processo de ensino e aprendizagem*' onSelect={(option) => handleOptionChange('campo_107', option)} />
                    {formErrors.campo_107 && <Text style={styles.messageError}>{formErrors.campo_107}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_110 === 1 ? true : false} value={answer.campo_108} textOption={textOption} fontWeight='normal' question='3 - Para uso dos aluno(a)s*' onSelect={(option) => handleOptionChange('campo_108', option)} />
                    {formErrors.campo_108 && <Text style={styles.messageError}>{formErrors.campo_108}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_110 === 1 ? true : false} value={answer.campo_109} textOption={textOption} fontWeight='normal' question='4 - Para uso da comunidade*' onSelect={(option) => handleOptionChange('campo_109', option)} />
                    {formErrors.campo_109 && <Text style={styles.messageError}>{formErrors.campo_109}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default AcessoInternet;
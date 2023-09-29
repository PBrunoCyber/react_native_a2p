import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IDestinacaoDoLixo } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    destinacaoDoLixo: (value: IDestinacaoDoLixo) => void,
    formErrors: any,
    context: IDestinacaoDoLixo
}

const DestinacaoDoLixo = ({ destinacaoDoLixo, formErrors, context }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IDestinacaoDoLixo>(context);
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        destinacaoDoLixo(answer);
        for (const key in answer) {
            if (answer[key as keyof IDestinacaoDoLixo]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_31: null, campo_32: null, campo_33: null, campo_34: null, campo_35: null });
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
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>V - DESTINAÇÃO DO LIXO</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.destinacaoDoLixo && <Text style={styles.messageError}>{formErrors.destinacaoDoLixo}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_31} textOption={textOption} fontWeight='bold' question='1 - Serviço de Coleta*' onSelect={(option) => handleOptionChange('campo_31', option)} />
                    {formErrors.campo_31 && <Text style={styles.messageError}>{formErrors.campo_31}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_32} textOption={textOption} fontWeight='bold' question='2 - Queima*' onSelect={(option) => handleOptionChange('campo_32', option)} />
                    {formErrors.campo_32 && <Text style={styles.messageError}>{formErrors.campo_32}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_33} textOption={textOption} fontWeight='bold' question='3 - Enterra*' onSelect={(option) => handleOptionChange('campo_33', option)} />
                    {formErrors.campo_33 && <Text style={styles.messageError}>{formErrors.campo_33}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_34} textOption={textOption} fontWeight='bold' question='4 - Leva a uma destinação final licenciada pelo poder público*' onSelect={(option) => handleOptionChange('campo_34', option)} />
                    {formErrors.campo_34 && <Text style={styles.messageError}>{formErrors.campo_34}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_35} textOption={textOption} fontWeight='bold' question='5 - Descarta em outra área*' onSelect={(option) => handleOptionChange('campo_35', option)} />
                    {formErrors.campo_35 && <Text style={styles.messageError}>{formErrors.campo_35}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default DestinacaoDoLixo;
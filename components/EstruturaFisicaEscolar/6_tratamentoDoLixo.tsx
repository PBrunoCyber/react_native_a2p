import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { ITratamentoDoLixo } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    tratamentoDoLixo: (value: ITratamentoDoLixo) => void,
    formErrors: any,
    context: ITratamentoDoLixo
}

const TratamentoDoLixo = ({ formErrors, tratamentoDoLixo, context }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ITratamentoDoLixo>(context);
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_39' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_36']: null,
                ['campo_37']: null,
                ['campo_38']: null,
            }));
        }
        if (question === "campo_36" && answer !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_37']: null,
                ['campo_38']: null,
            }));
        }
    }

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_36: null, campo_37: null, campo_38: null, campo_39: 0 });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        tratamentoDoLixo(answer);
        for (const key in answer) {
            if (answer[key as keyof ITratamentoDoLixo]) {
                setIsClicked(true);
            }
        }
        if (context === answer) setIsClicked(false);
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])


    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>VI - TRATAMENTO DO LIXO/RESÍDUOS QUE A ESCOLA REALIZA</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' style={{ width: 30 }} color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' style={{ width: 30 }} color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.tratamentoDoLixo && <Text style={styles.messageError}>{formErrors.tratamentoDoLixo}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_39} label='Não há tratamento*' onSelect={(value) => handleOptionChange('campo_39', value)} />
                    {formErrors.campo_39 && <Text style={styles.messageError}>{formErrors.campo_39}</Text>}
                    <Text style={{ fontWeight: "bold", marginTop: 40, marginBottom: 0 }}>Tratamento do lixo/resíduos</Text>
                    <RadioGroup options={[1, 0]} disable={answer.campo_39 === 1 ? true : false} value={answer.campo_36} textOption={textOption} fontWeight='normal' question='a) Separação do lixo/resíduos*' onSelect={(option) => handleOptionChange('campo_36', option)} />
                    {formErrors.campo_36 && <Text style={styles.messageError}>{formErrors.campo_36}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_39 === 1 || answer.campo_36 !== 1 ? true : false} value={answer.campo_37} textOption={textOption} fontWeight='normal' question='b) Reaproveitamento/reutilização*' onSelect={(option) => handleOptionChange('campo_37', option)} />
                    {formErrors.campo_37 && <Text style={styles.messageError}>{formErrors.campo_37}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_39 === 1 || answer.campo_36 !== 1 ? true : false} value={answer.campo_38} textOption={textOption} fontWeight='normal' question='c) Reciclagem*' onSelect={(option) => handleOptionChange('campo_38', option)} />
                    {formErrors.campo_38 && <Text style={styles.messageError}>{formErrors.campo_38}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default TratamentoDoLixo;
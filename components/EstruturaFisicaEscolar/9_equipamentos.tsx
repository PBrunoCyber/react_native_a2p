import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEquipamentos } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    equipamentos?: (value: IEquipamentos) => void,
    formErrors?: any,
    data?: IEquipamentos,
    editData?: IEquipamentos
}


const Equipamentos = ({ formErrors, equipamentos, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEquipamentos>(data || editData || { campo_91: null, campo_92: null, campo_93: null, campo_94: null, campo_95: null, campo_96: null, campo_97: 0 });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        equipamentos &&
            equipamentos(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_91: null, campo_92: null, campo_93: null, campo_94: null, campo_95: null, campo_96: null, campo_97: 0 });
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
        if (question === 'campo_97' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_91']: null,
                ['campo_92']: null,
                ['campo_93']: null,
                ['campo_94']: null,
                ['campo_95']: null,
                ['campo_96']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>IX - EQUIPAMENTOS EXISTENTES NA ESCOLA PARA USO TÉCNICO E ADMINISTRATIVO</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.equipamentos && <Text style={styles.messageError}>{formErrors?.equipamentos}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_97} label='Nenhum dos equipamentos listados' onSelect={(value) => handleOptionChange('campo_97', value)} />
                    {formErrors?.campo_97 && <Text style={styles.messageError}>{formErrors?.campo_97}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_91} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_91} textOption={textOption} fontWeight='normal' question='1 - Antena parabólica*' onSelect={(option) => handleOptionChange('campo_91', option)} />
                    {formErrors?.campo_91 && <Text style={styles.messageError}>{formErrors?.campo_91}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_92} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_92} textOption={textOption} fontWeight='normal' question='2 - Computadores*' onSelect={(option) => handleOptionChange('campo_92', option)} />
                    {formErrors?.campo_92 && <Text style={styles.messageError}>{formErrors?.campo_92}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_93} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_93} textOption={textOption} fontWeight='normal' question='3 - Copiadora*' onSelect={(option) => handleOptionChange('campo_93', option)} />
                    {formErrors?.campo_93 && <Text style={styles.messageError}>{formErrors?.campo_93}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_94} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_94} textOption={textOption} fontWeight='normal' question='4 - Impressora*' onSelect={(option) => handleOptionChange('campo_94', option)} />
                    {formErrors?.campo_94 && <Text style={styles.messageError}>{formErrors?.campo_94}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_95} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_95} textOption={textOption} fontWeight='normal' question='5 - Impressora Multifuncional*' onSelect={(option) => handleOptionChange('campo_95', option)} />
                    {formErrors?.campo_95 && <Text style={styles.messageError}>{formErrors?.campo_95}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_96} disable={answer.campo_97 === 1 || data ? true : false} value={answer.campo_96} textOption={textOption} fontWeight='normal' question='6 - Scanner*' onSelect={(option) => handleOptionChange('campo_96', option)} />
                    {formErrors?.campo_96 && <Text style={styles.messageError}>{formErrors?.campo_96}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default Equipamentos;
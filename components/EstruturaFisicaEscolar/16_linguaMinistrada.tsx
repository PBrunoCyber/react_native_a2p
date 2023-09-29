import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IInstrumentosEMateriais, ILinguaMinistrada } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';
import { useFocusEffect } from 'expo-router';

interface IProps {
    linguaMinistrada?: (value: ILinguaMinistrada) => void,
    answerInstrumentosEMateriais?: IInstrumentosEMateriais | undefined
    formErrors?: any,
}

const LinguaMinistrada = ({ formErrors, linguaMinistrada, answerInstrumentosEMateriais }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ILinguaMinistrada>({ campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        linguaMinistrada &&
            linguaMinistrada(answer);
        for (const key in answer) {
            if (answer[key as keyof ILinguaMinistrada]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
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
        if (question === 'campo_149' && answer !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_151']: '',
                ['campo_152']: '',
                ['campo_153']: ''
            }));
        }

        if (question === 'campo_151' && !answer) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_152']: '',
                ['campo_153']: ''
            }));
        }
        if (question === 'campo_152' && !answer) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_153']: ''
            }));
        }

    }

    useEffect(() => {
        if (answerInstrumentosEMateriais?.campo_148 !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_149']: null,
                ['campo_150']: null
            }));
        }
    }, [answerInstrumentosEMateriais])

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XVI - LÍNGUA EM QUE O ENSINO É MINISTRADO</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.linguaMinistrada && <Text style={styles.messageError}>{formErrors?.linguaMinistrada}</Text>}
                    <RadioGroup options={[1, 0]} disable={answerInstrumentosEMateriais?.campo_148 !== 1 ? true : false} value={answer.campo_150} textOption={textOption} fontWeight='normal' question='1 - Língua Portuguesa*' onSelect={(option) => handleOptionChange('campo_150', option)} />
                    {formErrors?.campo_150 && <Text style={styles.messageError}>{formErrors?.campo_150}</Text>}
                    <RadioGroup options={[1, 0]} disable={answerInstrumentosEMateriais?.campo_148 !== 1 ? true : false} value={answer.campo_149} textOption={textOption} fontWeight='normal' question='2 - Língua Indígena*' onSelect={(option) => handleOptionChange('campo_149', option)} />
                    {formErrors?.campo_149 && <Text style={styles.messageError}>{formErrors?.campo_149}</Text>}
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>a) Código da língua indígena 1*</Text>
                            <View style={{ maxWidth: 300 }}>
                                <TextInput maxLength={5} value={answer?.campo_151} style={[styles.input, answer.campo_149 !== 1 ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_149 === 1 ? true : false} onChangeText={(txt) => handleOptionChange('campo_151', txt)} />
                                {formErrors?.campo_151 && <Text style={styles.messageError}>{formErrors?.campo_151}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>b) Código da língua indígena 2*</Text>
                            <View style={{ maxWidth: 300 }}>
                                <TextInput maxLength={5} value={answer?.campo_152} style={[styles.input, !answer?.campo_151 ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_151 ? true : false} onChangeText={(txt) => handleOptionChange('campo_152', txt)} />
                                {formErrors?.campo_152 && <Text style={styles.messageError}>{formErrors?.campo_152}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>c) Código da língua indígena 3*</Text>
                            <View style={{ maxWidth: 300 }}>
                                <TextInput maxLength={5} value={answer?.campo_153} style={[styles.input, !answer?.campo_152 ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer.campo_152 ? true : false} onChangeText={(txt) => handleOptionChange('campo_153', txt)} />
                                {formErrors?.campo_153 && <Text style={styles.messageError}>{formErrors?.campo_153}</Text>}
                            </View>
                        </View>
                    </View>
                </View>
                : null
            }

        </View >
    );
}

export default LinguaMinistrada;

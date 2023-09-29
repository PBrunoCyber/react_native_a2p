import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IAcessoInternet, IEquipamentosAlunosInternet, IRedeLocal } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    equipamentosAlunosInternet: (value: IEquipamentosAlunosInternet) => void,
    answerAcessoInternet: IAcessoInternet | undefined,
    answerRedeLocal: IRedeLocal | undefined,
    formErrors: any,
    context: IEquipamentosAlunosInternet
}


const EquipamentosAlunosInternet = ({ equipamentosAlunosInternet, answerAcessoInternet, answerRedeLocal, formErrors, context }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEquipamentosAlunosInternet>(context);
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        equipamentosAlunosInternet(answer);
        for (const key in answer) {
            if (answer[key as keyof IEquipamentosAlunosInternet]) {
                setIsClicked(true);
            }
        }
        if (answer === context) setIsClicked(false);
    }, [answer])


    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_111: null, campo_112: null, campo_113: null });
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

    useEffect(() => {
        if (answerAcessoInternet?.campo_108 === 0 || answerAcessoInternet?.campo_108 === null || answerRedeLocal?.campo_115 === 0) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_112']: null,
            }));
        }
        if (answerAcessoInternet?.campo_108 === 0 || answerAcessoInternet?.campo_108 === null) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_111']: null,
            }));
        }
    }, [answerAcessoInternet, answerRedeLocal])

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XI - EQUIPAMENTOS QUE OS ALUNOS USAM PARA ACESSAR A INTERNET DA ESCOLA</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} disable={(answerAcessoInternet?.campo_108 === 0 || answerAcessoInternet?.campo_108 === null) ? true : false} value={answer.campo_111} textOption={textOption} fontWeight='normal' question='1 - Computadores de mesa, portáteis e tablets da escola (no laboratório de informática, biblioteca, sala de aula etc.)*' onSelect={(option) => handleOptionChange('campo_111', option)} />
                    {formErrors.campo_111 && <Text style={styles.messageError}>{formErrors.campo_111}</Text>}
                    <RadioGroup options={[1, 0]} disable={(answerAcessoInternet?.campo_108 === 0 || answerAcessoInternet?.campo_108 === null || answerRedeLocal?.campo_115 === 0) ? true : false} value={answer.campo_112} textOption={textOption} fontWeight='normal' question='2 - Dispositivos pessoais (computadores portáteis, celulares, tablets etc.)*' onSelect={(option) => handleOptionChange('campo_112', option)} />
                    {formErrors.campo_112 && <Text style={styles.messageError}>{formErrors.campo_112}</Text>}
                    <RadioGroup options={[1, 0]} disable={(answerAcessoInternet?.campo_110 === 1) ? true : false} value={answer.campo_113} textOption={textOption} fontWeight='normal' question='3 - Internet banda larga*' onSelect={(option) => handleOptionChange('campo_113', option)} />
                    {formErrors.campo_113 && <Text style={styles.messageError}>{formErrors.campo_113}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default EquipamentosAlunosInternet;
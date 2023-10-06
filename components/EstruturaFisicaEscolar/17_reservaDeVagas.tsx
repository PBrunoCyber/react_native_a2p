import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IReservaDeVagas, IUltimasPerguntas } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';
import { useFocusEffect } from 'expo-router';

interface IProps {
    reservaDeVagas?: (value: IReservaDeVagas) => void,
    formErrors?: any,
    exameClassificatorio?: number | null,
    data?: IReservaDeVagas,
    editData?: IReservaDeVagas
}

const ReservaDeVagas = ({ reservaDeVagas, exameClassificatorio, formErrors, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IReservaDeVagas>(data || editData || { campo_155: null, campo_156: null, campo_157: null, campo_158: null, campo_159: null, campo_160: 0, campo_161: null, campo_162: null, campo_163: null });
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_160' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_155']: null,
                ['campo_156']: null,
                ['campo_157']: null,
                ['campo_158']: null,
                ['campo_159']: null,
            }));
        }
    }

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_155: null, campo_156: null, campo_157: null, campo_158: null, campo_159: null, campo_160: 0, campo_161: null, campo_162: null, campo_163: null });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        reservaDeVagas &&
            reservaDeVagas(answer);
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    useEffect(() => {
        if (exameClassificatorio !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_155']: null,
                ['campo_156']: null,
                ['campo_157']: null,
                ['campo_158']: null,
                ['campo_159']: null,
            }));
        }
    }, [exameClassificatorio])

    return (
        <View style={{ marginTop: 20, zIndex: -1 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XVII - RESERVA DE VAGAS POR SISTEMA DE COTAS PARA GRUPOS ESPECÍFICOS DE ALUNO(A)S</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.reservaDeVagas && <Text style={styles.messageError}>{formErrors?.reservaDeVagas}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_160} label='Sem reservas de vagas para sistema de cotas (ampla concorrência)' onSelect={(value) => handleOptionChange('campo_160', value)} />
                    {formErrors?.campo_160 && <Text style={styles.messageError}>{formErrors?.campo_160}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_155} disable={answer.campo_160 === 1 || exameClassificatorio !== 1 || data ? true : false} value={answer.campo_155} textOption={textOption} fontWeight='normal' question='1 - Autodeclarado preto, pardo ou indígena (PPI)*' onSelect={(option) => handleOptionChange('campo_155', option)} />
                    {formErrors?.campo_155 && <Text style={styles.messageError}>{formErrors?.campo_155}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_156} disable={answer.campo_160 === 1 || exameClassificatorio !== 1 || data ? true : false} value={answer.campo_156} textOption={textOption} fontWeight='normal' question='2 - Condição de renda*' onSelect={(option) => handleOptionChange('campo_156', option)} />
                    {formErrors?.campo_156 && <Text style={styles.messageError}>{formErrors?.campo_156}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_157} disable={answer.campo_160 === 1 || exameClassificatorio !== 1 || data ? true : false} value={answer.campo_157} textOption={textOption} fontWeight='normal' question='3 - Oriundo de escola pública*' onSelect={(option) => handleOptionChange('campo_157', option)} />
                    {formErrors?.campo_157 && <Text style={styles.messageError}>{formErrors?.campo_157}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_158} disable={answer.campo_160 === 1 || exameClassificatorio !== 1 || data ? true : false} value={answer.campo_158} textOption={textOption} fontWeight='normal' question='4 - Pessoa com deficiência (PCD)*' onSelect={(option) => handleOptionChange('campo_158', option)} />
                    {formErrors?.campo_158 && <Text style={styles.messageError}>{formErrors?.campo_158}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_159} disable={answer.campo_160 === 1 || exameClassificatorio !== 1 || data ? true : false} value={answer.campo_159} textOption={textOption} fontWeight='normal' question='5 - Outros grupos que não os listados*' onSelect={(option) => handleOptionChange('campo_159', option)} />
                    {formErrors?.campo_159 && <Text style={styles.messageError}>{formErrors?.campo_159}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_161} disable={data ? true : false} value={answer.campo_161} textOption={textOption} fontWeight='normal' question='7 - A escola possui site ou blog ou página em redes sociais para comunicação institucional' onSelect={(option) => handleOptionChange('campo_161', option)} />
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_162} disable={data ? true : false} value={answer.campo_162} textOption={textOption} fontWeight='normal' question='8 - A escola compartilha espaços para atividades de integração escola-comunidade' onSelect={(option) => handleOptionChange('campo_162', option)} />
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_163} disable={data ? true : false} value={answer.campo_163} textOption={textOption} fontWeight='normal' question='9 - A escola usa espaços e equipamentos do entorno escolar para atividades regulares com os aluno(a)s' onSelect={(option) => handleOptionChange('campo_163', option)} />
                </View>
                : null
            }

        </View >
    );
}

export default ReservaDeVagas;

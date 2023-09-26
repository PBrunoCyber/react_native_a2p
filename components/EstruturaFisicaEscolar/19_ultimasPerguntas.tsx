import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IUltimasPerguntas } from '../../types/EstruturaFisicaEscolar';

interface IProps {
    ultimasPerguntas: (value: IUltimasPerguntas) => void,
}

const UltimasPerguntas = ({ ultimasPerguntas }: IProps) => {
    const [answer, setAnswers] = useState<IUltimasPerguntas>(
        {
            campo_154: null,
            campo_170: null
        }
    );
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        ultimasPerguntas(answer);
    }, [answer])

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
    }

    return (
        <View style={{ marginTop: 50 }}>
            <View style={styles.formContainer}>
                <RadioGroup options={[1, 0]} value={answer.campo_154} textOption={textOption} color={COLORS.green} fontWeight='bold' question='A escola faz exame de seleção para ingresso de seus aluno(a)s (avaliação por prova e /ou analise curricular)*' onSelect={(option) => handleOptionChange('campo_154', option)} />
                <RadioGroup options={[1, 0]} value={answer.campo_170} textOption={textOption} color={COLORS.green} fontWeight='bold' question='O projeto político pedagógico ou a proposta pedagógica da escola (conforme art. 12 da LDB) foi atualizada nos últimos 12 meses até a data de referência*' onSelect={(option) => handleOptionChange('campo_170', option)} />
            </View>
        </View >
    );
}

export default UltimasPerguntas;
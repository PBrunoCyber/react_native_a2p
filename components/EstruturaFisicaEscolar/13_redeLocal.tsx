import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IRedeLocal } from '../../types/EstruturaFisicaEscolar';



const RedeLocal = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IRedeLocal>(
        {
            campo_116: 0,
            campo_114: null,
            campo_115: null
        }
    );
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XIII - REDE LOCAL DE INTERLIGAÇÃO DE COMPUTADORES</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_116} label='Não há rede local interligando computadores*' onSelect={(value) => handleOptionChange('campo_116', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_114} textOption={textOption} fontWeight='normal' question='1 - A cabo*' onSelect={(option) => handleOptionChange('campo_114', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_115} textOption={textOption} fontWeight='normal' question='2 - Wireless*' onSelect={(option) => handleOptionChange('campo_115', option)} />
                </View>
            }

        </View >
    );
}

export default RedeLocal;
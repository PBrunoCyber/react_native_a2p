import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import {ITratamentoDoLixo } from '../../types/EstruturaFisicaEscolar';



const TratamentoDoLixo = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ITratamentoDoLixo>(
        {
            campo_39: 0,
            campo_36: null,
            campo_37: null,
            campo_38: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>VI - TRATAMENTO DO LIXO/RESÍDUOS QUE A ESCOLA REALIZA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_39} label='Não há tratamento*' onSelect={(value) => handleOptionChange('campo_39', value)} />
                    <Text style={{fontWeight:"bold", marginTop: 40, marginBottom: 0}}>Tratamento do lixo/resíduos</Text>
                    <RadioGroup options={[1, 0]} value={answer.campo_36} textOption={textOption} fontWeight='normal' question='a) Separação do lixo/resíduos*' onSelect={(option) => handleOptionChange('campo_36', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_37} textOption={textOption} fontWeight='normal' question='b) Reaproveitamento/reutilização*' onSelect={(option) => handleOptionChange('campo_37', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_38} textOption={textOption} fontWeight='normal' question='c) Reciclagem*' onSelect={(option) => handleOptionChange('campo_38', option)} />
                </View>
            }

        </View>
    );
}

export default TratamentoDoLixo;
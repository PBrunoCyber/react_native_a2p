import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEsgotamentoSanitario } from '../../types/EstruturaFisicaEscolar';



const EsgotamentoSanitario = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEsgotamentoSanitario>(
        {
            campo_30: 0,
            campo_27: null,
            campo_28: null,
            campo_29: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>IV - ESGOTAMENTO SANITÁRIO</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_30} label='Não há esgotamento sanitário*' onSelect={(value) => handleOptionChange('campo_30', value)} />
                    <Text style={{fontWeight:"bold", marginTop: 40, marginBottom: 0}}>Esgotamento Sanitário</Text>
                    <RadioGroup options={[1, 0]} value={answer.campo_27} textOption={textOption} fontWeight='normal' question='a) Rede Pública*' onSelect={(option) => handleOptionChange('campo_27', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_28} textOption={textOption} fontWeight='normal' question='b) Fossa séptica*' onSelect={(option) => handleOptionChange('campo_28', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_29} textOption={textOption} fontWeight='normal' question='c) Fossa rudimentar/comum*' onSelect={(option) => handleOptionChange('campo_29', option)} />
                </View>
            }

        </View>
    );
}

export default EsgotamentoSanitario;
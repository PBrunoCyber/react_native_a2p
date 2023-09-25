import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IAcessoInternet } from '../../types/EstruturaFisicaEscolar';



const AcessoInternet = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IAcessoInternet>(
        {
            campo_110: 0,
            campo_106: null,
            campo_107: null,
            campo_108: null,
            campo_109: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XI - ACESSO À INTERNET</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_110} label='Não possui acesso à internet*' onSelect={(value) => handleOptionChange('campo_110', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_106} textOption={textOption} fontWeight='normal' question='1 - Para uso administrativo*' onSelect={(option) => handleOptionChange('campo_106', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_107} textOption={textOption} fontWeight='normal' question='2 - Para uso no processo de ensino e aprendizagem*' onSelect={(option) => handleOptionChange('campo_107', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_108} textOption={textOption} fontWeight='normal' question='3 - Para uso dos aluno(a)s*' onSelect={(option) => handleOptionChange('campo_108', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_109} textOption={textOption} fontWeight='normal' question='4 - Para uso da comunidade*' onSelect={(option) => handleOptionChange('campo_109', option)} />
                </View>
            }

        </View >
    );
}

export default AcessoInternet;
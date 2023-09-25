import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEquipamentosAlunosInternet } from '../../types/EstruturaFisicaEscolar';



const EquipamentosAlunosInternet = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEquipamentosAlunosInternet>(
        {
            campo_111: null,
            campo_112: null,
            campo_113: null
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XII - EQUIPAMENTOS QUE OS ALUNOS USAM PARA ACESSAR A INTERNET DA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} value={answer.campo_111} textOption={textOption} fontWeight='normal' question='1 - Computadores de mesa, portáteis e tablets da escola (no laboratório de informática, biblioteca, sala de aula etc.)*' onSelect={(option) => handleOptionChange('campo_111', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_112} textOption={textOption} fontWeight='normal' question='2 - Dispositivos pessoais (computadores portáteis, celulares, tablets etc.)*' onSelect={(option) => handleOptionChange('campo_112', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_113} textOption={textOption} fontWeight='normal' question='3 - Internet banda larga*' onSelect={(option) => handleOptionChange('campo_113', option)} />
                </View>
            }

        </View >
    );
}

export default EquipamentosAlunosInternet;
import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEquipamentos } from '../../types/EstruturaFisicaEscolar';



const Equipamentos = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEquipamentos>(
        {
            campo_97: 0,
            campo_91: null,
            campo_92: null,
            campo_93: null,
            campo_94: null,
            campo_95: null,
            campo_96: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>IX - EQUIPAMENTOS EXISTENTES NA ESCOLA PARA USO TÉCNICO E ADMINISTRATIVO</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_97} label='Nenhum dos equipamentos listados*' onSelect={(value) => handleOptionChange('campo_97', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_91} textOption={textOption} fontWeight='normal' question='1 - Antena parabólica*' onSelect={(option) => handleOptionChange('campo_91', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_92} textOption={textOption} fontWeight='normal' question='2 - Computadores*' onSelect={(option) => handleOptionChange('campo_92', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_93} textOption={textOption} fontWeight='normal' question='3 - Copiadora*' onSelect={(option) => handleOptionChange('campo_93', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_94} textOption={textOption} fontWeight='normal' question='4 - Impressora*' onSelect={(option) => handleOptionChange('campo_94', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_95} textOption={textOption} fontWeight='normal' question='5 - Impressora Multifuncional*' onSelect={(option) => handleOptionChange('campo_95', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_96} textOption={textOption} fontWeight='normal' question='6 - Scanner*' onSelect={(option) => handleOptionChange('campo_96', option)} />
                </View>
                    
            }

        </View >
    );
}

export default Equipamentos;
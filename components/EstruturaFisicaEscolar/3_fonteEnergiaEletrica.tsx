import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEnergiaEletrica } from '../../types/EstruturaFisicaEscolar';



const FonteEnergiaEletrica = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEnergiaEletrica>(
        {
            campo_26: 0,
            campo_23: null,
            campo_24: null,
            campo_25: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>III - FONTE DE ENERGIA ELÉTRICA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_26} label='Não há energia elétrica*' onSelect={(value) => handleOptionChange('campo_26', value)} />
                    <Text style={{fontWeight:"bold", marginTop: 40, marginBottom: 0}}>Fonte de energia elétrica*</Text>
                    <RadioGroup options={[1, 0]} value={answer.campo_23} textOption={textOption} fontWeight='normal' question='a) Rede Pública*' onSelect={(option) => handleOptionChange('campo_23', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_24} textOption={textOption} fontWeight='normal' question='b) Gerador movido a combustível fóssil*' onSelect={(option) => handleOptionChange('campo_24', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_25} textOption={textOption} fontWeight='normal' question='c) Fontes de energia renováveis ou alternativas (gerador a biocombustível e/ou biodigestores, eólica, solar, outras)*' onSelect={(option) => handleOptionChange('campo_25', option)} />
                </View>
            }

        </View>
    );
}

export default FonteEnergiaEletrica;
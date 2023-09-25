import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IDestinacaoDoLixo} from '../../types/EstruturaFisicaEscolar';



const DestinacaoDoLixo = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IDestinacaoDoLixo>(
        {
            campo_31: null,
            campo_32: null,
            campo_33: null,
            campo_34: null,
            campo_35: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>V - DESTINAÇÃO DO LIXO</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} value={answer.campo_31} textOption={textOption} fontWeight='bold' question='1 - Serviço de Coleta*' onSelect={(option) => handleOptionChange('campo_31', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_32} textOption={textOption} fontWeight='bold' question='2 - Queima*' onSelect={(option) => handleOptionChange('campo_32', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_33} textOption={textOption} fontWeight='bold' question='3 - Enterra*' onSelect={(option) => handleOptionChange('campo_33', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_34} textOption={textOption} fontWeight='bold' question='4 - Leva a uma destinação final licenciada pelo poder público*' onSelect={(option) => handleOptionChange('campo_34', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_35} textOption={textOption} fontWeight='bold' question='5 - Descarta em outra área*' onSelect={(option) => handleOptionChange('campo_35', option)} />
                </View>
            }

        </View>
    );
}

export default DestinacaoDoLixo;
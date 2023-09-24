import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from './RadioGroup';
import CheckBox from './CheckBox';


interface IQuestions {
    campo_17: number | null,
    campo_18: number | null,
    campo_19: number | null,
    campo_20: number | null,
    campo_21: number | null,
    campo_22: 0 | 1,
}


const AbastecimentoDeAgua = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IQuestions>(
        {
            campo_17: null,
            campo_18: null,
            campo_19: null,
            campo_20: null,
            campo_21: null,
            campo_22: 0
        }
    );
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_22' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_17']: null,
                ['campo_18']: null,
                ['campo_19']: null,
                ['campo_20']: null,
                ['campo_21']: null,
            }));
        }
        if (question === 'campo_17' && answer === 0) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_18']: null,
                ['campo_19']: null,
                ['campo_20']: null,
                ['campo_21']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>II - ABASTECIMENTO DE ÁGUA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_22} label='Não há abastecimento de água*' onSelect={(value) => handleOptionChange('campo_22', value)} />
                    {answer.campo_22 === 0 &&
                        <>
                            <RadioGroup options={[1, 0]} value={answer.campo_17} textOption={textOption} fontWeight='bold' question='Fornece água potável para consumo humano*' onSelect={(option) => handleOptionChange('campo_17', option)} />
                            {answer.campo_17 === 1 &&
                                <>
                                    <RadioGroup options={[1, 0]} value={answer.campo_18} textOption={textOption} fontWeight='normal' question='a) Rede Pública' onSelect={(option) => handleOptionChange('campo_18', option)} />
                                    <RadioGroup options={[1, 0]} value={answer.campo_19} textOption={textOption} fontWeight='normal' question='b) Poço Artesiano' onSelect={(option) => handleOptionChange('campo_19', option)} />
                                    <RadioGroup options={[1, 0]} value={answer.campo_20} textOption={textOption} fontWeight='normal' question='c) Cacimba / Cisterna / Poço' onSelect={(option) => handleOptionChange('campo_20', option)} />
                                    <RadioGroup options={[1, 0]} value={answer.campo_21} textOption={textOption} fontWeight='normal' question='d) Fonte / Rio / Igarapé / Riacho / Córrego' onSelect={(option) => handleOptionChange('campo_21', option)} />
                                </>
                            }

                        </>
                    }
                </View>
            }

        </View>
    );
}

export default AbastecimentoDeAgua;
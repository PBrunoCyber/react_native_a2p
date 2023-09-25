import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IOrgaosColegiados } from '../../types/EstruturaFisicaEscolar';



const OrgaosColegiados = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IOrgaosColegiados>(
        {
            campo_169: 0,
            campo_164: null,
            campo_165: null,
            campo_166: null,
            campo_167: null,
            campo_168: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XVIII - ÓRGÃOS COLEGIADOS EM FUNCIONAMENTO NA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_169} label='Não há órgãos colegiados em funcionamento*' onSelect={(value) => handleOptionChange('campo_169', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_164} textOption={textOption} fontWeight='normal' question='1 - Associação de Pais*' onSelect={(option) => handleOptionChange('campo_164', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_165} textOption={textOption} fontWeight='normal' question='2 - Associação de pais e mestres*' onSelect={(option) => handleOptionChange('campo_165', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_166} textOption={textOption} fontWeight='normal' question='3 - Conselho escolar*' onSelect={(option) => handleOptionChange('campo_166', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_167} textOption={textOption} fontWeight='normal' question='4 - Grêmio estudantil*' onSelect={(option) => handleOptionChange('campo_167', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_168} textOption={textOption} fontWeight='normal' question='5 - Outros*' onSelect={(option) => handleOptionChange('campo_168', option)} />
                </View>
            }
            
        </View >
    );
}

export default OrgaosColegiados;
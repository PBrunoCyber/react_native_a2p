import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { ILinguaMinistrada } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';



const LinguaMinistrada = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ILinguaMinistrada>(
        {
            campo_149: null,
            campo_150: null,
            campo_151: '',
            campo_152: '',
            campo_153: '',

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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold', maxWidth: 700 } : { color: COLORS.black, maxWidth: 700 }}>XVI - LÍNGUA EM QUE O ENSINO É MINISTRADO</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} value={answer.campo_150} textOption={textOption} fontWeight='normal' question='1 - Língua Portuguesa*' onSelect={(option) => handleOptionChange('campo_150', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_149} textOption={textOption} fontWeight='normal' question='2 - Língua Indígena*' onSelect={(option) => handleOptionChange('campo_149', option)} />
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>a) Código da língua indígena 1*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_151', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>b) Código da língua indígena 2*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_152', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>c) Código da língua indígena 3*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_153', txt)} />
                            </View>
                        </View>
                    </View>
                </View>
            }

        </View >
    );
}

export default LinguaMinistrada;

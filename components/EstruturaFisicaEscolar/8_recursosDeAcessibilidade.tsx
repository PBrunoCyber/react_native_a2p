import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IRecursosDeAcessibilidade } from '../../types/EstruturaFisicaEscolar';



const RecursosDeAcessibilidade = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IRecursosDeAcessibilidade>(
        {
            campo_86: 0,
            campo_78: null,
            campo_79: null,
            campo_80: null,
            campo_81: null,
            campo_82: null,
            campo_83: null,
            campo_84: null,
            campo_85: null,
            campo_87: "",
            campo_88: "",
            campo_89: "",
            campo_90: "",
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>VIII - RECURSOS DE ACESSIBILIDADE</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_86} label='Nenhum dos recursos de acessibilidade listados*' onSelect={(value) => handleOptionChange('campo_86', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_78} textOption={textOption} fontWeight='normal' question='1 - Corrimão e guarda-corpos*' onSelect={(option) => handleOptionChange('campo_78', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_79} textOption={textOption} fontWeight='normal' question='2 - Elevador*' onSelect={(option) => handleOptionChange('campo_79', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_80} textOption={textOption} fontWeight='normal' question='3 - Pisos Táteis*' onSelect={(option) => handleOptionChange('campo_80', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_81} textOption={textOption} fontWeight='normal' question='4 - Portas com vão livre de no mínimo 80 cm*' onSelect={(option) => handleOptionChange('campo_81', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_82} textOption={textOption} fontWeight='normal' question='5 - Rampas*' onSelect={(option) => handleOptionChange('campo_82', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_83} textOption={textOption} fontWeight='normal' question='6 - Sinalização sonora*' onSelect={(option) => handleOptionChange('campo_83', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_84} textOption={textOption} fontWeight='normal' question='7 - Sinalização tátil*' onSelect={(option) => handleOptionChange('campo_84', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_85} textOption={textOption} fontWeight='normal' question='8 - Sinalização visual (piso/paredes)*' onSelect={(option) => handleOptionChange('campo_85', option)} />
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>9 - Número de salas de aula utilizadas na escola dentro do prédio escolar*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_87', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>10 - Número de salas de aula utilizadas na escola fora do prédio escolar*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_88', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50}]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>11 - Número de salas de aula climatizadas (ar condicionado, aquecedor ou climatizador)*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_89', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 50 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>12 - Número de salas de aula com acessibilidade para pessoas com deficiência ou mobilidade reduzida*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_90', txt)} />
                            </View>
                        </View>
                    </View>
                </View>
                    
            }

        </View >
    );
}

export default RecursosDeAcessibilidade;
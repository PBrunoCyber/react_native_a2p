import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../styles/localDeFuncionamento.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from './RadioGroup';


interface IQuestions {
    campo_3: number | null,
    campo_4: number | null,
    campo_5: number | null,
    campo_6: number | null,
    campo_7: number | null,
    campo_8: number | null,
    campo_9: number | null,
    campo_10: number | null,
    campo_11: string,
    campo_12: string,
    campo_13: string,
    campo_14: string,
    campo_15: string,
    campo_16: string,
}


const AbastecimentoDeAgua = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IQuestions>(
        {
            campo_3: null,
            campo_4: null,
            campo_5: null,
            campo_6: null,
            campo_7: null,
            campo_8: null,
            campo_9: null,
            campo_10: null,
            campo_11: '',
            campo_12: '',
            campo_13: '',
            campo_14: '',
            campo_15: '',
            campo_16: '',
        }
    );
    const textOption = ["SIM", "NÃO"]

    const handleOptionChange = (question: string, resposta: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: resposta
        }));
        if (question === 'campo_3' && resposta === 0){
            setAnswers((prevAnswer)=> ({
                ...prevAnswer,
                ['campo_9']: null,
                ['campo_10']: null
            }));
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>I - LOCAL DE FUNCIONAMENTO DA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} value={answer.campo_3} textOption={textOption} fontWeight='bold' question='1 - Prédio Escolar*' onSelect={(option) => handleOptionChange('campo_3', option)} />
                    {answer.campo_3 === 1 ?
                        <>
                            <RadioGroup options={[0, 1, 2]} value={answer.campo_9} textOption={["Próprio", "Cedido", "Alugado"]} fontWeight='normal' question='a) Tipo de Imóvel*' onSelect={(option) => handleOptionChange('campo_9', option)} />
                            <RadioGroup options={[1, 0]} value={answer.campo_10} textOption={textOption} fontWeight='normal' question='b) Prédio Escolar Compartilhado com Outra Escola*' onSelect={(option) => handleOptionChange('campo_10', option)} />
                            <View style={{ marginTop: 40 }}>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                                    <Text style={{ flexGrow: 1 }}>i) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_11 : answer.campo_11 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_11', txt)} />
                                </View>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                                    <Text style={{ flexGrow: 1 }}>ii) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_12 : answer.campo_12 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_12', txt)} />
                                </View>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                                    <Text style={{ flexGrow: 1 }}>iii) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_13 : answer.campo_13 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_13', txt)} />
                                </View>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                                    <Text style={{ flexGrow: 1 }}>iv) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_14 : answer.campo_14 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_14', txt)} />
                                </View>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                                    <Text style={{ flexGrow: 1 }}>v) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_15 : answer.campo_15 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_15', txt)} />
                                </View>
                                <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 0 }]}>
                                    <Text style={{ flexGrow: 1 }}>vi) Código da escola com a qual compartilha*</Text>
                                    <TextInput value={answer.campo_10 == 1 ? answer.campo_16 : answer.campo_16 = ''} style={[styles.input, answer.campo_10 == 0 || answer.campo_10 == null ? { backgroundColor: COLORS.lightGray } : { backgroundColor: 'trasparent' }]} aria-disabled={answer.campo_10 == 0 || answer.campo_10 == null ? true : false} onChangeText={(txt) => handleOptionChange('campo_16', txt)} />
                                </View>
                            </View>
                        </>
                        :
                        null}
                    <RadioGroup options={[1, 0]} value={answer.campo_4} textOption={textOption} fontWeight='bold' question='2 - Sala(s) em outra escola*' onSelect={(option) => handleOptionChange('campo_4', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_5} textOption={textOption} fontWeight='bold' question='3 - Galpão / rancho / paiol / barracão*' onSelect={(option) => handleOptionChange('campo_5', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_6} textOption={textOption} fontWeight='bold' question='4 - Unidade de atendimento Socioeducativa*' onSelect={(option) => handleOptionChange('campo_6', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_7} textOption={textOption} fontWeight='bold' question='5 - Unidade Prisional*' onSelect={(option) => handleOptionChange('campo_7', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_8} textOption={textOption} fontWeight='bold' question='6 - Outros*' onSelect={(option) => handleOptionChange('campo_8', option)} />
                        <TouchableOpacity onPress={()=> console.log(answer)}><Text>Show Answers</Text></TouchableOpacity>
                </View>
            }
        </View>
    );
}

export default AbastecimentoDeAgua;
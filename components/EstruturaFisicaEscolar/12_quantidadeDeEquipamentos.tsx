import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IEquipamentosAlunosInternet, IQuantidadeEquipamentos } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    quantidadeDeEquipamentos?: (value: IQuantidadeEquipamentos) => void,
    answerEquipamentosAlunosInternet?: IEquipamentosAlunosInternet | undefined
    formErrors?: any,
    data?: IQuantidadeEquipamentos,
    editData?: IQuantidadeEquipamentos
}

const QuantidadeDeEquipamentos = ({ quantidadeDeEquipamentos, answerEquipamentosAlunosInternet, data, formErrors, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IQuantidadeEquipamentos>(data || editData || { campo_98: '', campo_99: '', campo_100: '', campo_101: '', campo_102: '', campo_103: '', campo_104: '', campo_105: '' });

    useEffect(() => {
        quantidadeDeEquipamentos &&
            quantidadeDeEquipamentos(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_98: '', campo_99: '', campo_100: '', campo_101: '', campo_102: '', campo_103: '', campo_104: '', campo_105: '' });
            setIsClicked(false);
        }, [])
    )
    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
    }

    useEffect(() => {
        if (answerEquipamentosAlunosInternet?.campo_111 === 0 || answerEquipamentosAlunosInternet?.campo_111 === null) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_103']: '',
                ['campo_104']: '',
                ['campo_105']: '',
            }));
        }
    }, [answerEquipamentosAlunosInternet])

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XII - QUANTIDADE DE EQUIPAMENTOS PARA O PROCESSO DE ENSINO E APENDIZAGEM</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'bold' }}>1 - Aparelho de DVD/Blu-ray</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_98 ? data.campo_98 : answer.campo_98} style={[styles.input, data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={!data ? true : false} onChangeText={(txt) => handleOptionChange('campo_98', txt)} />
                                {formErrors?.campo_98 && <Text style={styles.messageError}>{formErrors?.campo_98}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'bold' }}>2 - Aparelho de som</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_99 ? data.campo_99 : answer.campo_99} style={[styles.input, data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={!data ? true : false} onChangeText={(txt) => handleOptionChange('campo_99', txt)} />
                                {formErrors?.campo_99 && <Text style={styles.messageError}>{formErrors?.campo_99}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'bold' }}>3 - Aparelho de Televisão</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_100 ? data.campo_100 : answer.campo_100} style={[styles.input, data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={!data ? true : false} onChangeText={(txt) => handleOptionChange('campo_100', txt)} />
                                {formErrors?.campo_100 && <Text style={styles.messageError}>{formErrors?.campo_100}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'bold' }}>4 - Lousa digital</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_101 ? data.campo_101 : answer.campo_101} style={[styles.input, data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={!data ? true : false} onChangeText={(txt) => handleOptionChange('campo_101', txt)} />
                                {formErrors?.campo_101 && <Text style={styles.messageError}>{formErrors?.campo_101}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'bold' }}>5 - Projetor Multimídia (Data show)</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_102 ? data.campo_102 : answer.campo_102} style={[styles.input, data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={!data ? true : false} onChangeText={(txt) => handleOptionChange('campo_102', txt)} />
                                {formErrors?.campo_102 && <Text style={styles.messageError}>{formErrors?.campo_102}</Text>}
                            </View>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>6 - Quantidade de computadores em uso pelos alunos</Text>
                        {formErrors?.campos && <Text style={[styles.messageError, { marginTop: 20 }]}>{formErrors?.campos}</Text>}
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30, marginTop: 30 }]}>
                            <Text style={{ maxWidth: 400 }}>a) Computadores de mesa (desktop)</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_103 ? data.campo_103 : answer.campo_103} style={[styles.input, answerEquipamentosAlunosInternet?.campo_111 !== 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answerEquipamentosAlunosInternet?.campo_111 !== 0 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_103', txt)} />
                                {formErrors?.campo_103 && <Text style={styles.messageError}>{formErrors?.campo_103}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400 }}>b) Computadores portáteis</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_104 ? data.campo_104 : answer.campo_104} style={[styles.input, answerEquipamentosAlunosInternet?.campo_111 !== 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answerEquipamentosAlunosInternet?.campo_111 !== 0 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_104', txt)} />
                                {formErrors?.campo_104 && <Text style={styles.messageError}>{formErrors?.campo_104}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400 }}>c) Tablets</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_105 ? data.campo_105 : answer.campo_105} style={[styles.input, answerEquipamentosAlunosInternet?.campo_111 !== 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answerEquipamentosAlunosInternet?.campo_111 !== 0 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_105', txt)} />
                                {formErrors?.campo_105 && <Text style={styles.messageError}>{formErrors?.campo_105}</Text>}
                            </View>
                        </View>
                    </View>
                </View>
                : null
            }

        </View >
    );
}

export default QuantidadeDeEquipamentos;
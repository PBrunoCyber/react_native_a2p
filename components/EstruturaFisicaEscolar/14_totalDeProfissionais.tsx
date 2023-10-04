import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { ITotalProfissionais } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';
import { useFocusEffect } from 'expo-router';

interface IProps {
    totalDeProfissionais?: (value: ITotalProfissionais) => void,
    formErrors?: any,
    data?: ITotalProfissionais,
    editData?: ITotalProfissionais
}

const TotalDeProfissionais = ({ formErrors, totalDeProfissionais, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ITotalProfissionais>(data || editData || { campo_117: '', campo_118: '', campo_119: '', campo_120: '', campo_121: '', campo_122: '', campo_123: '', campo_124: '', campo_125: '', campo_126: '', campo_127: '', campo_128: '', campo_129: '', campo_130: '', campo_131: '', campo_132: '', campo_133: 0, campo_134: null });

    useEffect(() => {
        totalDeProfissionais &&
            totalDeProfissionais(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData ||{ campo_117: '', campo_118: '', campo_119: '', campo_120: '', campo_121: '', campo_122: '', campo_123: '', campo_124: '', campo_125: '', campo_126: '', campo_127: '', campo_128: '', campo_129: '', campo_130: '', campo_131: '', campo_132: '', campo_133: 0, campo_134: null });
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
        if (question === "campo_133" && answer === 1) {
            setAnswers((prev) => ({
                ...prev,
                ['campo_117']: '',
                ['campo_118']: '',
                ['campo_119']: '',
                ['campo_120']: '',
                ['campo_121']: '',
                ['campo_122']: '',
                ['campo_123']: '',
                ['campo_124']: '',
                ['campo_125']: '',
                ['campo_126']: '',
                ['campo_127']: '',
                ['campo_128']: '',
                ['campo_129']: '',
                ['campo_130']: '',
                ['campo_131']: '',
                ['campo_132']: '',
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XIV - TOTAL DE PROFISSIONAIS QUE ATUAM NAS SEGUINTES FUNÇÕES NA ESCOLA</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.totalProfissionais && <Text style={styles.messageError}>{formErrors?.totalProfissionais}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_133} label='Não há funcionários para as funções listadas*' onSelect={(value) => handleOptionChange('campo_133', value)} />
                    {formErrors?.campo_133 && <Text style={styles.messageError}>{formErrors?.campo_133}</Text>}
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{  maxWidth: 400, fontWeight: 'normal' }}>1 - Auxiliares de secretaria ou auxiliares administrativos, atendentes*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_117 ? data.campo_117 : answer.campo_117} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_117', txt)} />
                                {formErrors?.campo_117 && <Text style={styles.messageError}>{formErrors?.campo_117}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{  maxWidth: 400, fontWeight: 'normal' }}>2 - Auxiliar de serviços gerais, porteiro(a), zelador(a), faxineiro(a), horticultor(a), jardineiro(a)*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_118 ? data.campo_118 : answer.campo_118} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_118', txt)} />
                                {formErrors?.campo_118 && <Text style={styles.messageError}>{formErrors?.campo_118}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>3 - Bibliotecário(a), auxiliar de biblioteca ou monitor(a) da sala de leitura*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_119 ? data.campo_119 : answer.campo_119} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_119', txt)} />
                                {formErrors?.campo_119 && <Text style={styles.messageError}>{formErrors?.campo_119}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>4 - Bombeiro(a) brigadista, profissionais de assistência a saúde (urgência e emergência), enfermeiro(a), técnico(a) de enfermagem e socorrista*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_120 ? data.campo_120 : answer.campo_120} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_120', txt)} />
                                {formErrors?.campo_120 && <Text style={styles.messageError}>{formErrors?.campo_120}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>5 - Coordenador(a) de turno/disciplinar*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_121 ? data.campo_121 : answer.campo_121} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_121', txt)} />
                                {formErrors?.campo_121 && <Text style={styles.messageError}>{formErrors?.campo_121}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>6 - Fonoaudiólogo(a)*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_122 ? data.campo_122 : answer.campo_122} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_122', txt)} />
                                {formErrors?.campo_122 && <Text style={styles.messageError}>{formErrors?.campo_122}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>7 - Nutricionista*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_123 ? data.campo_123 : answer.campo_123} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_123', txt)} />
                                {formErrors?.campo_123 && <Text style={styles.messageError}>{formErrors?.campo_123}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>8 - Psicólogo(a) escolar*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_124 ? data.campo_124 : answer.campo_124} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_124', txt)} />
                                {formErrors?.campo_124 && <Text style={styles.messageError}>{formErrors?.campo_124}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>9 - Profissionais de preparação e segurança alimentar, cozinheiro(a), merendeira e auxiliar de cozinha*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_125 ? data.campo_125 : answer.campo_125} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_125', txt)} />
                                {formErrors?.campo_125 && <Text style={styles.messageError}>{formErrors?.campo_125}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>10 - Profissionais de apoio e supervisão pedagógica: (pedagogo(a), coordenador(a) pedagógico(a), orientador(a) educacional, supervisor(a) escolar e coordenador(a) de área de ensino*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_126 ? data.campo_126 : answer.campo_126} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_126', txt)} />
                                {formErrors?.campo_126 && <Text style={styles.messageError}>{formErrors?.campo_126}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>11 - Secretário(a) escolar*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_127 ? data.campo_127 : answer.campo_127} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_127', txt)} />
                                {formErrors?.campo_127 && <Text style={styles.messageError}>{formErrors?.campo_127}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>12 - Segurança, guarda ou segurança patrimonial*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_128 ? data.campo_128 : answer.campo_128} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_128', txt)} />
                                {formErrors?.campo_128 && <Text style={styles.messageError}>{formErrors?.campo_128}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>13 - Técnicos(as), monitores(as), supervisores(as) ou auxiliares de laboratório(s), de apoio a tecnologias educacionais ou em multimeios/multimídias eletrônico-digitais.*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_129 ? data.campo_129 : answer.campo_129} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data? true : false} onChangeText={(txt) => handleOptionChange('campo_129', txt)} />
                                {formErrors?.campo_129 && <Text style={styles.messageError}>{formErrors?.campo_129}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>14 - Vice-diretor(a) ou diretor(a) adjunto(a), profissionais responsáveis pela gestão administrativa e/ou financeira*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_130 ? data.campo_130 : answer.campo_130} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_130', txt)} />
                                {formErrors?.campo_130 && <Text style={styles.messageError}>{formErrors?.campo_130}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>15 - Orientador(a) comunitário(a) ou assistente social*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_131 ? data.campo_131 : answer.campo_131} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data ? true : false} onChangeText={(txt) => handleOptionChange('campo_131', txt)} />
                                {formErrors?.campo_131 && <Text style={styles.messageError}>{formErrors?.campo_131}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ maxWidth: 400, fontWeight: 'normal' }}>16 - Tradutor e Intérprete de Libras para atendimento em outros ambientes da escola que não seja sala de aula*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TextInput maxLength={4} value={data?.campo_132 ? data.campo_132 : answer.campo_132} style={[styles.input, answer?.campo_133 == 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} editable={answer?.campo_133 !== 1 && !data? true : false} onChangeText={(txt) => handleOptionChange('campo_132', txt)} />
                                {formErrors?.campo_132 && <Text style={styles.messageError}>{formErrors?.campo_132}</Text>}
                            </View>
                        </View>
                        <RadioGroup options={[1, 0]} value={answer.campo_134} disable={data ? true : false} marked={data ? true : false} selected={data?.campo_134} textOption={["OFERECE", "NÃO OFERECE"]} fontWeight='normal' question='17 - Alimentação escolar para os aluno(a)s*' onSelect={(option) => handleOptionChange('campo_134', option)} />
                        {formErrors?.campo_134 && <Text style={styles.messageError}>{formErrors?.campo_134}</Text>}
                    </View>
                </View>
                : null
            }

        </View >
    );
}

export default TotalDeProfissionais;

import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IInstrumentosEMateriais } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';
import { useFocusEffect } from 'expo-router';

interface IProps {
    instrumentosEMateriais?: (value: IInstrumentosEMateriais) => void,
    formErrors?: any,
}

const InstrumentosEMateriais = ({ instrumentosEMateriais, formErrors }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IInstrumentosEMateriais>({ campo_135: null, campo_136: null, campo_137: null, campo_138: null, campo_139: null, campo_140: null, campo_141: null, campo_142: null, campo_143: null, campo_144: null, campo_145: null, campo_146: null, campo_147: 0, campo_148: null });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        instrumentosEMateriais &&
            instrumentosEMateriais(answer);
        for (const key in answer) {
            if (answer[key as keyof IInstrumentosEMateriais]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    useFocusEffect(
        useCallback(() => {
            setAnswers({ campo_135: null, campo_136: null, campo_137: null, campo_138: null, campo_139: null, campo_140: null, campo_141: null, campo_142: null, campo_143: null, campo_144: null, campo_145: null, campo_146: null, campo_147: 0, campo_148: null });
            setIsClicked(false);
        }, [])
    )

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_147' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_135']: null,
                ['campo_136']: null,
                ['campo_137']: null,
                ['campo_138']: null,
                ['campo_139']: null,
                ['campo_140']: null,
                ['campo_141']: null,
                ['campo_142']: null,
                ['campo_143']: null,
                ['campo_144']: null,
                ['campo_145']: null,
                ['campo_146']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XV - INSTRUMENTOS, MATERIAIS SOCIOCULTURAIS E/OU PEDAGÓGICOS EM USO NA ESCOLA PARA O DESENVOLVIMENTO DE ATIVIDADES DE ENSINO APRENDIZAGEM</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.instrumentosEMateriais && <Text style={styles.messageError}>{formErrors?.instrumentosEMateriais}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_147} label='Nenhum dos instrumentos listados*' onSelect={(value) => handleOptionChange('campo_147', value)} />
                    {formErrors?.campo_147 && <Text style={styles.messageError}>{formErrors?.campo_147}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_135} textOption={textOption} fontWeight='normal' question='1 - Acervo multimídia*' onSelect={(option) => handleOptionChange('campo_135', option)} />
                    {formErrors?.campo_135 && <Text style={styles.messageError}>{formErrors?.campo_135}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_136} textOption={textOption} fontWeight='normal' question='2 - Brinquedos para educação infantil*' onSelect={(option) => handleOptionChange('campo_136', option)} />
                    {formErrors?.campo_136 && <Text style={styles.messageError}>{formErrors?.campo_136}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_137} textOption={textOption} fontWeight='normal' question='3 - Conjunto de materiais científicos*' onSelect={(option) => handleOptionChange('campo_137', option)} />
                    {formErrors?.campo_137 && <Text style={styles.messageError}>{formErrors?.campo_137}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_138} textOption={textOption} fontWeight='normal' question='4 - Equipamento para amplificação e difusão de som/áudio*' onSelect={(option) => handleOptionChange('campo_138', option)} />
                    {formErrors?.campo_138 && <Text style={styles.messageError}>{formErrors?.campo_138}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_139} textOption={textOption} fontWeight='normal' question='5 - Instrumentos musicais para conjunto, banda/fanfarra e/ou aulas de música*' onSelect={(option) => handleOptionChange('campo_139', option)} />
                    {formErrors?.campo_139 && <Text style={styles.messageError}>{formErrors?.campo_139}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_140} textOption={textOption} fontWeight='normal' question='6 - Jogos educativos*' onSelect={(option) => handleOptionChange('campo_140', option)} />
                    {formErrors?.campo_140 && <Text style={styles.messageError}>{formErrors?.campo_140}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_141} textOption={textOption} fontWeight='normal' question='7 - Materiais para atividades culturais e artísticas*' onSelect={(option) => handleOptionChange('campo_141', option)} />
                    {formErrors?.campo_141 && <Text style={styles.messageError}>{formErrors?.campo_141}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_142} textOption={textOption} fontWeight='normal' question='8 - Materiais para educação profissional*' onSelect={(option) => handleOptionChange('campo_142', option)} />
                    {formErrors?.campo_142 && <Text style={styles.messageError}>{formErrors?.campo_142}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_143} textOption={textOption} fontWeight='normal' question='9 - Materiais para prática desportiva e recreação*' onSelect={(option) => handleOptionChange('campo_143', option)} />
                    {formErrors?.campo_143 && <Text style={styles.messageError}>{formErrors?.campo_143}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_144} textOption={textOption} fontWeight='normal' question='10 - Materiais pedagógicos para a educação escolar indígena*' onSelect={(option) => handleOptionChange('campo_144', option)} />
                    {formErrors?.campo_144 && <Text style={styles.messageError}>{formErrors?.campo_144}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_145} textOption={textOption} fontWeight='normal' question='11 - Materiais pedagógicos para a educação das relações étnicos raciais*' onSelect={(option) => handleOptionChange('campo_145', option)} />
                    {formErrors?.campo_145 && <Text style={styles.messageError}>{formErrors?.campo_145}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_147 === 1 ? true : false} value={answer.campo_146} textOption={textOption} fontWeight='normal' question='12 - Materiais pedagógicos para a educação do campo*' onSelect={(option) => handleOptionChange('campo_146', option)} />
                    {formErrors?.campo_146 && <Text style={styles.messageError}>{formErrors?.campo_146}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_148} textOption={textOption} fontWeight='normal' question='13 - Educação escolar indígena*' onSelect={(option) => handleOptionChange('campo_148', option)} />
                    {formErrors?.campo_148 && <Text style={styles.messageError}>{formErrors?.campo_148}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default InstrumentosEMateriais;

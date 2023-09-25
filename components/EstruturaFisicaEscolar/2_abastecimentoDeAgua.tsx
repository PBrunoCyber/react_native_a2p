import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IAbastecimentoDeAgua } from '../../types/EstruturaFisicaEscolar';

interface IProps {
    abastecimentoDeAguaChange: (value: IAbastecimentoDeAgua) => void,
    formErrors: any,
}

const AbastecimentoDeAgua = ({ formErrors, abastecimentoDeAguaChange }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IAbastecimentoDeAgua>(
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

    useEffect(() => {
        abastecimentoDeAguaChange(answer);
    }, [answer])

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
        if (question === 'campo_22' && answer === 1) {
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
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>II - ABASTECIMENTO DE ÁGUA</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.abastecimentoDeAgua && <Text style={styles.messageError}>{formErrors.abastecimentoDeAgua}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_22} label='Não há abastecimento de água*' onSelect={(value) => handleOptionChange('campo_22', value)} />
                    {formErrors.campo_22 && <Text style={styles.messageError}>{formErrors.campo_22}</Text>}
                    <RadioGroup options={[1, 0]} value={answer.campo_17} textOption={textOption} fontWeight='bold' question='Fornece água potável para consumo humano*' onSelect={(option) => handleOptionChange('campo_17', option)} />
                    {formErrors.campo_17 && <Text style={styles.messageError}>{formErrors.campo_17}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_22 === 1 ? true : false} value={answer.campo_18} textOption={textOption} fontWeight='normal' question='a) Rede Pública' onSelect={(option) => handleOptionChange('campo_18', option)} />
                    {formErrors.campo_18 && <Text style={styles.messageError}>{formErrors.campo_18}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_22 === 1 ? true : false} value={answer.campo_19} textOption={textOption} fontWeight='normal' question='b) Poço Artesiano' onSelect={(option) => handleOptionChange('campo_19', option)} />
                    {formErrors.campo_19 && <Text style={styles.messageError}>{formErrors.campo_19}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_22 === 1 ? true : false} value={answer.campo_20} textOption={textOption} fontWeight='normal' question='c) Cacimba / Cisterna / Poço' onSelect={(option) => handleOptionChange('campo_20', option)} />
                    {formErrors.campo_20 && <Text style={styles.messageError}>{formErrors.campo_20}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_22 === 1 ? true : false} value={answer.campo_21} textOption={textOption} fontWeight='normal' question='d) Fonte / Rio / Igarapé / Riacho / Córrego' onSelect={(option) => handleOptionChange('campo_21', option)} />
                    {formErrors.campo_21 && <Text style={styles.messageError}>{formErrors.campo_21}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default AbastecimentoDeAgua;
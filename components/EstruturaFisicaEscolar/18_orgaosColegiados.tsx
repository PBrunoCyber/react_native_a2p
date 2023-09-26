import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IOrgaosColegiados } from '../../types/EstruturaFisicaEscolar';

interface IProps {
    orgaosColegiados: (value: IOrgaosColegiados) => void,
    formErrors: any;
}

const OrgaosColegiados = ({ orgaosColegiados, formErrors }: IProps) => {
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
        if (question === 'campo_169' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_164']: null,
                ['campo_165']: null,
                ['campo_166']: null,
                ['campo_167']: null,
                ['campo_168']: null,
            }));
        }
    }


    useEffect(() => {
        orgaosColegiados(answer);
        for (const key in answer) {
            if (answer[key as keyof IOrgaosColegiados]) {
                setIsClicked(true);
            }
        }
    }, [answer])

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XVIII - ÓRGÃOS COLEGIADOS EM FUNCIONAMENTO NA ESCOLA</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.orgaosColegiados && <Text style={styles.messageError}>{formErrors.orgaosColegiados}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_169} label='Não há órgãos colegiados em funcionamento*' onSelect={(value) => handleOptionChange('campo_169', value)} />
                    {formErrors.campo_169 && <Text style={styles.messageError}>{formErrors.campo_169}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_169 === 1 ? true : false} value={answer.campo_164} textOption={textOption} fontWeight='normal' question='1 - Associação de Pais*' onSelect={(option) => handleOptionChange('campo_164', option)} />
                    {formErrors.campo_164 && <Text style={styles.messageError}>{formErrors.campo_164}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_169 === 1 ? true : false} value={answer.campo_165} textOption={textOption} fontWeight='normal' question='2 - Associação de pais e mestres*' onSelect={(option) => handleOptionChange('campo_165', option)} />
                    {formErrors.campo_165 && <Text style={styles.messageError}>{formErrors.campo_165}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_169 === 1 ? true : false} value={answer.campo_166} textOption={textOption} fontWeight='normal' question='3 - Conselho escolar*' onSelect={(option) => handleOptionChange('campo_166', option)} />
                    {formErrors.campo_166 && <Text style={styles.messageError}>{formErrors.campo_166}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_169 === 1 ? true : false} value={answer.campo_167} textOption={textOption} fontWeight='normal' question='4 - Grêmio estudantil*' onSelect={(option) => handleOptionChange('campo_167', option)} />
                    {formErrors.campo_167 && <Text style={styles.messageError}>{formErrors.campo_167}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_169 === 1 ? true : false} value={answer.campo_168} textOption={textOption} fontWeight='normal' question='5 - Outros*' onSelect={(option) => handleOptionChange('campo_168', option)} />
                    {formErrors.campo_168 && <Text style={styles.messageError}>{formErrors.campo_168}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default OrgaosColegiados;
import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IEquipamentos } from '../../types/EstruturaFisicaEscolar';

interface IProps {
    equipamentos: (value: IEquipamentos) => void,
    formErrors: any,
}


const Equipamentos = ({ formErrors, equipamentos }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IEquipamentos>(
        {
            campo_97: 0,
            campo_91: null,
            campo_92: null,
            campo_93: null,
            campo_94: null,
            campo_95: null,
            campo_96: null,
        }
    );
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        equipamentos(answer);
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
        if (question === 'campo_97' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_91']: null,
                ['campo_92']: null,
                ['campo_93']: null,
                ['campo_94']: null,
                ['campo_95']: null,
                ['campo_96']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || Object.keys(formErrors).length > 0 ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>IX - EQUIPAMENTOS EXISTENTES NA ESCOLA PARA USO TÉCNICO E ADMINISTRATIVO</Text>
                    {isClicked || Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors.equipamentos && <Text style={styles.messageError}>{formErrors.equipamentos}</Text>}
                    <CheckBox fontWeight='bold' value={answer.campo_97} label='Nenhum dos equipamentos listados*' onSelect={(value) => handleOptionChange('campo_97', value)} />
                    {formErrors.campo_97 && <Text style={styles.messageError}>{formErrors.campo_97}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_91} textOption={textOption} fontWeight='normal' question='1 - Antena parabólica*' onSelect={(option) => handleOptionChange('campo_91', option)} />
                    {formErrors.campo_91 && <Text style={styles.messageError}>{formErrors.campo_91}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_92} textOption={textOption} fontWeight='normal' question='2 - Computadores*' onSelect={(option) => handleOptionChange('campo_92', option)} />
                    {formErrors.campo_92 && <Text style={styles.messageError}>{formErrors.campo_92}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_93} textOption={textOption} fontWeight='normal' question='3 - Copiadora*' onSelect={(option) => handleOptionChange('campo_93', option)} />
                    {formErrors.campo_93 && <Text style={styles.messageError}>{formErrors.campo_93}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_94} textOption={textOption} fontWeight='normal' question='4 - Impressora*' onSelect={(option) => handleOptionChange('campo_94', option)} />
                    {formErrors.campo_94 && <Text style={styles.messageError}>{formErrors.campo_94}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_95} textOption={textOption} fontWeight='normal' question='5 - Impressora Multifuncional*' onSelect={(option) => handleOptionChange('campo_95', option)} />
                    {formErrors.campo_95 && <Text style={styles.messageError}>{formErrors.campo_95}</Text>}
                    <RadioGroup options={[1, 0]} disable={answer.campo_97 === 1 ? true : false} value={answer.campo_96} textOption={textOption} fontWeight='normal' question='6 - Scanner*' onSelect={(option) => handleOptionChange('campo_96', option)} />
                    {formErrors.campo_96 && <Text style={styles.messageError}>{formErrors.campo_96}</Text>}
                </View>
                : null
            }

        </View >
    );
}

export default Equipamentos;
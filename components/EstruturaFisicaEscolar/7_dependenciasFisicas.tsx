import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import { IDependenciasFisicas } from '../../types/EstruturaFisicaEscolar';
import { useFocusEffect } from 'expo-router';

interface IProps {
    dependenciasFisicas?: (value: IDependenciasFisicas) => void,
    formErrors?: any,
    data?: IDependenciasFisicas,
    editData?: IDependenciasFisicas
}

const DependenciasFisicas = ({ formErrors, dependenciasFisicas, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IDependenciasFisicas>(data || editData || { campo_40: null, campo_41: null, campo_42: null, campo_43: null, campo_44: null, campo_45: null, campo_46: null, campo_47: null, campo_48: null, campo_49: null, campo_50: null, campo_51: null, campo_52: null, campo_53: null, campo_54: null, campo_55: null, campo_56: null, campo_57: null, campo_58: null, campo_59: null, campo_60: null, campo_61: null, campo_62: null, campo_63: null, campo_64: null, campo_65: null, campo_66: null, campo_67: null, campo_68: null, campo_69: null, campo_70: null, campo_71: null, campo_72: null, campo_73: null, campo_74: null, campo_75: null, campo_76: null, campo_77: 0 });
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        dependenciasFisicas &&
            dependenciasFisicas(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_40: null, campo_41: null, campo_42: null, campo_43: null, campo_44: null, campo_45: null, campo_46: null, campo_47: null, campo_48: null, campo_49: null, campo_50: null, campo_51: null, campo_52: null, campo_53: null, campo_54: null, campo_55: null, campo_56: null, campo_57: null, campo_58: null, campo_59: null, campo_60: null, campo_61: null, campo_62: null, campo_63: null, campo_64: null, campo_65: null, campo_66: null, campo_67: null, campo_68: null, campo_69: null, campo_70: null, campo_71: null, campo_72: null, campo_73: null, campo_74: null, campo_75: null, campo_76: null, campo_77: 0 });
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
        if (question === 'campo_77' && answer === 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_40']: null,
                ['campo_41']: null,
                ['campo_42']: null,
                ['campo_43']: null,
                ['campo_44']: null,
                ['campo_45']: null,
                ['campo_46']: null,
                ['campo_47']: null,
                ['campo_48']: null,
                ['campo_49']: null,
                ['campo_50']: null,
                ['campo_51']: null,
                ['campo_52']: null,
                ['campo_53']: null,
                ['campo_54']: null,
                ['campo_55']: null,
                ['campo_56']: null,
                ['campo_57']: null,
                ['campo_58']: null,
                ['campo_59']: null,
                ['campo_60']: null,
                ['campo_61']: null,
                ['campo_62']: null,
                ['campo_63']: null,
                ['campo_64']: null,
                ['campo_65']: null,
                ['campo_66']: null,
                ['campo_67']: null,
                ['campo_68']: null,
                ['campo_69']: null,
                ['campo_70']: null,
                ['campo_71']: null,
                ['campo_72']: null,
                ['campo_73']: null,
                ['campo_74']: null,
                ['campo_75']: null,
                ['campo_76']: null,
            }));
        }
        if (question === 'campo_43' && answer === 0) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_44']: null,
                ['campo_45']: null,
                ['campo_46']: null,
                ['campo_47']: null,
            }));
        }
    }

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>VII - DEPENDÊNCIAS FÍSICAS EXISTENTES E UTILIZADAS NA ESCOLA</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.dependenciasFisicas && <Text style={styles.messageError}>{formErrors?.dependenciasFisicas}</Text>}
                    <CheckBox fontWeight='bold' disable={data ? true : false} value={answer.campo_77} label='Nenhuma das dependências relacionadas*' onSelect={(value) => handleOptionChange('campo_77', value)} />
                    {formErrors?.campo_77 && <Text style={styles.messageError}>{formErrors?.campo_77}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_40} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_40} textOption={textOption} fontWeight='bold' question='1 - Almoxarifado*' onSelect={(option) => handleOptionChange('campo_40', option)} />
                    {formErrors?.campo_40 && <Text style={styles.messageError}>{formErrors?.campo_40}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_41} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_41} textOption={textOption} fontWeight='bold' question='2 - Área Verde*' onSelect={(option) => handleOptionChange('campo_41', option)} />
                    {formErrors?.campo_41 && <Text style={styles.messageError}>{formErrors?.campo_41}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_42} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_42} textOption={textOption} fontWeight='bold' question='3 - Auditório*' onSelect={(option) => handleOptionChange('campo_42', option)} />
                    {formErrors?.campo_42 && <Text style={styles.messageError}>{formErrors?.campo_42}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_43} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_43} textOption={textOption} fontWeight='bold' question='4 - Banheiro*' onSelect={(option) => handleOptionChange('campo_43', option)} />
                    {formErrors?.campo_43 && <Text style={styles.messageError}>{formErrors?.campo_43}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_44} disable={answer.campo_77 === 1 || data || (answer.campo_43 === 0 || answer.campo_43 === null) ? true : false} value={answer.campo_44} textOption={textOption} fontWeight='normal' question='a) Banheiro acessível adequado ao uso de pessoas com deficiência ou mobilidade reduzida*' onSelect={(option) => handleOptionChange('campo_44', option)} />
                    {formErrors?.campo_44 && <Text style={styles.messageError}>{formErrors?.campo_44}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_45} disable={answer.campo_77 === 1 || data || (answer.campo_43 === 0 || answer.campo_43 === null) ? true : false} value={answer.campo_45} textOption={textOption} fontWeight='normal' question='b) Banheiro adequado à educação infantil*' onSelect={(option) => handleOptionChange('campo_45', option)} />
                    {formErrors?.campo_45 && <Text style={styles.messageError}>{formErrors?.campo_45}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_46} disable={answer.campo_77 === 1 || data || (answer.campo_43 === 0 || answer.campo_43 === null) ? true : false} value={answer.campo_46} textOption={textOption} fontWeight='normal' question='c) Banheiro exclusivo para os funcionários*' onSelect={(option) => handleOptionChange('campo_46', option)} />
                    {formErrors?.campo_46 && <Text style={styles.messageError}>{formErrors?.campo_46}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_47} disable={answer.campo_77 === 1 || data || (answer.campo_43 === 0 || answer.campo_43 === null) ? true : false} value={answer.campo_47} textOption={textOption} fontWeight='normal' question='d) Banheiro ou vestiário com chuveiro*' onSelect={(option) => handleOptionChange('campo_47', option)} />
                    {formErrors?.campo_47 && <Text style={styles.messageError}>{formErrors?.campo_47}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_48} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_48} textOption={textOption} fontWeight='bold' question='5 - Biblioteca*' onSelect={(option) => handleOptionChange('campo_48', option)} />
                    {formErrors?.campo_48 && <Text style={styles.messageError}>{formErrors?.campo_48}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_49} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_49} textOption={textOption} fontWeight='bold' question='6 - Cozinha*' onSelect={(option) => handleOptionChange('campo_49', option)} />
                    {formErrors?.campo_49 && <Text style={styles.messageError}>{formErrors?.campo_49}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_50} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_50} textOption={textOption} fontWeight='bold' question='7 - Despensa*' onSelect={(option) => handleOptionChange('campo_50', option)} />
                    {formErrors?.campo_50 && <Text style={styles.messageError}>{formErrors?.campo_50}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_51} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_51} textOption={textOption} fontWeight='bold' question='8 - Dormitório de aluno(a)*' onSelect={(option) => handleOptionChange('campo_51', option)} />
                    {formErrors?.campo_51 && <Text style={styles.messageError}>{formErrors?.campo_51}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_52} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_52} textOption={textOption} fontWeight='bold' question='9 - Dormitório de professor(a)*' onSelect={(option) => handleOptionChange('campo_52', option)} />
                    {formErrors?.campo_52 && <Text style={styles.messageError}>{formErrors?.campo_52}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_53} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_53} textOption={textOption} fontWeight='bold' question='10 - Laboratório de Ciências*' onSelect={(option) => handleOptionChange('campo_53', option)} />
                    {formErrors?.campo_53 && <Text style={styles.messageError}>{formErrors?.campo_53}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_54} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_54} textOption={textOption} fontWeight='bold' question='11 - Laboratório de Informática*' onSelect={(option) => handleOptionChange('campo_54', option)} />
                    {formErrors?.campo_54 && <Text style={styles.messageError}>{formErrors?.campo_54}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_55} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_55} textOption={textOption} fontWeight='bold' question='12 - Laboratório específico para a educação profissional*' onSelect={(option) => handleOptionChange('campo_55', option)} />
                    {formErrors?.campo_55 && <Text style={styles.messageError}>{formErrors?.campo_55}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_56} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_56} textOption={textOption} fontWeight='bold' question='13 - Parque infantil*' onSelect={(option) => handleOptionChange('campo_56', option)} />
                    {formErrors?.campo_56 && <Text style={styles.messageError}>{formErrors?.campo_56}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_57} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_57} textOption={textOption} fontWeight='bold' question='14 - Pátio coberto*' onSelect={(option) => handleOptionChange('campo_57', option)} />
                    {formErrors?.campo_57 && <Text style={styles.messageError}>{formErrors?.campo_57}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_58} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_58} textOption={textOption} fontWeight='bold' question='15 - Pátio descoberto*' onSelect={(option) => handleOptionChange('campo_58', option)} />
                    {formErrors?.campo_58 && <Text style={styles.messageError}>{formErrors?.campo_58}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_59} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_59} textOption={textOption} fontWeight='bold' question='16 - Piscina*' onSelect={(option) => handleOptionChange('campo_59', option)} />
                    {formErrors?.campo_59 && <Text style={styles.messageError}>{formErrors?.campo_59}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_60} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_60} textOption={textOption} fontWeight='bold' question='17 - Quadra de esportes coberta*' onSelect={(option) => handleOptionChange('campo_60', option)} />
                    {formErrors?.campo_60 && <Text style={styles.messageError}>{formErrors?.campo_60}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_61} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_61} textOption={textOption} fontWeight='bold' question='18 - Quadra de esportes descoberta*' onSelect={(option) => handleOptionChange('campo_61', option)} />
                    {formErrors?.campo_61 && <Text style={styles.messageError}>{formErrors?.campo_61}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_62} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_62} textOption={textOption} fontWeight='bold' question='19 - Refeitório*' onSelect={(option) => handleOptionChange('campo_62', option)} />
                    {formErrors?.campo_62 && <Text style={styles.messageError}>{formErrors?.campo_62}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_63} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_63} textOption={textOption} fontWeight='bold' question='20 - Sala de repouso para aluno(a)*' onSelect={(option) => handleOptionChange('campo_63', option)} />
                    {formErrors?.campo_63 && <Text style={styles.messageError}>{formErrors?.campo_63}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_64} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_64} textOption={textOption} fontWeight='bold' question='21 - Sala/ateliê de artes*' onSelect={(option) => handleOptionChange('campo_64', option)} />
                    {formErrors?.campo_64 && <Text style={styles.messageError}>{formErrors?.campo_64}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_65} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_65} textOption={textOption} fontWeight='bold' question='22 - Sala de música/coral*' onSelect={(option) => handleOptionChange('campo_65', option)} />
                    {formErrors?.campo_65 && <Text style={styles.messageError}>{formErrors?.campo_65}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_66} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_66} textOption={textOption} fontWeight='bold' question='23 - Sala/estúdio de dança*' onSelect={(option) => handleOptionChange('campo_66', option)} />
                    {formErrors?.campo_66 && <Text style={styles.messageError}>{formErrors?.campo_66}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_67} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_67} textOption={textOption} fontWeight='bold' question='24 - Sala multiuso (música, dança e artes)*' onSelect={(option) => handleOptionChange('campo_67', option)} />
                    {formErrors?.campo_67 && <Text style={styles.messageError}>{formErrors?.campo_67}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_68} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_68} textOption={textOption} fontWeight='bold' question='25 - Terreirão (área para prática desportiva e recreação sem cobertura, sem piso e sem edificações)*' onSelect={(option) => handleOptionChange('campo_68', option)} />
                    {formErrors?.campo_68 && <Text style={styles.messageError}>{formErrors?.campo_68}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_69} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_69} textOption={textOption} fontWeight='bold' question='26 - Viveiro/criação de animais*' onSelect={(option) => handleOptionChange('campo_69', option)} />
                    {formErrors?.campo_69 && <Text style={styles.messageError}>{formErrors?.campo_69}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_70} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_70} textOption={textOption} fontWeight='bold' question='27 - Sala de diretoria*' onSelect={(option) => handleOptionChange('campo_70', option)} />
                    {formErrors?.campo_70 && <Text style={styles.messageError}>{formErrors?.campo_70}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_71} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_71} textOption={textOption} fontWeight='bold' question='28 - Sala de Leitura*' onSelect={(option) => handleOptionChange('campo_71', option)} />
                    {formErrors?.campo_71 && <Text style={styles.messageError}>{formErrors?.campo_71}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_72} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_72} textOption={textOption} fontWeight='bold' question='29 - Sala de professores*' onSelect={(option) => handleOptionChange('campo_72', option)} />
                    {formErrors?.campo_72 && <Text style={styles.messageError}>{formErrors?.campo_72}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_73} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_73} textOption={textOption} fontWeight='bold' question='30 - Sala de recursos multifuncionais para atendimento educacional especializado (AEE)*' onSelect={(option) => handleOptionChange('campo_73', option)} />
                    {formErrors?.campo_73 && <Text style={styles.messageError}>{formErrors?.campo_73}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_74} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_74} textOption={textOption} fontWeight='bold' question='31 - Sala de Secretaria*' onSelect={(option) => handleOptionChange('campo_74', option)} />
                    {formErrors?.campo_74 && <Text style={styles.messageError}>{formErrors?.campo_74}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_75} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_75} textOption={textOption} fontWeight='bold' question='32 - Salas de oficinas da educação profissional*' onSelect={(option) => handleOptionChange('campo_75', option)} />
                    {formErrors?.campo_75 && <Text style={styles.messageError}>{formErrors?.campo_75}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_76} disable={answer.campo_77 === 1 || data ? true : false} value={answer.campo_76} textOption={textOption} fontWeight='bold' question='33 - Estúdio de gravação e edição*' onSelect={(option) => handleOptionChange('campo_76', option)} />
                    {formErrors?.campo_76 && <Text style={styles.messageError}>{formErrors?.campo_76}</Text>}
                </View>
                : null
            }

        </View>
    );
}

export default DependenciasFisicas;
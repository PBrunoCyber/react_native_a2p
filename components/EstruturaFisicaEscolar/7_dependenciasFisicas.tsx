import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup from '../RadioGroup';
import CheckBox from '../CheckBox';
import {IDependenciasFisicas } from '../../types/EstruturaFisicaEscolar';



const DependenciasFisicas = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IDependenciasFisicas>(
        {
            campo_77: 0,
            campo_40: null,
            campo_41: null,
            campo_42: null,
            campo_43: null,
            campo_44: null,
            campo_45: null,
            campo_46: null,
            campo_47: null,
            campo_48: null,
            campo_49: null,
            campo_50: null,
            campo_51: null,
            campo_52: null,
            campo_53: null,
            campo_54: null,
            campo_55: null,
            campo_56: null,
            campo_57: null,
            campo_58: null,
            campo_59: null,
            campo_60: null,
            campo_61: null,
            campo_62: null,
            campo_63: null,
            campo_64: null,
            campo_65: null,
            campo_66: null,
            campo_67: null,
            campo_68: null,
            campo_69: null,
            campo_70: null,
            campo_71: null,
            campo_72: null,
            campo_73: null,
            campo_74: null,
            campo_75: null,
            campo_76: null,
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>VII - DEPENDÊNCIAS FÍSICAS EXISTENTES E UTILIZADAS NA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_77} label='Nenhuma das dependências relacionadas*' onSelect={(value) => handleOptionChange('campo_77', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_40} textOption={textOption} fontWeight='bold' question='1 - Almoxarifado*' onSelect={(option) => handleOptionChange('campo_40', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_41} textOption={textOption} fontWeight='bold' question='2 - Área Verde*' onSelect={(option) => handleOptionChange('campo_41', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_42} textOption={textOption} fontWeight='bold' question='3 - Auditório*' onSelect={(option) => handleOptionChange('campo_42', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_43} textOption={textOption} fontWeight='bold' question='4 - Banheiro*' onSelect={(option) => handleOptionChange('campo_43', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_44} textOption={textOption} fontWeight='normal' question='a) Banheiro acessível adequado ao uso de pessoas com deficiência ou mobilidade reduzida*' onSelect={(option) => handleOptionChange('campo_44', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_45} textOption={textOption} fontWeight='normal' question='b) Banheiro adequado à educação infantil*' onSelect={(option) => handleOptionChange('campo_45', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_46} textOption={textOption} fontWeight='normal' question='c) Banheiro exclusivo para os funcionários*' onSelect={(option) => handleOptionChange('campo_46', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_47} textOption={textOption} fontWeight='normal' question='d) Banheiro ou vestiário com chuveiro*' onSelect={(option) => handleOptionChange('campo_47', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_48} textOption={textOption} fontWeight='bold' question='5 - Biblioteca*' onSelect={(option) => handleOptionChange('campo_48', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_49} textOption={textOption} fontWeight='bold' question='6 - Cozinha*' onSelect={(option) => handleOptionChange('campo_49', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_50} textOption={textOption} fontWeight='bold' question='7 - Despensa*' onSelect={(option) => handleOptionChange('campo_50', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_51} textOption={textOption} fontWeight='bold' question='8 - Dormitório de aluno(a)*' onSelect={(option) => handleOptionChange('campo_51', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_52} textOption={textOption} fontWeight='bold' question='9 - Dormitório de professor(a)*' onSelect={(option) => handleOptionChange('campo_52', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_53} textOption={textOption} fontWeight='bold' question='10 - Laboratório de Ciências*' onSelect={(option) => handleOptionChange('campo_53', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_54} textOption={textOption} fontWeight='bold' question='11 - Laboratório de Informática*' onSelect={(option) => handleOptionChange('campo_54', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_55} textOption={textOption} fontWeight='bold' question='12 - Laboratório específico para a educação profissional*' onSelect={(option) => handleOptionChange('campo_55', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_56} textOption={textOption} fontWeight='bold' question='13 - Parque infantil*' onSelect={(option) => handleOptionChange('campo_56', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_57} textOption={textOption} fontWeight='bold' question='14 - Pátio coberto*' onSelect={(option) => handleOptionChange('campo_57', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_58} textOption={textOption} fontWeight='bold' question='15 - Pátio descoberto*' onSelect={(option) => handleOptionChange('campo_58', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_59} textOption={textOption} fontWeight='bold' question='16 - Piscina*' onSelect={(option) => handleOptionChange('campo_59', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_60} textOption={textOption} fontWeight='bold' question='17 - Quadra de esportes coberta*' onSelect={(option) => handleOptionChange('campo_60', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_61} textOption={textOption} fontWeight='bold' question='18 - Quadra de esportes descoberta*' onSelect={(option) => handleOptionChange('campo_61', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_62} textOption={textOption} fontWeight='bold' question='19 - Refeitório*' onSelect={(option) => handleOptionChange('campo_62', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_63} textOption={textOption} fontWeight='bold' question='20 - Sala de repouso para aluno(a)*' onSelect={(option) => handleOptionChange('campo_63', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_64} textOption={textOption} fontWeight='bold' question='21 - Sala/ateliê de artes*' onSelect={(option) => handleOptionChange('campo_64', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_65} textOption={textOption} fontWeight='bold' question='22 - Sala de música/coral*' onSelect={(option) => handleOptionChange('campo_65', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_66} textOption={textOption} fontWeight='bold' question='23 - Sala/estúdio de dança*' onSelect={(option) => handleOptionChange('campo_66', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_67} textOption={textOption} fontWeight='bold' question='24 - Sala multiuso (música, dança e artes)*' onSelect={(option) => handleOptionChange('campo_67', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_68} textOption={textOption} fontWeight='bold' question='25 - Terreirão (área para prática desportiva e recreação sem cobertura, sem piso e sem edificações)*' onSelect={(option) => handleOptionChange('campo_68', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_69} textOption={textOption} fontWeight='bold' question='26 - Viveiro/criação de animais*' onSelect={(option) => handleOptionChange('campo_69', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_70} textOption={textOption} fontWeight='bold' question='27 - Sala de diretoria*' onSelect={(option) => handleOptionChange('campo_70', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_71} textOption={textOption} fontWeight='bold' question='28 - Sala de Leitura*' onSelect={(option) => handleOptionChange('campo_71', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_72} textOption={textOption} fontWeight='bold' question='29 - Sala de professores*' onSelect={(option) => handleOptionChange('campo_72', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_73} textOption={textOption} fontWeight='bold' question='30 - Sala de recursos multifuncionais para atendimento educacional especializado (AEE)*' onSelect={(option) => handleOptionChange('campo_73', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_74} textOption={textOption} fontWeight='bold' question='31 - Sala de Secretaria*' onSelect={(option) => handleOptionChange('campo_74', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_75} textOption={textOption} fontWeight='bold' question='32 - Salas de oficinas da educação profissional*' onSelect={(option) => handleOptionChange('campo_75', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_76} textOption={textOption} fontWeight='bold' question='33 - Estúdio de gravação e edição*' onSelect={(option) => handleOptionChange('campo_76', option)} />
                </View>
            }

        </View>
    );
}

export default DependenciasFisicas;
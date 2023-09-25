import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IReservaDeVagas } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';



const ReservaDeVagas = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IReservaDeVagas>(
        {
            campo_155: null,
            campo_156: null,
            campo_157: null,
            campo_158: null,
            campo_159: null,
            campo_160: null,
            campo_161: null,
            campo_162: null,
            campo_163: null,

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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold', maxWidth: 700 } : { color: COLORS.black, maxWidth: 700 }}>XVII - RESERVA DE VAGAS POR SISTEMA DE COTAS PARA GRUPOS ESPECÍFICOS DE ALUNO(A)S</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <RadioGroup options={[1, 0]} value={answer.campo_155} textOption={textOption} fontWeight='normal' question='1 - Autodeclarado preto, pardo ou indígena (PPI)*' onSelect={(option) => handleOptionChange('campo_155', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_156} textOption={textOption} fontWeight='normal' question='2 - Condição de renda*' onSelect={(option) => handleOptionChange('campo_156', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_157} textOption={textOption} fontWeight='normal' question='3 - Oriundo de escola pública*' onSelect={(option) => handleOptionChange('campo_157', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_158} textOption={textOption} fontWeight='normal' question='4 - Pessoa com deficiência (PCD)*' onSelect={(option) => handleOptionChange('campo_158', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_159} textOption={textOption} fontWeight='normal' question='5 - Outros grupos que não os listados*' onSelect={(option) => handleOptionChange('campo_159', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_160} textOption={textOption} fontWeight='normal' question='6 - Sem reservas de vagas para sistema de cotas (ampla concorrência)*' onSelect={(option) => handleOptionChange('campo_160', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_161} textOption={textOption} fontWeight='normal' question='7 - A escola possui site ou blog ou página em redes sociais para comunicação institucional*' onSelect={(option) => handleOptionChange('campo_161', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_162} textOption={textOption} fontWeight='normal' question='8 - A escola compartilha espaços para atividades de integração escola-comunidade*' onSelect={(option) => handleOptionChange('campo_162', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_163} textOption={textOption} fontWeight='normal' question='9 - A escola usa espaços e equipamentos do entorno escolar para atividades regulares com os aluno(a)s*' onSelect={(option) => handleOptionChange('campo_163', option)} />
                </View>
            }

        </View >
    );
}

export default ReservaDeVagas;

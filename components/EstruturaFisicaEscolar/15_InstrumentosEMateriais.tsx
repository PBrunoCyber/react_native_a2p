import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IInstrumentosEMateriais } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';



const InstrumentosEMateriais = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IInstrumentosEMateriais>(
        {
            campo_147: 0,
            campo_135: null,
            campo_136: null,        
            campo_137: null,        
            campo_138: null,        
            campo_139: null,        
            campo_140: null,        
            campo_141: null,        
            campo_142: null,        
            campo_143: null,        
            campo_144: null,        
            campo_145: null,        
            campo_146: null,        
            campo_148: null,        
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold', maxWidth: 700 } : { color: COLORS.black, maxWidth: 700 }}>XV - INSTRUMENTOS, MATERIAIS SOCIOCULTURAIS E/OU PEDAGÓGICOS EM USO NA ESCOLA PARA O DESENVOLVIMENTO DE ATIVIDADES DE ENSINO APRENDIZAGEM</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_147} label='Nenhum dos instrumentos listados*' onSelect={(value) => handleOptionChange('campo_147', value)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_135} textOption={textOption} fontWeight='normal' question='1 - Acervo multimídia*' onSelect={(option) => handleOptionChange('campo_135', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_136} textOption={textOption} fontWeight='normal' question='2 - Brinquedos para educação infantil*' onSelect={(option) => handleOptionChange('campo_136', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_137} textOption={textOption} fontWeight='normal' question='3 - Conjunto de materiais científicos*' onSelect={(option) => handleOptionChange('campo_137', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_138} textOption={textOption} fontWeight='normal' question='4 - Equipamento para amplificação e difusão de som/áudio*' onSelect={(option) => handleOptionChange('campo_138', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_139} textOption={textOption} fontWeight='normal' question='5 - Instrumentos musicais para conjunto, banda/fanfarra e/ou aulas de música*' onSelect={(option) => handleOptionChange('campo_139', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_140} textOption={textOption} fontWeight='normal' question='6 - Jogos educativos*' onSelect={(option) => handleOptionChange('campo_140', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_141} textOption={textOption} fontWeight='normal' question='7 - Materiais para atividades culturais e artísticas*' onSelect={(option) => handleOptionChange('campo_141', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_142} textOption={textOption} fontWeight='normal' question='8 - Materiais para educação profissional*' onSelect={(option) => handleOptionChange('campo_142', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_143} textOption={textOption} fontWeight='normal' question='9 - Materiais para prática desportiva e recreação*' onSelect={(option) => handleOptionChange('campo_143', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_144} textOption={textOption} fontWeight='normal' question='10 - Materiais pedagógicos para a educação escolar indígena*' onSelect={(option) => handleOptionChange('campo_144', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_145} textOption={textOption} fontWeight='normal' question='11 - Materiais pedagógicos para a educação das relações étnicos raciais*' onSelect={(option) => handleOptionChange('campo_145', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_146} textOption={textOption} fontWeight='normal' question='12 - Materiais pedagógicos para a educação do campo*' onSelect={(option) => handleOptionChange('campo_146', option)} />
                    <RadioGroup options={[1, 0]} value={answer.campo_148} textOption={textOption} fontWeight='normal' question='13 - Educação escolar indígena*' onSelect={(option) => handleOptionChange('campo_148', option)} />
                </View>
            }

        </View >
    );
}

export default InstrumentosEMateriais;

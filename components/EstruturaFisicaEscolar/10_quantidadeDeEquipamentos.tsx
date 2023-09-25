import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IQuantidadeEquipamentos } from '../../types/EstruturaFisicaEscolar';



const QuantidadeDeEquipamentos = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<IQuantidadeEquipamentos>(
        {
            campo_98: '',
            campo_99: '',
            campo_100: '',
            campo_101: '',
            campo_102: '',
            campo_103: '',
            campo_104: '',
            campo_105: '',            
        }
    );

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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>X - QUANTIDADE DE EQUIPAMENTOS PARA O PROCESSO DE ENSINO E APENDIZAGEM</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'bold'  }}>1 - Aparelho de DVD/Blu-ray*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_98', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'bold'  }}>2 - Aparelho de som*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_99', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'bold'  }}>3 - Aparelho de Televisão*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_100', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'bold'  }}>4 - Lousa digital*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_101', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'bold'  }}>5 - Projetor Multimídia (Data show)*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_102', txt)} />
                            </View>
                        </View>
                        <Text style={{fontWeight: 'bold',marginBottom: 30}}>6 - Quantidade de computadores em uso pelos alunos</Text>
                        <View style={[styles.formFlex, {paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,  }}>a) Computadores de mesa (desktop)*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_103', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, {paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>b) Computadores portáteis*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_104', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, {paddingLeft: 50, marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400  }}>c) Tablets*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_105', txt)} />
                            </View>
                        </View>
                    </View>
                </View>
                    
            }

        </View >
    );
}

export default QuantidadeDeEquipamentos;
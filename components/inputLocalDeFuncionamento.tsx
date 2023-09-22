import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../styles/inputLocalDeFuncionamento.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RadioButton } from 'react-native-paper';
import TwoOptions from './twoOptions';





const LocalDeFuncionamento = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer,  setAnswers] = useState({});

    const handleOptionChange = (question: string, answer: boolean)=>{
        setAnswers((prevAnswer)=> ({
            ...prevAnswer,
            [question]: answer
        }));
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>I - LOCAL DE FUNCIONAMENTO DA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <TwoOptions weight='bold' question='1 - Prédio Escolar*' onOptionChange={(option) => handleOptionChange('Pergunta1', option)}/>
                    <View style={[styles.formFlex]}>
                        <Text style={{ flexGrow: 1 }}>a) Tipo de Imóvel*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text>Próprio</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text>Alugado</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text>Cedido</Text>
                            </View>
                        </View>
                    </View>
                    <TwoOptions weight='normal' question='b) Prédio Escolar Compartilhado com Outra Escola*' onOptionChange={(option) => handleOptionChange('Pergunta2', option)}/>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                        <Text style={{ flexGrow: 1 }}>i) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                        <Text style={{ flexGrow: 1 }}>ii) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                        <Text style={{ flexGrow: 1 }}>iii) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                        <Text style={{ flexGrow: 1 }}>iv) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 10 }]}>
                        <Text style={{ flexGrow: 1 }}>v) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 40 }]}>
                        <Text style={{ flexGrow: 1 }}>vi) Código da escola com a qual compartilha*</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>2 - Sala(s) em outra escola*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>3 - Galpão / rancho / paiol / barracão*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>4 - Unidade de atendimento Socioeducativa*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>5 - Unidade Prisional*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>6 - Outros*</Text>
                        <View style={styles.formFlexOptions}>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                            </View>
                            <View style={styles.formFlexOption}>
                                <BouncyCheckbox fillColor={COLORS.green} />
                                <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}

export default LocalDeFuncionamento;
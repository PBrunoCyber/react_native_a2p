import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { ITotalProfissionais } from '../../types/EstruturaFisicaEscolar';



const TotalDeProfissionais = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ITotalProfissionais>(
        {
            campo_133: 0,
            campo_117: '',           
            campo_118: '',           
            campo_119: '',           
            campo_120: '',           
            campo_121: '',           
            campo_122: '',           
            campo_123: '',           
            campo_124: '',           
            campo_125: '',           
            campo_126: '',           
            campo_127: '',           
            campo_128: '',           
            campo_129: '',           
            campo_130: '',           
            campo_131: '',           
            campo_132: '',           
            campo_134: '',           
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
                    <Text style={isClicked ? { color: COLORS.green, fontWeight: 'bold' } : { color: COLORS.black }}>XIV - TOTAL DE PROFISSIONAIS QUE ATUAM NAS SEGUINTES FUNÇÕES NA ESCOLA</Text>
                    {isClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked && <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} />}
            </TouchableOpacity>
            {isClicked &&
                <View style={styles.formContainer}>
                    <CheckBox fontWeight='bold' value={answer.campo_133} label='Não há funcionários para as funções listadas*' onSelect={(value) => handleOptionChange('campo_133', value)} />
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>1 - Auxiliares de secretaria ou auxiliares administrativos, atendentes*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_117', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>2 - Auxiliar de serviços gerais, porteiro(a), zelador(a), faxineiro(a), horticultor(a), jardineiro(a)*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_118', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>3 - Bibliotecário(a), auxiliar de biblioteca ou monitor(a) da sala de leitura*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_119', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 30 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>4 - Bombeiro(a) brigadista, profissionais de assistência a saúde (urgência e emergência), enfermeiro(a), técnico(a) de enfermagem e socorrista*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_120', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>5 - Coordenador(a) de turno/disciplinar*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_121', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>6 - Fonoaudiólogo(a)*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_122', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>7 - Nutricionista*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_123', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>8 - Psicólogo(a) escolar*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_124', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>9 - Profissionais de preparação e segurança alimentar, cozinheiro(a), merendeira e auxiliar de cozinha*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_125', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>10 - Profissionais de apoio e supervisão pedagógica: (pedagogo(a), coordenador(a) pedagógico(a), orientador(a) educacional, supervisor(a) escolar e coordenador(a) de área de ensino*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_126', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>11 - Secretário(a) escolar*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_127', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>12 - Segurança, guarda ou segurança patrimonial*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_128', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>13 - Técnicos(as), monitores(as), supervisores(as) ou auxiliares de laboratório(s), de apoio a tecnologias educacionais ou em multimeios/multimídias eletrônico-digitais.*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_129', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>14 - Vice-diretor(a) ou diretor(a) adjunto(a), profissionais responsáveis pela gestão administrativa e/ou financeira*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_130', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>15 - Orientador(a) comunitário(a) ou assistente social*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_131', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>16 - Tradutor e Intérprete de Libras para atendimento em outros ambientes da escola que não seja sala de aula*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_132', txt)} />
                            </View>
                        </View>
                        <View style={[styles.formFlex, { marginBottom: 40 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400,fontWeight: 'normal'  }}>17 - Alimentação escolar para os aluno(a)s*</Text>
                            <View>
                                <TextInput maxLength={4} style={styles.input} onChangeText={(txt) => handleOptionChange('campo_134', txt)} />
                            </View>
                        </View>
                    </View>
                </View>
                    
            }

        </View >
    );
}

export default TotalDeProfissionais;

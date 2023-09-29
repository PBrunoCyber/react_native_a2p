import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useCallback, useContext, useEffect, useState } from 'react';

import { IAbastecimentoDeAgua, IAcessoInternet, IAllValues, IDependenciasFisicas, IDestinacaoDoLixo, IEnergiaEletrica, IEquipamentos, IEquipamentosAlunosInternet, IEsgotamentoSanitario, IInstrumentosEMateriais, ILinguaMinistrada, ILocalDeFuncionamento, IOrgaosColegiados, IQuantidadeEquipamentos, IRecursosDeAcessibilidade, IRedeLocal, IReservaDeVagas, ITotalProfissionais, ITratamentoDoLixo, IUltimasPerguntas } from '../../types/EstruturaFisicaEscolar';
import ValidateLocalDeFuncionamento from '../../services/EstruturaFisicaEscolar/1_ValidateLocalDeFuncionamento';
import Escola from '../../services/Escola';
import LocalDeFuncionamento from '../../components/EstruturaFisicaEscolar/1_localDeFuncionamento';
import AbastecimentoDeAgua from '../../components/EstruturaFisicaEscolar/2_abastecimentoDeAgua';
import FonteEnergiaEletrica from '../../components/EstruturaFisicaEscolar/3_fonteEnergiaEletrica';
import EsgotamentoSanitario from '../../components/EstruturaFisicaEscolar/4_esgotamentoSanitario';
import DestinacaoDoLixo from '../../components/EstruturaFisicaEscolar/5_destinacaoDoLixo';
import TratamentoDoLixo from '../../components/EstruturaFisicaEscolar/6_tratamentoDoLixo';
import DependenciasFisicas from '../../components/EstruturaFisicaEscolar/7_dependenciasFisicas';
import RecursosDeAcessibilidade from '../../components/EstruturaFisicaEscolar/8_recursosDeAcessibilidade';
import Equipamentos from '../../components/EstruturaFisicaEscolar/9_equipamentos';
import RedeLocal from '../../components/EstruturaFisicaEscolar/13_redeLocal';
import TotalDeProfissionais from '../../components/EstruturaFisicaEscolar/14_totalDeProfissionais';
import InstrumentosEMateriais from '../../components/EstruturaFisicaEscolar/15_InstrumentosEMateriais';
import LinguaMinistrada from '../../components/EstruturaFisicaEscolar/16_linguaMinistrada';
import ReservaDeVagas from '../../components/EstruturaFisicaEscolar/17_reservaDeVagas';
import OrgaosColegiados from '../../components/EstruturaFisicaEscolar/18_orgaosColegiados';
import AcessoInternet from '../../components/EstruturaFisicaEscolar/10_acessoInternet';
import EquipamentosAlunosInternet from '../../components/EstruturaFisicaEscolar/11_equipamentoAlunosInternet';
import QuantidadeDeEquipamentos from '../../components/EstruturaFisicaEscolar/12_quantidadeDeEquipamentos';
import RadioGroup from '../../components/RadioGroup';
import { IEscola } from '../../types/Escola';
import EstruturaFisicaEscolar from '../../services/EstruturaFisicaEscolar';
import EstruturaFisicaEscolarContext from '../../context/EstruturaFisicaEscolar';
import { ActivityIndicator } from 'react-native';

interface IProps {
    data: Array<IEscola>,
    setData: React.Dispatch<React.SetStateAction<Array<IEscola>>>
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
    initData: () => void
    limit: number
}


const ViewEstruturaFisica = (props: IProps) => {
    const router = useRouter();
    const [selectedInep, setSeletedInep] = useState<string>('');
    const [selectedNome, setSeletedNome] = useState<string>('');
    const [answerExameClassificatorio, setAnswerExameClassificatorio] = useState<number | null>(null);
    const [answerProjetoPedagogico, setAnswerProjetoPedagogico] = useState<number | null>(null);
    const [localDeFuncionamento, setLocalDeFuncionamento] = useState<ILocalDeFuncionamento>();
    const [abastecimentoDeAgua, setAbastecimentoDeAgua] = useState<IAbastecimentoDeAgua>();
    const [energiaEletrica, setEnergiaEletrica] = useState<IEnergiaEletrica>();
    const [esgotamentoSanitario, setEsgotamentoSanitario] = useState<IEsgotamentoSanitario>();
    const [destinacaoDoLixo, setDestinacaoDoLixo] = useState<IDestinacaoDoLixo>();
    const [tratamentoDoLixo, setTratamentoDoLixo] = useState<ITratamentoDoLixo>();
    const [dependenciasFisicas, setDependenciasFisicas] = useState<IDependenciasFisicas>();
    const [recursosDeAcessibilidade, setRecursosDeAcessibilidade] = useState<IRecursosDeAcessibilidade>();
    const [equipamentos, setEquipamentos] = useState<IEquipamentos>();
    const [acessoInternet, setAcessoInternet] = useState<IAcessoInternet>();
    const [equipamentosAlunosInternet, setEquipamentosAlunosInternet] = useState<IEquipamentosAlunosInternet>();
    const [quantidadeEquipamentos, setQuantidadeEquipamentos] = useState<IQuantidadeEquipamentos>();
    const [redeLocal, setRedeLocal] = useState<IRedeLocal>();
    const [totalDeProfissionais, setTotalDeProfissionais] = useState<ITotalProfissionais>();
    const [instrumentosEMateriais, setInstrumentosEMateriais] = useState<IInstrumentosEMateriais>();
    const [linguaMinistrada, setLinguaMinistrada] = useState<ILinguaMinistrada>();
    const [reservaDeVagas, setReservaDeVagas] = useState<IReservaDeVagas>();
    const [orgaosColegiados, setOrgaosColegiados] = useState<IOrgaosColegiados>();
    const { inep } = useLocalSearchParams();

    const getData = async () => {
        const res: any = await EstruturaFisicaEscolar.getEstruturaFisicaEscolarByInep(inep?.toString() || '');
        if (res != false) {
            console.log(res);
            setAnswerProjetoPedagogico(res.campo_170);
            setAnswerExameClassificatorio(res.campo_154);
            setLocalDeFuncionamento({ campo_3: res.campo_3, campo_4: res.campo_4, campo_5: res.campo_5, campo_6: res.campo_6, campo_7: res.campo_7, campo_8: res.campo_8, campo_9: res.campo_9, campo_10: res.campo_10, campo_11: res.campo_11, campo_12: res.campo_12, campo_13: res.campo_13, campo_14: res.campo_14, campo_15: res.campo_15, campo_16: res.campo_16 });
            setAbastecimentoDeAgua({ campo_17: res.campo_17, campo_18: res.campo_18, campo_19: res.campo_19, campo_20: res.campo_20, campo_21: res.campo_21, campo_22: res.campo_22 });
            setEnergiaEletrica({ campo_23: res.campo_23, campo_24: res.campo_24, campo_25: res.campo_25, campo_26: res.campo_26 });
            setEsgotamentoSanitario({ campo_27: res.campo_27, campo_28: res.campo_28, campo_29: res.campo_29, campo_30: res.campo_30 });
            setDestinacaoDoLixo({ campo_31: res.campo_31, campo_32: res.campo_32, campo_33: res.campo_33, campo_34: res.campo_34, campo_35: res.campo_35 });
            setTratamentoDoLixo({ campo_36: res.campo_36, campo_37: res.campo_37, campo_38: res.campo_38, campo_39: res.campo_39 });
            setDependenciasFisicas({ campo_40: res.campo_40, campo_41: res.campo_41, campo_42: res.campo_42, campo_43: res.campo_43, campo_44: res.campo_44, campo_45: res.campo_45, campo_46: res.campo_46, campo_47: res.campo_47, campo_48: res.campo_48, campo_49: res.campo_49, campo_50: res.campo_50, campo_51: res.campo_51, campo_52: res.campo_52, campo_53: res.campo_53, campo_54: res.campo_54, campo_55: res.campo_55, campo_56: res.campo_56, campo_57: res.campo_57, campo_58: res.campo_58, campo_59: res.campo_59, campo_60: res.campo_60, campo_61: res.campo_61, campo_62: res.campo_62, campo_63: res.campo_63, campo_64: res.campo_64, campo_65: res.campo_65, campo_66: res.campo_66, campo_67: res.campo_67, campo_68: res.campo_68, campo_69: res.campo_69, campo_70: res.campo_70, campo_71: res.campo_71, campo_72: res.campo_72, campo_73: res.campo_73, campo_74: res.campo_74, campo_75: res.campo_75, campo_76: res.campo_76, campo_77: res.campo_77 });
            setRecursosDeAcessibilidade({ campo_78: res.campo_78, campo_79: res.campo_79, campo_80: res.campo_80, campo_81: res.campo_81, campo_82: res.campo_82, campo_83: res.campo_83, campo_84: res.campo_84, campo_85: res.campo_85, campo_86: res.campo_86, campo_87: res.campo_87, campo_88: res.campo_88, campo_89: res.campo_89, campo_90: res.campo_90 });
            setEquipamentos({ campo_91: res.campo_91, campo_92: res.campo_92, campo_93: res.campo_93, campo_94: res.campo_94, campo_95: res.campo_95, campo_96: res.campo_96, campo_97: res.campo_97 });
            setAcessoInternet({ campo_106: res.campo_106, campo_107: res.campo_107, campo_108: res.campo_108, campo_109: res.campo_109, campo_110: res.campo_110 });
            setEquipamentosAlunosInternet({ campo_111: res.campo_111, campo_112: res.campo_112, campo_113: res.campo_113 });
            setQuantidadeEquipamentos({ campo_98: res.campo_98, campo_99: res.campo_99, campo_100: res.campo_100, campo_101: res.campo_101, campo_102: res.campo_102, campo_103: res.campo_103, campo_104: res.campo_104, campo_105: res.campo_105 });
            setRedeLocal({ campo_114: res.campo_114, campo_115: res.campo_115, campo_116: res.campo_116 });
            setTotalDeProfissionais({ campo_117: res.campo_117, campo_118: res.campo_118, campo_119: res.campo_119, campo_120: res.campo_120, campo_121: res.campo_121, campo_122: res.campo_122, campo_123: res.campo_123, campo_124: res.campo_124, campo_125: res.campo_125, campo_126: res.campo_126, campo_127: res.campo_127, campo_128: res.campo_128, campo_129: res.campo_129, campo_130: res.campo_130, campo_131: res.campo_131, campo_132: res.campo_132, campo_133: res.campo_133, campo_134: res.campo_134 });
            setInstrumentosEMateriais({ campo_135: res.campo_135, campo_136: res.campo_136, campo_137: res.campo_137, campo_138: res.campo_138, campo_139: res.campo_139, campo_140: res.campo_140, campo_141: res.campo_141, campo_142: res.campo_142, campo_143: res.campo_143, campo_144: res.campo_144, campo_145: res.campo_145, campo_146: res.campo_146, campo_147: res.campo_147, campo_148: res.campo_148 });
            setLinguaMinistrada({ campo_149: res.campo_149, campo_150: res.campo_150, campo_151: res.campo_151, campo_152: res.campo_152, campo_153: res.campo_153 });
            setReservaDeVagas({ campo_155: res.campo_155, campo_156: res.campo_156, campo_157: res.campo_157, campo_158: res.campo_158, campo_159: res.campo_159, campo_160: res.campo_160, campo_161: res.campo_161, campo_162: res.campo_162, campo_163: res.campo_163 });
            setOrgaosColegiados({ campo_164: res.campo_164, campo_165: res.campo_165, campo_166: res.campo_166, campo_167: res.campo_167, campo_168: res.campo_168, campo_169: res.campo_169 });
        }
    }

    const getNome = async () => {
        const res: any = await Escola.getNomeByInep(inep?.toString() || '');
        if (res != false) {
            setSeletedNome(res);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getData();
            setSeletedInep(inep?.toString() || '');
            getNome();
        }, [])
    )

    return (
        <>
            <Stack.Screen options={{
                headerBackVisible: false,
                title: '',
                headerLeft: () => <Ionicons name='menu' color={COLORS.white} size={30} />,
                headerRight: () => <Ionicons name='exit-outline' color={COLORS.white} size={30} />,
                headerStyle: { backgroundColor: COLORS.green }
            }} />
            <View style={{ backgroundColor: COLORS.white }}>
                <ScrollView horizontal={false} style={styles.cardContainer}>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <TouchableOpacity onPress={() => { router.push('/'); }}><Ionicons name='arrow-back-outline' size={40} color={COLORS.green} /></TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', maxWidth: '90%', flexGrow: 1, color: COLORS.green }}>Visualizar Estrutura Física Escolar</Text>
                            </View>
                        </View>
                        <Text style={styles.textInfo}>Identifique a escola e forneça os dados a seguir</Text>
                        <View style={styles.filtros}>
                            <Text style={styles.txtFiltros}>DADOS DA ESCOLA</Text>
                            <View style={styles.inep_nome}>
                                <View style={{ flexGrow: 1, maxWidth: '100%', zIndex: 999 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Inep</Text>
                                    <TouchableOpacity disabled style={[styles.dropdownSelector, { backgroundColor: COLORS.lightGray }]}>
                                        <Text>{selectedInep}</Text>

                                        <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexGrow: 10, maxWidth: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                                    <TouchableOpacity disabled style={[styles.dropdownSelector, { backgroundColor: COLORS.lightGray }]}>
                                        <Text>{selectedNome}</Text>

                                        <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 40, zIndex: -1 }}>
                            <LocalDeFuncionamento data={localDeFuncionamento} />
                            <AbastecimentoDeAgua data={abastecimentoDeAgua} />
                            <FonteEnergiaEletrica data={energiaEletrica} />
                            <EsgotamentoSanitario />
                            <DestinacaoDoLixo />
                            <TratamentoDoLixo />
                            <DependenciasFisicas />
                            <RecursosDeAcessibilidade />
                            <Equipamentos />
                            <AcessoInternet />
                            <EquipamentosAlunosInternet />
                            <QuantidadeDeEquipamentos />
                            <RedeLocal />
                            <TotalDeProfissionais />
                            <InstrumentosEMateriais />
                            <LinguaMinistrada />
                            <View style={{ marginBottom: 25 }}>
                                <RadioGroup options={[1, 0]} value={answerExameClassificatorio} textOption={["SIM", "NÃO"]} color={COLORS.green} fontWeight='bold' question='A escola faz exame de seleção para ingresso de seus aluno(a)s (avaliação por prova e /ou analise curricular)*' onSelect={(option) => setAnswerExameClassificatorio(option)} />
                            </View>
                            <ReservaDeVagas />
                            <OrgaosColegiados />
                            <View style={{ marginBottom: 25 }}>
                                <RadioGroup options={[1, 0]} value={answerProjetoPedagogico} textOption={["SIM", "NÃO"]} color={COLORS.green} fontWeight='bold' question='O projeto político pedagógico ou a proposta pedagógica da escola (conforme art. 12 da LDB) foi atualizada nos últimos 12 meses até a data de referência*' onSelect={(option) => setAnswerProjetoPedagogico(option)} />
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    );
}

export default ViewEstruturaFisica;
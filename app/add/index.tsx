import { Stack, useRouter } from 'expo-router';
import { View, Text, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';

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
import ValidateAbastecimentoDeAgua from '../../services/EstruturaFisicaEscolar/2_ValidateAbastecimentoDeAgua';
import ValidateFonteEnergiaEletrica from '../../services/EstruturaFisicaEscolar/3_ValidateFonteEnergiaEletrica';
import ValidateEsgotamentoSanitario from '../../services/EstruturaFisicaEscolar/4_ValidateEsgotamentoSanitario';
import ValidateDestinacaoDoLixo from '../../services/EstruturaFisicaEscolar/5_ValidateDestinacaoDoLixo';
import ValidateTratamentoDoLixo from '../../services/EstruturaFisicaEscolar/6_ValidateTratamentoDoLixo';
import ValidateDependenciasFisicas from '../../services/EstruturaFisicaEscolar/7_ValidateDependenciasFisicas';
import ValidateRecursosDeAcessibilidade from '../../services/EstruturaFisicaEscolar/8_ValidateRecursosDeAcessibilidade';
import ValidateEquipamentos from '../../services/EstruturaFisicaEscolar/9_ValidateEquipamentos';
import ValidateQuantidadeEquipamentos from '../../services/EstruturaFisicaEscolar/12_ValidateQuantidadeEquipamentos';
import ValidateAcessoInternet from '../../services/EstruturaFisicaEscolar/10_ValidateAcessoInternet';
import ValidateEquipamentosAlunosInternet from '../../services/EstruturaFisicaEscolar/11_ValidateEquipamentosAlunosInternet';
import ValidateRedeLocal from '../../services/EstruturaFisicaEscolar/13_ValidateRedeLocal';
import ValidateTotalProfissionais from '../../services/EstruturaFisicaEscolar/14_ValidateTotalDeProfissionais';
import ValidateInstrumentosEMateriais from '../../services/EstruturaFisicaEscolar/15_ValidateInstrumentosEMateriais';
import ValidateLinguaMinistrada from '../../services/EstruturaFisicaEscolar/16_LinguaMinistrada';
import ValidateReservaDeVagas from '../../services/EstruturaFisicaEscolar/17_ReservaDeVagas';
import ValidateOrgaosColegiados from '../../services/EstruturaFisicaEscolar/18_OrgaosColegiados';
import AcessoInternet from '../../components/EstruturaFisicaEscolar/10_acessoInternet';
import EquipamentosAlunosInternet from '../../components/EstruturaFisicaEscolar/11_equipamentoAlunosInternet';
import QuantidadeDeEquipamentos from '../../components/EstruturaFisicaEscolar/12_quantidadeDeEquipamentos';
import RadioGroup from '../../components/RadioGroup';
import { IEscola } from '../../types/Escola';
import EstruturaFisicaEscolar from '../../services/EstruturaFisicaEscolar';
import Loading from '../../components/Loading';

interface IProps {
    data: Array<IEscola>,
    setData: React.Dispatch<React.SetStateAction<Array<IEscola>>>
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
    initData: () => void
    limit: number
}


const AddEstruturaFisica = (props: IProps) => {

    const router = useRouter();
    const [data, setData] = useState<Array<IEscola>>([{ id: 0, nome: '', inep: '', tipo: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const [messageOk, setMessageOk] = useState('');
    const [messageError, setMessageError] = useState('');
    const [inepClicked, setInepClicked] = useState(false);
    const [nomeClicked, setNomeClicked] = useState(false);
    const [selectedInep, setSeletedInep] = useState<string>('');
    const [selectedNome, setSeletedNome] = useState<string>();
    const [formErrorsLocalDeFuncionamento, setFormErrorsLocalDeFuncionamento] = useState({});
    const [formErrorsAbastecimentoDeAgua, setFormErrorsAbastecimentoDeAgua] = useState({});
    const [formErrorsFonteEnergiaEletrica, setFormErrorsFonteEnergiaEletrica] = useState({});
    const [formErrorsEsgotamentoSanitario, setFormErrorsEsgotamentoSanitario] = useState({});
    const [formErrorsDestinacaoDoLixo, setFormErrorsDestinacaoDoLixo] = useState({});
    const [formErrorsTratamentoDoLixo, setFormErrorsTratamentoDoLixo] = useState({});
    const [formErrorsDependenciasFisicas, setFormErrorsDependenciasFisicas] = useState({});
    const [formErrorsRecursosDeAcessibilidade, setFormErrorsRecursosDeAcessibilidade] = useState({});
    const [formErrorsEquipamentos, setFormErrorsEquipamentos] = useState({});
    const [formErrorsQuantidadeEquipamentos, setFormErrorsQuantidadeEquipamentos] = useState({});
    const [formErrorsAcessoInternet, setFormErrorsAcessoInternet] = useState({});
    const [formErrorsEquipamentoAlunoInternet, setFormErrorsEquipamentoAlunoInternet] = useState({});
    const [formErrorsRedeLocal, setFormErrorsRedeLocal] = useState({});
    const [formErrorsTotalDeProfissionais, setFormErrorsTotalDeProfissionais] = useState({});
    const [formErrorsInstrumentosEMateriais, setFormErrorsInstrumentosEMateriais] = useState({});
    const [formErrorsLinguaMinistrada, setFormErrorsLinguaMinistrada] = useState({});
    const [formErrorsReservaDeVagas, setFormErrorsReservarDeVagas] = useState({});
    const [formErrorsOrgaosColegiados, setFormErrorsOrgaosColegiados] = useState({});
    const [answerLocalDeFuncionamento, setAnswerLocalDeFuncionamento] = useState<ILocalDeFuncionamento>({ campo_3: null, campo_4: null, campo_5: null, campo_6: null, campo_7: null, campo_8: null, campo_9: null, campo_10: null, campo_11: '', campo_12: '', campo_13: '', campo_14: '', campo_15: '', campo_16: '' });
    const [answerAbastecimentoDeAgua, setAnswerAbastecimentoDeAgua] = useState<IAbastecimentoDeAgua>({ campo_17: null, campo_18: null, campo_19: null, campo_20: null, campo_21: null, campo_22: 0 });
    const [answerFonteEnergiaEletrica, setAnswerFonteEnergiaEletrica] = useState<IEnergiaEletrica>({ campo_23: null, campo_24: null, campo_25: null, campo_26: 0 });
    const [answerEsgotamentoSanitario, setAnswerEsgotamentoSanitario] = useState<IEsgotamentoSanitario>({ campo_27: null, campo_28: null, campo_29: null, campo_30: 0 });
    const [answerDestinacaoDoLixo, setAnswerDestinacaoDoLixo] = useState<IDestinacaoDoLixo>({ campo_31: null, campo_32: null, campo_33: null, campo_34: null, campo_35: null });
    const [answerTratamentoDoLixo, setAnswerTratamentoDoLixo] = useState<ITratamentoDoLixo>({ campo_36: null, campo_37: null, campo_38: null, campo_39: 0 });
    const [answerDependenciaFisica, setAnswerDependenciaFisica] = useState<IDependenciasFisicas>({ campo_40: null, campo_41: null, campo_42: null, campo_43: null, campo_44: null, campo_45: null, campo_46: null, campo_47: null, campo_48: null, campo_49: null, campo_50: null, campo_51: null, campo_52: null, campo_53: null, campo_54: null, campo_55: null, campo_56: null, campo_57: null, campo_58: null, campo_59: null, campo_60: null, campo_61: null, campo_62: null, campo_63: null, campo_64: null, campo_65: null, campo_66: null, campo_67: null, campo_68: null, campo_69: null, campo_70: null, campo_71: null, campo_72: null, campo_73: null, campo_74: null, campo_75: null, campo_76: null, campo_77: 0 });
    const [answerRecursosDeAcessibilidade, setAnswerRecursosDeAcessibilidade] = useState<IRecursosDeAcessibilidade>({ campo_78: null, campo_79: null, campo_80: null, campo_81: null, campo_82: null, campo_83: null, campo_84: null, campo_85: null, campo_86: 0, campo_87: '', campo_88: '', campo_89: '', campo_90: '' });
    const [answerEquipamentos, setAnswerEquipamentos] = useState<IEquipamentos>({ campo_91: null, campo_92: null, campo_93: null, campo_94: null, campo_95: null, campo_96: null, campo_97: 0 });
    const [answerQuantidadeEquipamentos, setAnswerQuantidadeEquipamentos] = useState<IQuantidadeEquipamentos>({ campo_98: '', campo_99: '', campo_100: '', campo_101: '', campo_102: '', campo_103: '', campo_104: '', campo_105: '' });
    const [answerAcessoInternet, setAnswerAcessoInternet] = useState<IAcessoInternet>({ campo_106: null, campo_107: null, campo_108: null, campo_109: null, campo_110: 0 });
    const [answerEquipamentosAlunosInternet, setAnswerEquipamentosAlunosInternet] = useState<IEquipamentosAlunosInternet>({ campo_111: null, campo_112: null, campo_113: null });
    const [answerRedeLocal, setAnswerRedeLocal] = useState<IRedeLocal>({ campo_114: null, campo_115: null, campo_116: 0 });
    const [answerTotalProfissionais, setAnswerTotalProfissionais] = useState<ITotalProfissionais>({ campo_117: '', campo_118: '', campo_119: '', campo_120: '', campo_121: '', campo_122: '', campo_123: '', campo_124: '', campo_125: '', campo_126: '', campo_127: '', campo_128: '', campo_129: '', campo_130: '', campo_131: '', campo_132: '', campo_133: 0, campo_134: null });
    const [answerInstrumentosEMateriais, setAnswerInstrumentosEMaterias] = useState<IInstrumentosEMateriais>({ campo_135: null, campo_136: null, campo_137: null, campo_138: null, campo_139: null, campo_140: null, campo_141: null, campo_142: null, campo_143: null, campo_144: null, campo_145: null, campo_146: null, campo_147: 0, campo_148: null });
    const [answerLinguaMinistrada, setAnswerLinguaMinistrada] = useState<ILinguaMinistrada>({ campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
    const [answerReservaDeVagas, setAnswerReservaDeVagas] = useState<IReservaDeVagas>({ campo_155: null, campo_156: null, campo_157: null, campo_158: null, campo_159: null, campo_160: 0, campo_161: null, campo_162: null, campo_163: null });
    const [answerOrgaosColegiados, setAnswerOrgaosColegiados] = useState<IOrgaosColegiados>({ campo_164: null, campo_165: null, campo_166: null, campo_167: null, campo_168: null, campo_169: 0 });
    const [answerExameClassificatorio, setAnswerExameClassificatorio] = useState<number | null>(null);
    const [answerProjetoPedagogico, setAnswerProjetoPedagogico] = useState<number | null>(null);
    const limit: number = 10;

    const getNomeAcrossInep = (data: Array<IEscola>, inepSelected: number | string) => {
        const selectedItem = data.find(item => item.inep === inepSelected);
        if (selectedItem) {
            setSeletedNome(selectedItem.nome);
        }
    }

    const getInepAcrossNome = (data: Array<IEscola>, nomeSelected: string, id: number) => {
        const filteredItems = data.find(item => item.nome === nomeSelected && item.id === id);
        if (filteredItems) {
            setSeletedInep(filteredItems.inep.toString());
        }
    }

    const searchDataByInep = async (inep: string) => {
        const res: any = await Escola.getEscolaByInep(inep);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }


    const searchDataByNome = async (nome: string) => {
        nome = nome.replace('  ', ' ');
        const res: any = await Escola.getEscolaByNome(nome);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    const initData = async () => {
        const res: any = await Escola.getAll(limit);
        if (res != false) {
            setData(res);
        }
    }


    const onLocalDeFuncionamentoChange = (answer: ILocalDeFuncionamento) => {
        setAnswerLocalDeFuncionamento(answer);
        setFormErrorsLocalDeFuncionamento({});
        setFormErrorsRecursosDeAcessibilidade({});
    }

    const onAbastecimentoDeAguaChange = (answer: IAbastecimentoDeAgua) => {
        setAnswerAbastecimentoDeAgua(answer);
        setFormErrorsAbastecimentoDeAgua({});
    }

    const onFonteEnergiaEletricaChange = (answer: IEnergiaEletrica) => {
        setAnswerFonteEnergiaEletrica(answer);
        setFormErrorsFonteEnergiaEletrica({});
    }

    const onEsgotamentoSanitarioChange = (answer: IEsgotamentoSanitario) => {
        setAnswerEsgotamentoSanitario(answer);
        setFormErrorsEsgotamentoSanitario({});
    }

    const onDestinacaoDoLixo = (answer: IDestinacaoDoLixo) => {
        setAnswerDestinacaoDoLixo(answer);
        setFormErrorsDestinacaoDoLixo({});
    }
    const onTratamentoDoLixo = (answer: ITratamentoDoLixo) => {
        setAnswerTratamentoDoLixo(answer);
        setFormErrorsTratamentoDoLixo({});
    }
    const onDependenciasFisicas = (answer: IDependenciasFisicas) => {
        setAnswerDependenciaFisica(answer);
        setFormErrorsDependenciasFisicas({});
    }

    const onRecursosDeAcessibilidade = (answer: IRecursosDeAcessibilidade) => {
        setAnswerRecursosDeAcessibilidade(answer);
        setFormErrorsRecursosDeAcessibilidade({});
    }

    const onEquipamentos = (answer: IEquipamentos) => {
        setAnswerEquipamentos(answer);
        setFormErrorsEquipamentos({});
    }

    const onQuantidadeEquipamentos = (answer: IQuantidadeEquipamentos) => {
        setAnswerQuantidadeEquipamentos(answer);
        setFormErrorsQuantidadeEquipamentos({});
    }

    const onAcessoInternet = (answer: IAcessoInternet) => {
        setAnswerAcessoInternet(answer);
        setFormErrorsAcessoInternet({});
        setFormErrorsEquipamentos({});
    }

    const onEquipamentosAlunosInternet = (answer: IEquipamentosAlunosInternet) => {
        setAnswerEquipamentosAlunosInternet(answer);
        setFormErrorsEquipamentoAlunoInternet({});
    }

    const onRedeLocal = (answer: IRedeLocal) => {
        setAnswerRedeLocal(answer);
        setFormErrorsRedeLocal({});
    }

    const onTotalDeProfissionais = (answer: ITotalProfissionais) => {
        setAnswerTotalProfissionais(answer);
        setFormErrorsTotalDeProfissionais({});
    }

    const onInstrumentosEMateriais = (answer: IInstrumentosEMateriais) => {
        setAnswerInstrumentosEMaterias(answer);
        setFormErrorsInstrumentosEMateriais({});
    }

    const onLinguaMinistrada = (answer: ILinguaMinistrada) => {
        setAnswerLinguaMinistrada(answer);
        setFormErrorsLinguaMinistrada({});
    }


    const onReservaDeVagas = (answer: IReservaDeVagas) => {
        setAnswerReservaDeVagas(answer);
        setFormErrorsReservarDeVagas({});
    }

    const onOrgaosColegiados = (answer: IOrgaosColegiados) => {
        setAnswerOrgaosColegiados(answer);
        setFormErrorsOrgaosColegiados({});
    }

    const onSaveRascunho = async () => {
        const forms: IAllValues = {
            ...answerLocalDeFuncionamento, ...answerAbastecimentoDeAgua, ...answerFonteEnergiaEletrica,
            ...answerEsgotamentoSanitario, ...answerDestinacaoDoLixo, ...answerTratamentoDoLixo, ...answerDependenciaFisica,
            ...answerRecursosDeAcessibilidade, ...answerEquipamentos, ...answerAcessoInternet, ...answerEquipamentosAlunosInternet,
            ...answerQuantidadeEquipamentos, ...answerRedeLocal, ...answerTotalProfissionais, ...answerInstrumentosEMateriais,
            ...answerLinguaMinistrada, ...answerReservaDeVagas, ...answerOrgaosColegiados, campo_154: answerExameClassificatorio,
            campo_170: answerProjetoPedagogico, inep_fk: selectedInep
        }

        if (!selectedInep) {
            setMessageError('Selecione uma escola antes de enviar o questionário!');
            setTimeout(() => {
                setMessageError('');
            }, 3000);
            return;
        }

        setIsLoading(true);
        const response = await EstruturaFisicaEscolar.insertEstruturaFisicaEscolar(forms);
        setIsLoading(false);
        if (response) {
            setMessageOk('Cadastro realizado com sucesso!');
            const time = setTimeout(() => {
                setMessageOk('');
                router.back();
            }, 3000);
            return clearTimeout(time);
        } else {
            setMessageError('Ocorreu algum erro ao inserir os dados, tente novamente!');
            const time = setTimeout(() => {
                setMessageError('');
            }, 3000);
            return clearTimeout(time);
        }
    }


    const onSave = async () => {
        const res_1 = ValidateLocalDeFuncionamento.validate(answerLocalDeFuncionamento, selectedInep);
        const res_2 = ValidateAbastecimentoDeAgua.validate(answerAbastecimentoDeAgua);
        const res_3 = ValidateFonteEnergiaEletrica.validate(answerFonteEnergiaEletrica);
        const res_4 = ValidateEsgotamentoSanitario.validate(answerEsgotamentoSanitario);
        const res_5 = ValidateDestinacaoDoLixo.validate(answerDestinacaoDoLixo);
        const res_6 = ValidateTratamentoDoLixo.validate(answerTratamentoDoLixo);
        const res_7 = ValidateDependenciasFisicas.validate(answerDependenciaFisica);
        const res_8 = ValidateRecursosDeAcessibilidade.validate(answerRecursosDeAcessibilidade, answerLocalDeFuncionamento);
        const res_9 = ValidateEquipamentos.validate(answerEquipamentos);
        const res_10 = ValidateAcessoInternet.validate(answerAcessoInternet);
        const res_11 = ValidateEquipamentosAlunosInternet.validate(answerEquipamentosAlunosInternet, answerAcessoInternet);
        const res_12 = ValidateQuantidadeEquipamentos.validate(answerQuantidadeEquipamentos, answerEquipamentosAlunosInternet);
        const res_13 = ValidateRedeLocal.validate(answerRedeLocal);
        const res_14 = ValidateTotalProfissionais.validate(answerTotalProfissionais);
        const res_15 = ValidateInstrumentosEMateriais.validate(answerInstrumentosEMateriais);
        const res_16 = ValidateLinguaMinistrada.validate(answerLinguaMinistrada, answerInstrumentosEMateriais);
        const res_17 = ValidateReservaDeVagas.validate(answerReservaDeVagas, answerExameClassificatorio);
        const res_18 = ValidateOrgaosColegiados.validate(answerOrgaosColegiados);
        
        if (!selectedInep) {
            setMessageError('Selecione uma escola antes de enviar o questionário!');
            setTimeout(() => {
                setMessageError('');
            }, 3000);
            return;
        }
        if (res_1 || res_2 || res_3 || res_4 ||
            res_5 || res_6 || res_7 || res_8 ||
            res_9 || res_10 || res_11 || res_12 ||
            res_13 || res_14 || res_15 || res_16 ||
            res_17 || res_18) {
            setFormErrorsLocalDeFuncionamento(res_1);
            setFormErrorsAbastecimentoDeAgua(res_2);
            setFormErrorsFonteEnergiaEletrica(res_3);
            setFormErrorsEsgotamentoSanitario(res_4);
            setFormErrorsDestinacaoDoLixo(res_5);
            setFormErrorsTratamentoDoLixo(res_6);
            setFormErrorsDependenciasFisicas(res_7);
            setFormErrorsRecursosDeAcessibilidade(res_8);
            setFormErrorsEquipamentos(res_9);
            setFormErrorsAcessoInternet(res_10);
            setFormErrorsEquipamentoAlunoInternet(res_11);
            setFormErrorsQuantidadeEquipamentos(res_12);
            setFormErrorsRedeLocal(res_13);
            setFormErrorsTotalDeProfissionais(res_14);
            setFormErrorsInstrumentosEMateriais(res_15);
            setFormErrorsLinguaMinistrada(res_16);
            setFormErrorsReservarDeVagas(res_17);
            setFormErrorsOrgaosColegiados(res_18);
            return;
        }
        const forms: IAllValues = {
            ...answerLocalDeFuncionamento, ...answerAbastecimentoDeAgua, ...answerFonteEnergiaEletrica,
            ...answerEsgotamentoSanitario, ...answerDestinacaoDoLixo, ...answerTratamentoDoLixo, ...answerDependenciaFisica,
            ...answerRecursosDeAcessibilidade, ...answerEquipamentos, ...answerAcessoInternet, ...answerEquipamentosAlunosInternet,
            ...answerQuantidadeEquipamentos, ...answerRedeLocal, ...answerTotalProfissionais, ...answerInstrumentosEMateriais,
            ...answerLinguaMinistrada, ...answerReservaDeVagas, ...answerOrgaosColegiados, campo_154: answerExameClassificatorio,
            campo_170: answerProjetoPedagogico, inep_fk: selectedInep
        }
        
        setIsLoading(true);
        const response = await EstruturaFisicaEscolar.insertEstruturaFisicaEscolar(forms);
        setIsLoading(false);
        if (response) {
            const response = await Escola.updateTipoEscola('Rascunho', selectedInep);
            if (response) {
                setMessageOk('Cadastro realizado com sucesso!');
                const time = setTimeout(() => {
                    setMessageOk('');
                }, 3000);
                return clearTimeout(time);
            } else {
                setMessageError('Ocorreu algum ao atualizar o status da escola, tente novamente!');
                const time = setTimeout(() => {
                    setMessageError('');
                }, 3000);
                return clearTimeout(time);
            }

        } else {
            setMessageError('Ocorreu algum erro ao inserir os dados, tente novamente!');
            const time = setTimeout(() => {
                setMessageError('');
            }, 3000);
            return clearTimeout(time);
        }

    }

    useEffect(() => {
        initData();
    }, [])

    return (
        <>
            <Stack.Screen options={{
                headerBackVisible: false,
                title: '',
                headerLeft: () => <Ionicons name='menu' color={COLORS.white} size={30} />,
                headerRight: () => <Ionicons name='exit-outline' color={COLORS.white} size={30} />,
                headerStyle: { backgroundColor: COLORS.green }
            }} />
            <View style={{ backgroundColor: COLORS.lightGreen }}>
                {isLoading ? <Loading width='80' height='80' />
                    :
                    <>
                        {messageOk && <View style={styles.messageOk}><Ionicons name='checkmark-circle-outline' size={40} color={COLORS.green} /><Text style={{ fontWeight: 'bold', color: COLORS.green }}>{messageOk}</Text></View>}
                        {messageError && <View style={styles.messageError}><Ionicons name='close-circle-outline' size={40} color={COLORS.red} /><Text style={{ fontWeight: 'bold', color: COLORS.red }}>{messageError}</Text></View>}
                    </>
                }
                <ScrollView style={styles.cardContainer}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <TouchableOpacity onPress={() => router.back()}><Ionicons name='arrow-back-outline' size={40} color={COLORS.green} /></TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green }}>Cadastrar Estrutura Física Escolar</Text>
                            </View>
                            <TouchableOpacity style={styles.btnSalvarRascunho} onPress={onSaveRascunho}><Text style={{ color: COLORS.green, fontWeight: 'bold' }}>Salvar Rascunho</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.textInfo}>Identifique a escola e forneça os dados a seguir</Text>
                        <View style={styles.filtros}>
                            <Text style={styles.txtFiltros}>DADOS DA ESCOLA</Text>
                            <View style={styles.inep_nome}>
                                <View style={{ flexGrow: 1, maxWidth: '100%', zIndex: 999 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Inep</Text>
                                    <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setInepClicked(!inepClicked); initData() }}>
                                        <Text>{selectedInep}</Text>
                                        {inepClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                            <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                                    </TouchableOpacity>
                                    {inepClicked ?
                                        <View style={styles.dropdownArea}>
                                            <TextInput placeholder="Pesquisar por inep" placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchDataByInep(txt) }} />
                                            {data.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedInep(item.inep.toString()); getNomeAcrossInep(data, item.inep); searchDataByInep(item.inep.toString()); setInepClicked(false); }}>
                                                        <Text>{item.inep}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View> : null}
                                </View>
                                <View style={{ flexGrow: 10, maxWidth: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                                    <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setNomeClicked(!nomeClicked); initData() }}>
                                        <Text>{selectedNome}</Text>
                                        {nomeClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                            <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                                    </TouchableOpacity>
                                    {nomeClicked ?
                                        <View style={styles.dropdownArea}>
                                            <TextInput placeholder="Pesquisar por nome da escola" placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchDataByNome(txt) }} />
                                            {data.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedNome(item.nome); getInepAcrossNome(data, item.nome, item.id); searchDataByNome(item.nome); setNomeClicked(false); }}>
                                                        <Text>{item.nome}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View> : null}
                                </View>
                            </View>
                            <View style={{ marginTop: 20, zIndex: -1 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome do Anexo da Escola</Text>
                                <TextInput style={styles.inputAnexo} />
                            </View>
                        </View>
                        <View style={{ marginTop: 40, zIndex: -1 }}>
                            <LocalDeFuncionamento formErrors={formErrorsLocalDeFuncionamento} localDeFuncionamentoChange={(value) => onLocalDeFuncionamentoChange(value)} />
                            <AbastecimentoDeAgua formErrors={formErrorsAbastecimentoDeAgua} abastecimentoDeAguaChange={(value) => onAbastecimentoDeAguaChange(value)} />
                            <FonteEnergiaEletrica formErrors={formErrorsFonteEnergiaEletrica} fonteEnergiaEletricaChange={(value) => onFonteEnergiaEletricaChange(value)} />
                            <EsgotamentoSanitario formErrors={formErrorsEsgotamentoSanitario} esgotamentoSanitarioChange={(value) => onEsgotamentoSanitarioChange(value)} />
                            <DestinacaoDoLixo formErrors={formErrorsDestinacaoDoLixo} destinacaoDoLixo={(value) => onDestinacaoDoLixo(value)} />
                            <TratamentoDoLixo formErrors={formErrorsTratamentoDoLixo} tratamentoDoLixo={(value) => onTratamentoDoLixo(value)} />
                            <DependenciasFisicas formErrors={formErrorsDependenciasFisicas} dependenciasFisicas={(value) => onDependenciasFisicas(value)} />
                            <RecursosDeAcessibilidade formErrors={formErrorsRecursosDeAcessibilidade} recursosDeAcessibilidade={(value) => onRecursosDeAcessibilidade(value)} answerLocalDeFuncionamento={answerLocalDeFuncionamento} />
                            <Equipamentos formErrors={formErrorsEquipamentos} equipamentos={(value) => onEquipamentos(value)} />
                            <AcessoInternet formErrors={formErrorsAcessoInternet} acessoInternet={(value) => onAcessoInternet(value)} />
                            <EquipamentosAlunosInternet formErrors={formErrorsEquipamentoAlunoInternet} answerAcessoInternet={answerAcessoInternet} answerRedeLocal={answerRedeLocal} equipamentosAlunosInternet={(value) => onEquipamentosAlunosInternet(value)} />
                            <QuantidadeDeEquipamentos formErrors={formErrorsQuantidadeEquipamentos} quantidadeDeEquipamentos={(value) => onQuantidadeEquipamentos(value)} answerEquipamentosAlunosInternet={answerEquipamentosAlunosInternet} />
                            <RedeLocal formErrors={formErrorsRedeLocal} answerEquipamentos={answerEquipamentos} answerQuantidadeEquipamentos={answerQuantidadeEquipamentos} redeLocal={(value) => onRedeLocal(value)} />
                            <TotalDeProfissionais formErrors={formErrorsTotalDeProfissionais} totalDeProfissionais={(value) => onTotalDeProfissionais(value)} />
                            <InstrumentosEMateriais formErrors={formErrorsInstrumentosEMateriais} instrumentosEMateriais={(value) => onInstrumentosEMateriais(value)} />
                            <LinguaMinistrada formErrors={formErrorsLinguaMinistrada} linguaMinistrada={(value) => onLinguaMinistrada(value)} answerInstrumentosEMateriais={answerInstrumentosEMateriais} />
                            <View style={{ marginBottom: 25 }}>
                                <RadioGroup options={[1, 0]} value={answerExameClassificatorio} textOption={["SIM", "NÃO"]} color={COLORS.green} fontWeight='bold' question='A escola faz exame de seleção para ingresso de seus aluno(a)s (avaliação por prova e /ou analise curricular)*' onSelect={(option) => setAnswerExameClassificatorio(option)} />
                            </View>
                            <ReservaDeVagas formErrors={formErrorsReservaDeVagas} reservaDeVagas={(value) => onReservaDeVagas(value)} exameClassificatorio={answerExameClassificatorio} />
                            <OrgaosColegiados formErrors={formErrorsOrgaosColegiados} orgaosColegiados={(value) => onOrgaosColegiados(value)} />
                            <View style={{ marginBottom: 25 }}>
                                <RadioGroup options={[1, 0]} value={answerProjetoPedagogico} textOption={["SIM", "NÃO"]} color={COLORS.green} fontWeight='bold' question='O projeto político pedagógico ou a proposta pedagógica da escola (conforme art. 12 da LDB) foi atualizada nos últimos 12 meses até a data de referência*' onSelect={(option) => setAnswerProjetoPedagogico(option)} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: COLORS.gray, paddingTop: 50, marginTop: 50, marginBottom: 50, gap: 20 }}>
                                <TouchableOpacity style={styles.btnCancelar} ><Text style={{ color: COLORS.green }}>Cancelar</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnSalvar} onPress={onSave}><Text style={{ color: COLORS.white }}>Salvar</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    );
}

export default AddEstruturaFisica;
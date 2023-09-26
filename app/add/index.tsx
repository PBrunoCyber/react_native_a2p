import { Stack } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';

import { IAbastecimentoDeAgua, IAcessoInternet, IDependenciasFisicas, IDestinacaoDoLixo, IEnergiaEletrica, IEquipamentos, IEquipamentosAlunosInternet, IEsgotamentoSanitario, ILocalDeFuncionamento, IQuantidadeEquipamentos, IRecursosDeAcessibilidade, IRedeLocal, ITratamentoDoLixo } from '../../types/EstruturaFisicaEscolar';
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
import ValidateRedeLocal from '../../services/EstruturaFisicaEscolar/13_RedeLocal';
import AcessoInternet from '../../components/EstruturaFisicaEscolar/10_acessoInternet';
import EquipamentosAlunosInternet from '../../components/EstruturaFisicaEscolar/11_equipamentoAlunosInternet';
import QuantidadeDeEquipamentos from '../../components/EstruturaFisicaEscolar/12_quantidadeDeEquipamentos';

interface IData {
    id: number,
    nome: string,
    inep: number,
    tipo: string,
}

interface IProps {
    data: Array<IData>,
    setData: React.Dispatch<React.SetStateAction<Array<IData>>>
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
    initData: () => void
    limit: number
}




const AddEstruturaFisica = (props: IProps) => {

    const [data, setData] = useState<Array<IData>>([{ id: 0, nome: '', inep: 0, tipo: '' }]);
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
    const [answerLocalDeFuncionamento, setAnswerLocalDeFuncionamento] = useState<ILocalDeFuncionamento | undefined>();
    const [answerAbastecimentoDeAgua, setAnswerAbastecimentoDeAgua] = useState<IAbastecimentoDeAgua>();
    const [answerFonteEnergiaEletrica, setAnswerFonteEnergiaEletrica] = useState<IEnergiaEletrica>();
    const [answerEsgotamentoSanitario, setAnswerEsgotamentoSanitario] = useState<IEsgotamentoSanitario>();
    const [answerDestinacaoDoLixo, setAnswerDestinacaoDoLixo] = useState<IDestinacaoDoLixo>();
    const [answerTratamentoDoLixo, setAnswerTratamentoDoLixo] = useState<ITratamentoDoLixo>();
    const [answerDependenciaFisica, setAnswerDependenciaFisica] = useState<IDependenciasFisicas>();
    const [answerRecursosDeAcessibilidade, setAnswerRecursosDeAcessibilidade] = useState<IRecursosDeAcessibilidade>();
    const [answerEquipamentos, setAnswerEquipamentos] = useState<IEquipamentos>();
    const [answerQuantidadeEquipamentos, setAnswerQuantidadeEquipamentos] = useState<IQuantidadeEquipamentos>();
    const [answerAcessoInternet, setAnswerAcessoInternet] = useState<IAcessoInternet>();
    const [answerEquipamentosAlunosInternet, setAnswerEquipamentosAlunosInternet] = useState<IEquipamentosAlunosInternet>();
    const [answerRedeLocal, setAnswerRedeLocal] = useState<IRedeLocal>();
    const limit: number = 10;

    const getNomeAcrossInep = (data: Array<IData>, inepSelected: number | string) => {
        const selectedItem = data.find(item => item.inep === inepSelected);
        if (selectedItem) {
            setSeletedNome(selectedItem.nome);
        }
    }

    const getInepAcrossNome = (data: Array<IData>, nomeSelected: string, id: number) => {
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
    }

    const onEquipamentosAlunosInternet = (answer: IEquipamentosAlunosInternet) => {
        setAnswerEquipamentosAlunosInternet(answer);
        setFormErrorsEquipamentoAlunoInternet({});
    }

    const onRedeLocal = (answer: IRedeLocal) => {
        setAnswerRedeLocal(answer);
        setFormErrorsRedeLocal({});
    }


    const onSubmit = () => {
        const res_1 = ValidateLocalDeFuncionamento.validate(answerLocalDeFuncionamento);
        const res_2 = ValidateAbastecimentoDeAgua.validate(answerAbastecimentoDeAgua);
        const res_3 = ValidateFonteEnergiaEletrica.validate(answerFonteEnergiaEletrica);
        const res_4 = ValidateEsgotamentoSanitario.validate(answerEsgotamentoSanitario);
        const res_5 = ValidateDestinacaoDoLixo.validate(answerDestinacaoDoLixo);
        const res_6 = ValidateTratamentoDoLixo.validate(answerTratamentoDoLixo);
        const res_7 = ValidateDependenciasFisicas.validate(answerDependenciaFisica);
        const res_8 = ValidateRecursosDeAcessibilidade.validate(answerRecursosDeAcessibilidade, answerLocalDeFuncionamento);
        const res_9 = ValidateEquipamentos.validate(answerEquipamentos);
        const res_10 = ValidateQuantidadeEquipamentos.validate(answerQuantidadeEquipamentos, answerEquipamentosAlunosInternet);
        const res_11 = ValidateAcessoInternet.validate(answerAcessoInternet);
        const res_12 = ValidateEquipamentosAlunosInternet.validate(answerEquipamentosAlunosInternet, answerAcessoInternet);
        const res_13 = ValidateRedeLocal.validate(answerRedeLocal);
        if (res_1 || res_2 || res_3 || res_4 || 
            res_5 || res_6 || res_7 || res_8 || 
            res_9 || res_10 || res_11 || res_12 ||
            res_13) {
            setFormErrorsLocalDeFuncionamento(res_1);
            setFormErrorsAbastecimentoDeAgua(res_2);
            setFormErrorsFonteEnergiaEletrica(res_3);
            setFormErrorsEsgotamentoSanitario(res_4);
            setFormErrorsDestinacaoDoLixo(res_5);
            setFormErrorsTratamentoDoLixo(res_6);
            setFormErrorsDependenciasFisicas(res_7);
            setFormErrorsRecursosDeAcessibilidade(res_8);
            setFormErrorsEquipamentos(res_9);
            setFormErrorsQuantidadeEquipamentos(res_10);
            setFormErrorsAcessoInternet(res_11);
            setFormErrorsEquipamentoAlunoInternet(res_12);
            setFormErrorsRedeLocal(res_13);
            return;
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
                <ScrollView style={styles.cardContainer}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <Ionicons name='arrow-back-outline' size={40} color={COLORS.green} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green }}>Cadastrar Estrutura Física Escolar</Text>
                            </View>
                            <TouchableOpacity style={styles.btnSalvarRascunho}><Text style={{ color: COLORS.green, fontWeight: 'bold' }}>Salvar Rascunho</Text></TouchableOpacity>
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
                            <AcessoInternet formErrors={formErrorsAcessoInternet} acessoInternet={(value)=> onAcessoInternet(value)}/>
                            <EquipamentosAlunosInternet formErrors={formErrorsEquipamentoAlunoInternet} answerAcessoInternet={answerAcessoInternet} answerRedeLocal={answerRedeLocal} equipamentosAlunosInternet={(value)=> onEquipamentosAlunosInternet(value)}/>
                            <QuantidadeDeEquipamentos formErrors={formErrorsQuantidadeEquipamentos} quantidadeDeEquipamentos={(value) => onQuantidadeEquipamentos(value)} answerEquipamentosAlunosInternet={answerEquipamentosAlunosInternet} />
                            <RedeLocal formErrors={formErrorsRedeLocal} answerEquipamentos={answerEquipamentos} answerQuantidadeEquipamentos={answerQuantidadeEquipamentos} redeLocal={(value)=> onRedeLocal(value)}/>
                            <TotalDeProfissionais />
                            <InstrumentosEMateriais />
                            <LinguaMinistrada />
                            <ReservaDeVagas />
                            <OrgaosColegiados />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: COLORS.gray, paddingTop: 50, marginTop: 50, marginBottom: 50, gap: 20 }}>
                                <TouchableOpacity style={styles.btnCancelar} ><Text style={{ color: COLORS.green }}>Cancelar</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnSalvar} onPress={onSubmit}><Text style={{ color: COLORS.white }}>Salvar</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    );
}

export default AddEstruturaFisica;
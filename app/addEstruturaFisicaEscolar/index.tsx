import { Stack, useRouter } from 'expo-router';
import { View, Text, TextInput, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useContext, useEffect, useState } from 'react';

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
import EstruturaFisicaEscolarContext from '../../context/EstruturaFisicaEscolar';
import { ActivityIndicator } from 'react-native';

interface IProps {
    data: Array<IEscola>,
    setData: React.Dispatch<React.SetStateAction<Array<IEscola>>>
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
    initData: () => void
    limit: number
}


const AddEstruturaFisica = (props: IProps) => {
    const context = useContext(EstruturaFisicaEscolarContext);
    const router = useRouter();
    const [data, setData] = useState<Array<IEscola>>([{ id: 0, nome: '', inep: '', tipo: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const [messageOk, setMessageOk] = useState('');
    const [messageError, setMessageError] = useState('');
    const [existsError, setExistsError] = useState('');
    const [inepClicked, setInepClicked] = useState(false);
    const [nomeClicked, setNomeClicked] = useState(false);
    const [selectedInep, setSeletedInep] = useState<string>();
    const [selectedNome, setSeletedNome] = useState<string>();
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

    const verifyExistsFormByInep = async () => {
        const res: any = await EstruturaFisicaEscolar.getEstruturaFisicaEscolarByInep(selectedInep || '');
        if (res !== false) {
            setExistsError(`Já existe formulário para essa escola, id: ${res.id}`);
        }
    }

    useEffect(() => {
        if (selectedInep != undefined) {
            verifyExistsFormByInep();
            setExistsError('');
        }
    }, [selectedInep])

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

    const onSaveRascunho = async () => {
        const forms: IAllValues = {
            ...context.answerLocalDeFuncionamento, ...context.answerAbstecimentoDeAgua, ...context.answerEnergiaEletrica,
            ...context.answerEsgotamentoSanitario, ...context.answerDestinacaoDoLixo, ...context.answerTratamentoDoLixo, ...context.answerDependenciasFisicas,
            ...context.answerRecursosDeAcessibilidade, ...context.answerEquipamentos, ...context.answerAcessoInternet, ...context.answerEquipamentosAlunosInternet,
            ...context.answerQuantidadeDeEquipamentos, ...context.answerRedeLocal, ...context.answerTotalDeProfissionais, ...context.answerInstrumentosEMateriais,
            ...context.answerLinguasMinistradas, ...context.answerReservaDeVagas, ...context.answerOrgaosColegiados, campo_154: answerExameClassificatorio,
            campo_170: answerProjetoPedagogico, inep_fk: selectedInep
        }
        const res: any = await EstruturaFisicaEscolar.getEstruturaFisicaEscolarByInep(selectedInep || '');

        if (res !== false) {
            setMessageError('Já existe um formulário para essa escola!');
            setTimeout(() => {
                setMessageError('');
            }, 3000);
            return;
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
            const response = await Escola.updateTipoEscola('Rascunho', selectedInep);
            if (response) {
                setMessageOk('Rascunho salvo com sucesso!');
                setTimeout(() => {
                    setMessageOk('');
                    router.push('/');
                }, 1000);
                return;
            } else {
                setMessageError('Ocorreu algum ao atualizar o status da escola, tente novamente!');
                setTimeout(() => {
                    setMessageError('');
                }, 3000);
                return;
            }

        } else {
            setMessageError('Ocorreu algum erro ao inserir os dados, tente novamente!');

            setTimeout(() => {
                setMessageError('');
            }, 3000);
            return;
        }

    }


    const onSave = async () => {
        const res_1 = ValidateLocalDeFuncionamento.validate(context.answerLocalDeFuncionamento, selectedInep || '');
        const res_2 = ValidateAbastecimentoDeAgua.validate(context.answerAbstecimentoDeAgua);
        const res_3 = ValidateFonteEnergiaEletrica.validate(context.answerEnergiaEletrica);
        const res_4 = ValidateEsgotamentoSanitario.validate(context.answerEsgotamentoSanitario);
        const res_5 = ValidateDestinacaoDoLixo.validate(context.answerDestinacaoDoLixo);
        const res_6 = ValidateTratamentoDoLixo.validate(context.answerTratamentoDoLixo);
        const res_7 = ValidateDependenciasFisicas.validate(context.answerDependenciasFisicas);
        const res_8 = ValidateRecursosDeAcessibilidade.validate(context.answerRecursosDeAcessibilidade, context.answerLocalDeFuncionamento);
        const res_9 = ValidateEquipamentos.validate(context.answerEquipamentos);
        const res_10 = ValidateAcessoInternet.validate(context.answerAcessoInternet);
        const res_11 = ValidateEquipamentosAlunosInternet.validate(context.answerEquipamentosAlunosInternet, context.answerAcessoInternet);
        const res_12 = ValidateQuantidadeEquipamentos.validate(context.answerQuantidadeDeEquipamentos, context.answerEquipamentosAlunosInternet);
        const res_13 = ValidateRedeLocal.validate(context.answerRedeLocal);
        const res_14 = ValidateTotalProfissionais.validate(context.answerTotalDeProfissionais);
        const res_15 = ValidateInstrumentosEMateriais.validate(context.answerInstrumentosEMateriais);
        const res_16 = ValidateLinguaMinistrada.validate(context.answerLinguasMinistradas, context.answerInstrumentosEMateriais);
        const res_17 = ValidateReservaDeVagas.validate(context.answerReservaDeVagas, answerExameClassificatorio);
        const res_18 = ValidateOrgaosColegiados.validate(context.answerOrgaosColegiados);

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
            context.setFormErrorsLocalDeFuncionamento(res_1);
            context.setFormErrorsAbastecimentoDeAgua(res_2);
            context.setFormErrorsEnergiaEletrica(res_3);
            context.setFormErrorsEsgotamentoSanitario(res_4);
            context.setFormErrorsDestinacaoDoLixo(res_5);
            context.setFormErrorsTratamentoDoLixo(res_6);
            context.setFormErrorsDependenciasFisicas(res_7);
            context.setFormErrorsRecursosDeAcessibilidade(res_8);
            context.setFormErrorsEquipamentos(res_9);
            context.setFormErrorsAcessoInternet(res_10);
            context.setFormErrorsEquipamentosAlunosInternet(res_11);
            context.setFormErrorsQuantidadeDeEquipamentos(res_12);
            context.setFormErrorsRedeLocal(res_13);
            context.setFormErrorsTotalDeProfissionais(res_14);
            context.setFormErrorsInstrumentosEMateriais(res_15);
            context.setFormErrorsLinguasMinistradas(res_16);
            context.setFormErrorsReservaDeVagas(res_17);
            context.setFormErrorsOrgaosColegiados(res_18);
            return;
        }
        const forms: IAllValues = {
            ...context.answerLocalDeFuncionamento, ...context.answerAbstecimentoDeAgua, ...context.answerEnergiaEletrica,
            ...context.answerEsgotamentoSanitario, ...context.answerDestinacaoDoLixo, ...context.answerTratamentoDoLixo, ...context.answerDependenciasFisicas,
            ...context.answerRecursosDeAcessibilidade, ...context.answerEquipamentos, ...context.answerAcessoInternet, ...context.answerEquipamentosAlunosInternet,
            ...context.answerQuantidadeDeEquipamentos, ...context.answerRedeLocal, ...context.answerTotalDeProfissionais, ...context.answerInstrumentosEMateriais,
            ...context.answerLinguasMinistradas, ...context.answerReservaDeVagas, ...context.answerOrgaosColegiados, campo_154: answerExameClassificatorio,
            campo_170: answerProjetoPedagogico, inep_fk: selectedInep
        }

        setIsLoading(true);
        const response = await EstruturaFisicaEscolar.insertEstruturaFisicaEscolar(forms);
        setIsLoading(false);
        if (response) {
            const response = await Escola.updateTipoEscola('Final', selectedInep);
            if (response) {
                setMessageOk('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    setMessageOk('');
                    router.push('/');
                }, 3000);
                return;
            } else {
                setMessageError('Ocorreu algum ao atualizar o status da escola, tente novamente!');
                setTimeout(() => {
                    setMessageError('');
                }, 3000);
                return;
            }

        } else {
            setMessageError('Ocorreu algum erro ao inserir os dados, tente novamente!');
            setTimeout(() => {
                setMessageError('');
            }, 3000);
            return;
        }

    }

    useEffect(() => {
        setSeletedInep('');
        setSeletedNome('');
        setExistsError('');
        setAnswerExameClassificatorio(null);
        setAnswerProjetoPedagogico(null);
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
            <View style={{ backgroundColor: COLORS.white }}>
                {isLoading ?
                    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                        <ActivityIndicator color={COLORS.green} size={40} />
                    </View>
                    :
                    <>
                        {messageOk && <View style={styles.messageOk}><Ionicons name='checkmark-circle-outline' size={40} color={COLORS.green} /><Text style={{ fontWeight: 'bold', color: COLORS.green }}>{messageOk}</Text></View>}
                        {messageError && <View style={styles.messageError}><Ionicons name='close-circle-outline' size={40} color={COLORS.red} /><Text style={{ fontWeight: 'bold', color: COLORS.red }}>{messageError}</Text></View>}
                    </>
                }
                <ScrollView horizontal={false} style={styles.cardContainer}>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <TouchableOpacity onPress={() => { router.push('/'); }}><Ionicons name='arrow-back-outline' size={40} color={COLORS.green} /></TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', maxWidth: '90%', flexGrow: 1, color: COLORS.green }}>Cadastrar Estrutura Física Escolar</Text>
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
                            {existsError ? <Text style={{ color: COLORS.red, marginTop: 10, zIndex: -1 }}>{existsError}</Text> : null}

                            <View style={{ marginTop: 20, zIndex: -999 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome do Anexo da Escola</Text>
                                <TextInput style={styles.inputAnexo} />
                            </View>
                        </View>
                        <View style={{ marginTop: 40, zIndex: -1 }}>
                            <LocalDeFuncionamento formErrors={context?.formErrorsLocalDeFuncionamento} localDeFuncionamentoChange={(value) => context?.onLocalDeFuncionamentoChange(value)} />
                            <AbastecimentoDeAgua context={context.answerAbstecimentoDeAgua} formErrors={context.formErrorsAbastecimentoDeAgua} abastecimentoDeAguaChange={(value) => context.onAbastecimentoDeAguaChange(value)} />
                            <FonteEnergiaEletrica context={context.answerEnergiaEletrica} formErrors={context.formErrorsEnergiaEletrica} fonteEnergiaEletricaChange={(value) => context.onEnergiaEletricaChange(value)} />
                            <EsgotamentoSanitario context={context.answerEsgotamentoSanitario} formErrors={context.formErrorsEsgotamentoSanitario} esgotamentoSanitarioChange={(value) => context.onEsgotamentoSanitarioChange(value)} />
                            <DestinacaoDoLixo context={context.answerDestinacaoDoLixo} formErrors={context.formErrorsDestinacaoDoLixo} destinacaoDoLixo={(value) => context.onDestinacaoDoLixoChange(value)} />
                            <TratamentoDoLixo context={context.answerTratamentoDoLixo} formErrors={context.formErrorsTratamentoDoLixo} tratamentoDoLixo={(value) => context.onTratamentoDoLixoChange(value)} />
                            <DependenciasFisicas context={context.answerDependenciasFisicas} formErrors={context.formErrorsDependenciasFisicas} dependenciasFisicas={(value) => context.onDependenciasFisicasChange(value)} />
                            <RecursosDeAcessibilidade context={context.answerRecursosDeAcessibilidade} formErrors={context.formErrorsRecursosDeAcessibilidade} recursosDeAcessibilidade={(value) => context.onRecursosDeAcessibilidadeChange(value)} answerLocalDeFuncionamento={context.answerLocalDeFuncionamento} />
                            <Equipamentos context={context.answerEquipamentos} formErrors={context.formErrorsEquipamentos} equipamentos={(value) => context.onEquipamentosChange(value)} />
                            <AcessoInternet context={context.answerAcessoInternet} formErrors={context.formErrorsAcessoInternet} acessoInternet={(value) => context.onAcessoInternetChange(value)} />
                            <EquipamentosAlunosInternet context={context.answerEquipamentosAlunosInternet} formErrors={context.formErrorsEquipamentosAlunosInternet} answerAcessoInternet={context.answerAcessoInternet} answerRedeLocal={context.answerRedeLocal} equipamentosAlunosInternet={(value) => context.onEquipamentosAlunosInternetChange(value)} />
                            <QuantidadeDeEquipamentos context={context.answerQuantidadeDeEquipamentos} formErrors={context.formErrorsQuantidadeDeEquipamentos} quantidadeDeEquipamentos={(value) => context.onQuantidadeDeEquipamentosChange(value)} answerEquipamentosAlunosInternet={context.answerEquipamentosAlunosInternet} />
                            <RedeLocal context={context.answerRedeLocal} formErrors={context.formErrorsRedeLocal} answerEquipamentos={context.answerEquipamentos} answerQuantidadeEquipamentos={context.answerQuantidadeDeEquipamentos} redeLocal={(value) => context.onRedeLocalChange(value)} />
                            <TotalDeProfissionais context={context.answerTotalDeProfissionais} formErrors={context.formErrorsTotalDeProfissionais} totalDeProfissionais={(value) => context.onTotalDeProfissionaisChange(value)} />
                            <InstrumentosEMateriais context={context.answerInstrumentosEMateriais} formErrors={context.formErrorsInstrumentosEMateriais} instrumentosEMateriais={(value) => context.onInstrumentosEMateriaisChange(value)} />
                            <LinguaMinistrada context={context.answerLinguasMinistradas} formErrors={context.formErrorsLinguasMinistradas} linguaMinistrada={(value) => context.onLinguasMinistradasChange(value)} answerInstrumentosEMateriais={context.answerInstrumentosEMateriais} />
                            <View style={{ marginBottom: 25 }}>
                                <RadioGroup options={[1, 0]} value={answerExameClassificatorio} textOption={["SIM", "NÃO"]} color={COLORS.green} fontWeight='bold' question='A escola faz exame de seleção para ingresso de seus aluno(a)s (avaliação por prova e /ou analise curricular)*' onSelect={(option) => setAnswerExameClassificatorio(option)} />
                            </View>
                            <ReservaDeVagas context={context.answerReservaDeVagas} formErrors={context.formErrorsReservaDeVagas} reservaDeVagas={(value) => context.onReservaDeVagasChange(value)} exameClassificatorio={answerExameClassificatorio} />
                            <OrgaosColegiados context={context.answerOrgaosColegiados} formErrors={context.formErrorsOrgaosColegiados} orgaosColegiados={(value) => context.onOrgaosColegiadosChange(value)} />
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
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


const ViewEstruturaFisica = (props: IProps) => {
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



    useEffect(() => {
        setSeletedInep('');
        setSeletedNome('');
        setExistsError('');
        setAnswerExameClassificatorio(null);
        setAnswerProjetoPedagogico(null);
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
                                <Text style={{ fontSize: 20, fontWeight: 'bold', maxWidth: '90%', flexGrow: 1, color: COLORS.green }}>Visualizar Estrutura Física Escolar</Text>
                            </View>
                        </View>
                        <Text style={styles.textInfo}>Identifique a escola e forneça os dados a seguir</Text>
                        <View style={styles.filtros}>
                            <Text style={styles.txtFiltros}>DADOS DA ESCOLA</Text>
                            <View style={styles.inep_nome}>
                                <View style={{ flexGrow: 1, maxWidth: '100%', zIndex: 999 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Inep</Text>
                                    <TouchableOpacity style={styles.dropdownSelector}>
                                        <Text>{selectedInep}</Text>
                                        {inepClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                            <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexGrow: 10, maxWidth: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                                    <TouchableOpacity style={styles.dropdownSelector}>
                                        <Text>{selectedNome}</Text>
                                        {nomeClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                            <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                                    </TouchableOpacity>
                                </View>
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
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    );
}

export default ViewEstruturaFisica;
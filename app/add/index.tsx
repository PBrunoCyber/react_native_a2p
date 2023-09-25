import { Stack } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';

import Escola from '../../services/Escola';
import LocalDeFuncionamento from '../../components/EstruturaFisicaEscolar/1_localDeFuncionamento';
import AbastecimentoDeAgua from '../../components/EstruturaFisicaEscolar/2_abastecimentoDeAgua';
import { ILocalDeFuncionamento } from '../../types/EstruturaFisicaEscolar';

import ValidateLocalDeFuncionamento from '../../services/ValidateLocalDeFuncionamento';
import FonteEnergiaEletrica from '../../components/EstruturaFisicaEscolar/3_fonteEnergiaEletrica';
import EsgotamentoSanitario from '../../components/EstruturaFisicaEscolar/4_esgotamentoSanitario';
import DestinacaoDoLixo from '../../components/EstruturaFisicaEscolar/5_destinacaoDoLixo';
import TratamentoDoLixo from '../../components/EstruturaFisicaEscolar/6_tratamentoDoLixo';
import DependenciasFisicas from '../../components/EstruturaFisicaEscolar/7_dependenciasFisicas';
import RecursosDeAcessibilidade from '../../components/EstruturaFisicaEscolar/8_recursosDeAcessibilidade';
import Equipamentos from '../../components/EstruturaFisicaEscolar/9_equipamentos';
import QuantidadeDeEquipamentos from '../../components/EstruturaFisicaEscolar/10_quantidadeDeEquipamentos';
import AcessoInternet from '../../components/EstruturaFisicaEscolar/11_acessoInternet';
import EquipamentosAlunosInternet from '../../components/EstruturaFisicaEscolar/12_equipamentoAlunosInternet';
import RedeLocal from '../../components/EstruturaFisicaEscolar/13_redeLocal';
import TotalDeProfissionais from '../../components/EstruturaFisicaEscolar/14_totalDeProfissionais';
import InstrumentosEMateriais from '../../components/EstruturaFisicaEscolar/15_InstrumentosEMateriais';
import LinguaMinistrada from '../../components/EstruturaFisicaEscolar/16_linguaMinistrada';
import ReservaDeVagas from '../../components/EstruturaFisicaEscolar/17_reservaDeVagas';
import OrgaosColegiados from '../../components/EstruturaFisicaEscolar/18_orgaosColegiados';

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
    const [isSave, setIsSave] = useState<boolean>();
    const [formErrors, setFormErrors] = useState({});
    const [answerLocalDeFuncionamento, setAnswerLocalDeFuncionamento] = useState<ILocalDeFuncionamento>();
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


    const onLocalDeFuncionamentoChange = async (answer: ILocalDeFuncionamento) => {
        setAnswerLocalDeFuncionamento(answer);
        setFormErrors({});
    }

    const onSubmit = () => {
        const res = ValidateLocalDeFuncionamento.validateLocalDeFuncionamento(answerLocalDeFuncionamento);
        if(res){
            setFormErrors(res);
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
            <View style={{backgroundColor: COLORS.lightGreen}}>
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
                        <View style={{ marginTop: 40 , zIndex: -1}}>
                            <LocalDeFuncionamento formErrors={formErrors} localDeFuncionamentoChange={(value) => onLocalDeFuncionamentoChange(value)} />
                            <AbastecimentoDeAgua />
                            <FonteEnergiaEletrica />
                            <EsgotamentoSanitario />
                            <DestinacaoDoLixo />
                            <TratamentoDoLixo />
                            <DependenciasFisicas />
                            <RecursosDeAcessibilidade />
                            <Equipamentos /> 
                            <QuantidadeDeEquipamentos/>
                            <AcessoInternet />
                            <EquipamentosAlunosInternet />
                            <RedeLocal/>
                            <TotalDeProfissionais />
                            <InstrumentosEMateriais />
                            <LinguaMinistrada/>
                            <ReservaDeVagas />
                            <OrgaosColegiados />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1,borderColor: COLORS.gray, paddingTop: 50, marginTop: 50, marginBottom: 50, gap: 20 }}>
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
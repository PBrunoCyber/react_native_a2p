import { Stack } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';

import Escola from '../../services/Escola';
import LocalDeFuncionamento from '../../components/localDeFuncionamento';
import AbastecimentoDeAgua from '../../components/abastecimentoDeAgua';
import { ILocalDeFuncionamento } from '../../types/EstruturaFisicaEscolar';

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
        const errors: any = {};
        if (answerLocalDeFuncionamento?.campo_3 === null) {
            errors.campo_3 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_4 === null) {
            errors.campo_4 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_5 === null) {
            errors.campo_5 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_6 === null) {
            errors.campo_6 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_7 === null) {
            errors.campo_7 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_8 === null) {
            errors.campo_8 = "Campo Obrigatório"
        }
        if (answerLocalDeFuncionamento?.campo_3 === 0
            && answerLocalDeFuncionamento?.campo_4 === 0
            && answerLocalDeFuncionamento?.campo_5 === 0
            && answerLocalDeFuncionamento?.campo_6 === 0
            && answerLocalDeFuncionamento?.campo_7 === 0
            && answerLocalDeFuncionamento?.campo_8 === 0
        ){
            errors.localDeFuncionamento = "Local de funcionamento da escola não foi preenchido corretamente. Não podem ser informadas todas as opções com valor igual a 0 (Não)."
        }
        if(answerLocalDeFuncionamento?.campo_3 === 1 && answerLocalDeFuncionamento?.campo_9 === null){
            errors.campo_9 = "Campo Obrigatório"
        }
        if(answerLocalDeFuncionamento?.campo_3 === 1 && answerLocalDeFuncionamento?.campo_10 === null){
            errors.campo_10 = "Campo Obrigatório"
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_11 === ""){
            errors.campo_11 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_12 === ""){
            errors.campo_12 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_13 === ""){
            errors.campo_13 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_14 === ""){
            errors.campo_14 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_15 === ""){
            errors.campo_15 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_10 === 1 && answerLocalDeFuncionamento?.campo_16 === ""){
            errors.campo_16 = "Campo obrigatório";
        }
        if(answerLocalDeFuncionamento?.campo_11 && answerLocalDeFuncionamento?.campo_11.length < 8){
            errors.campo_11 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_12 && answerLocalDeFuncionamento?.campo_12.length < 8){
            errors.campo_12 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_13 && answerLocalDeFuncionamento?.campo_13.length < 8){
            errors.campo_13 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_14 && answerLocalDeFuncionamento?.campo_14.length < 8){
            errors.campo_14 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_15 && answerLocalDeFuncionamento?.campo_15.length < 8){
            errors.campo_15 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_16 && answerLocalDeFuncionamento?.campo_16.length < 8){
            errors.campo_16 = "Código incompleto ou incorreto";
        }
        if(answerLocalDeFuncionamento?.campo_11 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_11)){
            errors.campo_11 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_12 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_12)){
            errors.campo_12 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_13 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_13)){
            errors.campo_13 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_14 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_14)){
            errors.campo_14 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_15 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_15)){
            errors.campo_15 = "Informe apenas números";
        }
        if(answerLocalDeFuncionamento?.campo_16 && !/^\d+$/.test(answerLocalDeFuncionamento?.campo_16)){
            errors.campo_16 = "Informe apenas números";
        }
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
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
            <View style={styles.cardContainer}>
                <ScrollView>
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
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome do Anexo da Escola</Text>
                                <TextInput style={styles.inputAnexo} />
                            </View>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <LocalDeFuncionamento formErrors={formErrors} localDeFuncionamentoChange={(value) => onLocalDeFuncionamentoChange(value)} />
                            <AbastecimentoDeAgua />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40, gap: 20 }}>
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
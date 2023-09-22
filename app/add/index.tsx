import { Stack } from 'expo-router';
import { View, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/add.style';
import { COLORS } from '../../constants/theme'
import { useEffect, useState } from 'react';

import Escola from '../../services/Escola';
import LocalDeFuncionamento from '../../components/inputLocalDeFuncionamento';

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
                            <LocalDeFuncionamento />
                        </View>
                    </View>
                </ScrollView>
            </View>

        </>
    );
}

export default AddEstruturaFisica;
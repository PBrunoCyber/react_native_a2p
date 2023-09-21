import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, Image, TextInput, FlatList, } from 'react-native';
import styles from './home.style';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Escola from '../services/Escola';
import json from '../json/escolas.json';

const Home = () => {
    // const schools = [
    //     { nome: "Instituto Federal do Piauí - Campus Floriano", logradouro: "", bairro: "", cep: "", numero: "", estado: "", cidade: "", complemento: "" },
    //     { nome: "Escola Municipal Antônio Nivaldo", logradouro: "", bairro: "", cep: "", numero: "", estado: "", cidade: "", complemento: "" },
    //     { nome: "Escola Municipal Antônio Waquim", logradouro: "", bairro: "", cep: "", numero: "", estado: "", cidade: "", complemento: "" },
    // ]


    // const loadSchools = async () => {
    //     const jsonData = await AsyncStorage.getItem('formData');
    //     let data = [];
    //     if (jsonData != null) {
    //         data = JSON.parse(jsonData);
    //         for (let index = 0; index < data.length; index++) {
    //             schools.push(data[index])
    //         }
    //     }
    //     setData(schools);
    //     return schools;
    // }

    interface IData {
        id: number,
        nome: string,
        inep: number,
        tipo: string,
    }

    const [selectedInep, setSeletedInep] = useState<number>();
    const [selectedNome, setSeletedNome] = useState<string>();
    const [inepClicked, setInepClicked] = useState(false);
    const [nomeClicked, setNomeClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Array<IData>>([{ id: 0, nome: '', inep: 0, tipo: '' }]);
    const router = useRouter();

    // useEffect(() => {
    //     loadSchools();
    // }, [isClicked])

    const insertOrNotEscola = async () => {
        const res = await Escola.existsEscola();
        if (res != true) {
            setIsLoading(true);
            json.map((item, index) => {
                Escola.insertEscola({ inep: item.codINEPEntidade.toString(), id: item.idEntidade, nome: item.nome, tipo: "Não Iniciado" });
            })
            setIsLoading(false);
        }
    }

    const createOrNotEscola = async () => {
        const res = await Escola.existsEscola();
        if (res != true) {
            Escola.createTBEscola();
        }
    }

    const getNomeAcrossInep = (data: Array<IData>, inepSelected: number) => {
        const selectedItem = data.find(item => item.inep === inepSelected);
        if (selectedItem) {
            setSeletedNome(selectedItem.nome);
        }
    }

    const getInepAcrossNome = (data: Array<IData>, nomeSelected: string, id: number) => {
        const filteredItems = data.find(item => item.nome === nomeSelected && item.id === id);
        if (filteredItems) {
            setSeletedInep(filteredItems.inep);
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
        const res: any = await Escola.getEscolaByNome(nome);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    const initData = async () => {
        const res: any = await Escola.getAllEscolas();
        if (res != false) {
            setData(res);
        }
    }

    useEffect(() => {
        // Escola.dropTBEscola();
        createOrNotEscola();
        insertOrNotEscola();
        initData();
    }, [])

    // const onSearch = async (txt: string) => {
    //     const res = await loadSchools();

    //     if (txt !== '') {
    //         let tempData = res.filter(item => {
    //             return item.nome.toLowerCase().includes(txt.toLowerCase());
    //         });
    //         setData(tempData);
    //     } else {
    //         setData(res);
    //     }
    // }

    return (
        <>
            <Stack.Screen options={{
                title: "Home", headerTitleStyle: { color: 'white' }, headerShadowVisible: false,
                headerLeft: () => <Ionicons name='menu' color={'white'} size={30} />,
                headerRight: () => <Ionicons name='exit-outline' color={'white'} size={30} />,
                headerStyle: { backgroundColor: 'green' }
            }} />
            <View style={{ margin: 20 }}>
                <View style={styles.cardContainer}>
                    <View style={styles.add}>
                        <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>Estrutura Física Escolar</Text>
                        <TouchableOpacity style={styles.addBtn}><Ionicons name='add-outline' size={40} color={'#fff'} /></TouchableOpacity>
                    </View>
                    <View style={styles.filtros}>
                        <Text style={styles.txtFiltros}>FILTROS</Text>
                        <View style={styles.inep_nome}>
                            <View style={{ flexGrow: 1, maxWidth: 400, zIndex: 999 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Inep</Text>
                                <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setInepClicked(!inepClicked); initData() }}>
                                    <Text>{selectedInep}</Text>
                                    {inepClicked ? <Ionicons name='chevron-up-outline' color={'green'} size={30} /> :
                                        <Ionicons name='chevron-down-outline' color={'green'} size={30} />}
                                </TouchableOpacity>
                                {inepClicked ?
                                    <View style={styles.dropdownArea}>
                                        <TextInput placeholder={'Pesquisar Inep'} placeholderTextColor={'green'} onChangeText={(text) => searchDataByInep(text)} style={styles.searchInput} />
                                        {data?.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedInep(item.inep); getNomeAcrossInep(data, item.inep); searchDataByInep(''); setInepClicked(false); }}>
                                                    <Text>{item.inep}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View> : null}
                            </View>
                            <View style={{ flexGrow: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                                <TouchableOpacity style={styles.dropdownSelector} onPress={() => setNomeClicked(!nomeClicked)}>
                                    <Text>{selectedNome}</Text>
                                    {nomeClicked ? <Ionicons name='chevron-up-outline' color={'green'} size={30} /> :
                                        <Ionicons name='chevron-down-outline' color={'green'} size={30} />}
                                </TouchableOpacity>
                                {nomeClicked ?
                                    <View style={styles.dropdownArea}>
                                        <TextInput placeholder="Pesquisar escolas" placeholderTextColor={'green'} style={styles.searchInput} onChangeText={txt => { return searchDataByNome(txt) }} />
                                        {data.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedNome(item.nome); getInepAcrossNome(data, item.nome, item.id); searchDataByNome(''); setNomeClicked(false); }}>
                                                    <Text>{item.nome}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View> : null}
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end', gap: 10, zIndex: -1 }}>
                        <TouchableOpacity style={styles.btnCancelar}><Text style={{ color: 'green', fontWeight: 'bold' }}>Cancelar</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnPesquisar}><Text style={{ color: 'white', fontWeight: 'bold' }}>Pesquisar</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <ScrollView style={styles.container}>
                <Text style={styles.title}></Text>
                <TouchableOpacity style={styles.dropdownSelector} onPress={() => setIsClicked(!isClicked)}>
                    <Text>{selectedSchool}</Text>
                    {isClicked ? <Image source={require('../assets/icons/dropup.png')} style={styles.icon} /> :
                        <Image source={require('../assets/icons/dropdown.png')} style={styles.icon} />}
                </TouchableOpacity>
                {isClicked ?
                    <View style={styles.dropdownArea}>
                        <TextInput placeholder="Pesquisar escolas" style={styles.searchInput} onChangeText={txt => { return onSearch(txt) }} />
                        {data.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedSchool(item.nome); onSearch(''); setIsClicked(false); }}>
                                    <Text>{item.nome}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View> : null}
                <TouchableOpacity style={styles.button} onPress={() => router.push(`/form/${selectedSchool}`)}>
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Abrir</Text>
                </TouchableOpacity>
            </ScrollView> */}
            <View style={styles.containerBtn}>
                <Link href={'/addSchool/'}>
                    <TouchableOpacity style={styles.addBtn}>
                        <Ionicons name='add-outline' color={'white'} size={50} />
                    </TouchableOpacity>
                </Link>
            </View>
        </>
    )
}

export default Home;
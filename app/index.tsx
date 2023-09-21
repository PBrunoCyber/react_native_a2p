import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import styles from './home.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Escola from '../services/Escola';
import json from '../json/escolas.json';



const Home = () => {

    interface IData {
        id: number,
        nome: string,
        inep: number,
        tipo: string,
    }
    const limit: number = 10;
    const [selectedInep, setSeletedInep] = useState<string>('');
    const [selectedNome, setSeletedNome] = useState<string>();
    const [inepClicked, setInepClicked] = useState(false);
    const [nomeClicked, setNomeClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Array<IData>>([{ id: 0, nome: '', inep: 0, tipo: '' }]);
    const router = useRouter();
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [isChecked, setIsChecked] = useState<boolean>();

    const paginate = (type: string) => {
        if (type === "skipBack") setCurrentPage(1);
        if (type === "skipForward") setCurrentPage(numberOfPages);
        if (type === 'back') {
            if (currentPage > 1) {
                let current: number = currentPage;
                setCurrentPage(current = current - 1);
            }
        }
        if (type === 'forward') {
            if (currentPage < numberOfPages) {
                let current: number = currentPage;
                setCurrentPage(current = current + 1);
            }
        }
    }

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
            setSeletedInep(filteredItems.inep.toString());
        }
    }


    const searchDataByInep = async (inep: string) => {
            const res: any = await Escola.getEscolaByInep(inep);
            const count: any = await Escola.getNumberOfPagesWithInep(inep, limit);
            setNumberOfPages(count);
            if (res != false) {
                setData(res);
            } else {
                setData([]);
            }
    }

    const searchDataByNome = async (nome: string) => {
        nome = nome.replace('  ', ' ');
        const res: any = await Escola.getEscolaByNome(nome);
        const count: any = await Escola.getNumberOfPagesWithNome(nome, limit);
        setNumberOfPages(count);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    const getNumberOfPages = async() => {
        const total: any = await Escola.getNumberOfPages(limit);
        setNumberOfPages(total);
    }

    const initData = async () => {
        const res: any = await Escola.getWithPagination(limit, (currentPage - 1) * limit);
        if (res != false) {
            getNumberOfPages();
            setData(res);
        }
    }

    const getWithPagination = async () => {
        const res: any = await Escola.getWithPagination(limit, (currentPage - 1) * limit);
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

    useEffect(() => {
        getWithPagination();
    }, [currentPage]);

    return (
        <>
            <Stack.Screen options={{
                title: "Home", headerTitleStyle: { color: 'white' }, headerShadowVisible: false,
                headerLeft: () => <Ionicons name='menu' color={'white'} size={30} />,
                headerRight: () => <Ionicons name='exit-outline' color={'white'} size={30} />,
                headerStyle: { backgroundColor: 'green' }
            }} />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.add}>
                            <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>Estrutura Física Escolar</Text>
                            <TouchableOpacity style={styles.addBtn}><Ionicons name='add-outline' size={40} color={'#fff'} /></TouchableOpacity>
                        </View>
                        <View style={styles.filtros}>
                            <Text style={styles.txtFiltros}>FILTROS</Text>
                            <View style={styles.inep_nome}>
                                <View style={{ flexGrow: 1, maxWidth: '100%', zIndex: 999 }}>
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
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedInep(item.inep.toString()); getNomeAcrossInep(data, item.inep);searchDataByInep(item.inep.toString()); setInepClicked(false); }}>
                                                        <Text>{item.inep}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View> : null}
                                </View>
                                <View style={{ flexGrow: 10, maxWidth: '100%' }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                                    <TouchableOpacity style={styles.dropdownSelector} onPress={() => {setNomeClicked(!nomeClicked); initData()}}>
                                        <Text>{selectedNome}</Text>
                                        {nomeClicked ? <Ionicons name='chevron-up-outline' color={'green'} size={30} /> :
                                            <Ionicons name='chevron-down-outline' color={'green'} size={30} />}
                                    </TouchableOpacity>
                                    {nomeClicked ?
                                        <View style={styles.dropdownArea}>
                                            <TextInput placeholder="Pesquisar escolas" placeholderTextColor={'green'} style={styles.searchInput} onChangeText={txt => { return searchDataByNome(txt) }} />
                                            {data.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedNome(item.nome); getInepAcrossNome(data, item.nome, item.id);searchDataByNome(item.nome);  setNomeClicked(false); }}>
                                                        <Text>{item.nome}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View> : null}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{maxWidth: 900,marginTop:20, alignItems: 'flex-end', alignSelf: 'center', width: '100%'}}>
                        <TouchableOpacity style={styles.syncBtn}><Ionicons name='reload' size={25} color={'white'}/><Text style={{color: 'white'}}>Sincronizar</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{ alignSelf: 'center' }}>
                        <View style={styles.tableCard} >
                            <View style={styles.tableHeader}>
                                <View style={{ width: 70 }}></View>
                                <Text style={{ width: 55, fontSize: 15, fontWeight: 'bold' }}>ID</Text>
                                <Text style={{ width: 100, fontSize: 15, fontWeight: 'bold' }}>Inep</Text>
                                <Text style={{ width: 350, fontSize: 15, fontWeight: 'bold' }}>Nome da Escola</Text>
                                <Text style={{ width: 120, textAlign: 'left', fontSize: 15, fontWeight: 'bold' }}>Tipo</Text>
                                <Text style={{ width: 100, textAlign: 'left', fontSize: 15, fontWeight: 'bold' }}>Ações</Text>
                            </View>
                            <View style={styles.tableContainerContent}>
                                {data.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.tableContent}>
                                            <BouncyCheckbox
                                                size={25}
                                                fillColor="green"
                                                unfillColor="#FFFFFF"
                                                style={{ width: 25, }}
                                                isChecked={isChecked}
                                                iconStyle={{ borderColor: "green", borderRadius: 5 }}
                                                innerIconStyle={{ borderWidth: 1, borderRadius: 5 }}
                                                onPress={(isChecked: boolean) => { setIsChecked(isChecked) }} />
                                            <Text style={{ width: 100, fontSize: 15, textAlign: 'center' }}>{item.id}</Text>
                                            <Text style={{ width: 100, fontSize: 15, textAlign: 'left' }}>{item.inep}</Text>
                                            <Text style={{ width: 350, fontSize: 15, textAlign: 'left' }}>{item.nome}</Text>
                                            <Text style={{ width: 120, fontSize: 15, textAlign: 'left' }}>{item.tipo}</Text>
                                            <View style={{ flexDirection: 'row', width: 50, gap: 10 }}>
                                                <TouchableOpacity style={styles.addBtn}><Ionicons color={'white'} name='eye-outline' size={30} /></TouchableOpacity>
                                                <TouchableOpacity style={styles.addBtn}><Ionicons color={'white'} name='pencil-outline' size={30} /></TouchableOpacity>
                                                <TouchableOpacity style={styles.addBtn}><Ionicons color={'white'} name='trash-outline' size={30} /></TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.paginationContainer}>
                <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('skipBack')}><Ionicons name='play-skip-back-outline' color={'white'} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('back')}><Ionicons name='chevron-back-outline' color={'white'} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                <Text>{currentPage} de {numberOfPages}</Text>
                <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('forward')}><Ionicons name='chevron-forward-outline' color={'white'} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('skipForward')}><Ionicons name='play-skip-forward-outline' color={'white'} size={20} style={styles.paginationIcon} /></TouchableOpacity>
            </View>
        </>
    )
}

export default Home;
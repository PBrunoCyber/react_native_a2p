import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import styles from '../styles/home.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Escola from '../services/Escola';
import EstruturaFisicaEscolar from '../services/EstruturaFisicaEscolar';
import json from '../json/escolas.json';
import Filtros from '../components/filtros';
import Table from '../components/table';
import { COLORS } from '../constants/theme'
import { IEscola } from '../types/Escola';
import DoubleRing from '../assets/icons/Double_Ring.svg';
import { ActivityIndicator } from 'react-native';


const Home = () => {

    const limit: number = 10;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<IEscola>>();
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [selectedInep, setSelectedInep] = useState<string>();

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
            const promise = json.map(async (item, index) => {
                await Escola.insertEscola({ inep: item.codINEPEntidade.toString(), id: item.idEntidade, nome: item.nome, tipo: "Não Iniciado" });
            })
            await Promise.all(promise);
            initData();
            setIsLoading(false);
        }

    }

    const createOrNotEscola = async () => {
        const res = await Escola.existsEscola();
        if (res != true) {
            Escola.createTBEscola();
        }
    }

    const getNumberOfPages = async () => {
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

    const createOrNotEstruturaFisicaEscolar = async () => {
        const res = await EstruturaFisicaEscolar.existsEstruturaFisicaEscolar();
        if (res != true) {
            await EstruturaFisicaEscolar.createTBEstruturaFisicaEscolar();
        }
    }

    const getDataByInep = async () => {
        const res: any = await Escola.getByInep(selectedInep);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    useEffect(() => {
        getDataByInep();
    }, [selectedInep])

    useEffect(() => {
        //Escola.dropTBEscola();
        //EstruturaFisicaEscolar.dropTBEstruturaFisicaEscolar();
        createOrNotEscola();
        createOrNotEstruturaFisicaEscolar();
        insertOrNotEscola();
        initData();
        
    }, [])

    useEffect(() => {
        getWithPagination();
    }, [currentPage]);

    return (
        <>
            <Stack.Screen options={{
                title: "Home", headerTitleStyle: { color: COLORS.white }, headerShadowVisible: false,
                headerLeft: () => <Ionicons name='menu' color={COLORS.white} size={30} />,
                headerRight: () => <Ionicons name='exit-outline' color={COLORS.white} size={30} />,
                headerStyle: { backgroundColor: COLORS.green }
            }} />
            {isLoading ?
                <View style={{ alignItems: 'center', marginTop: 100, justifyContent: 'center', }}>
                    <ActivityIndicator color={COLORS.green} size={40} />
                </View>
                :
                <>
                    <ScrollView>
                        <View style={{ margin: 20 }}>
                            <Filtros setSelectedInep={setSelectedInep} initData={initData} limit={limit} />
                            <View style={{ maxWidth: 900, marginTop: 20, alignItems: 'flex-end', alignSelf: 'center', width: '100%' }}>
                                <TouchableOpacity style={styles.syncBtn}><Ionicons name='reload' size={25} color={COLORS.white} /><Text style={{ color: COLORS.white }}>Sincronizar</Text></TouchableOpacity>
                            </View>
                            <Table data={data} />
                        </View>
                        <View style={styles.paginationContainer}>
                            <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('skipBack')}><Ionicons name='play-skip-back-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('back')}><Ionicons name='chevron-back-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <Text>{currentPage} de {numberOfPages}</Text>
                            <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('forward')}><Ionicons name='chevron-forward-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('skipForward')}><Ionicons name='play-skip-forward-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                        </View>
                    </ScrollView>
                </>

            }

        </>
    )
}

export default Home;
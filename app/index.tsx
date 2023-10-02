import { Link, Stack, useFocusEffect, useRouter } from 'expo-router';
import { View, Text, Image, TextInput, FlatList, Animated, TouchableOpacity } from 'react-native';
import styles, { deleteBackgroud, deleteContainer } from '../styles/home.style';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from 'react-native-gesture-handler';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Escola from '../services/Escola';
import EstruturaFisicaEscolar from '../services/EstruturaFisicaEscolar';
import json from '../json/escolas.json';
import Filtros from '../components/Filtros';
import Table from '../components/Table';
import { COLORS } from '../constants/theme'
import { IEscola } from '../types/Escola';
import DoubleRing from '../assets/icons/Double_Ring.svg';
import { ActivityIndicator } from 'react-native';


const Home = () => {

    const limit: number = 10;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<IEscola>>([]);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [selectedInep, setSelectedInep] = useState<string>('');
    const [inepForDelete, setInepForDelete] = useState<string>('');
    const [scale] = useState(new Animated.Value(0));
    const [opacity] = useState(new Animated.Value(0));
    const [display, setDisplay] = useState<"none" | "flex" | undefined>("none");
    const [messageOk, setMessageOk] = useState('');
    const [messageError, setMessageError] = useState('');

    const router = useRouter();

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
                await Escola.insertEscola({ inep: item.codINEPEntidade.toString(), id: item.idEntidade, nome: item.nome });
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
        }else{
            setData([]);
        }
    }

    const getWithPagination = async () => {
        const res: any = await Escola.getWithPagination(limit, (currentPage - 1) * limit);
        if (res != false) {
            setData(res);
        }else{
            setData([]);
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
        if (selectedInep != '')
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

    useFocusEffect(
        useCallback(() => {
            initData();
            setDisplay("none");
        }, [])
    )

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const onShowDelete = (inep: string) => {
        setInepForDelete(inep);
        Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
        setDisplay("flex");
        Animated.timing(opacity, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    const onHideDelete = () => {
        setInepForDelete('');
        Animated.timing(scale, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        setTimeout(() => {
            setDisplay("none");
        }, 500)
    }

    const deleteForm = async () => {
        const res: any = await EstruturaFisicaEscolar.deleteEstruturaFisicaEscolar(inepForDelete);
        if(res != false){
            setMessageOk('Formulário excluído com sucesso!');
            onHideDelete();
            initData();
            setTimeout(() => {
                setMessageOk('');
            }, 2000);
            return;
        }else{
            setMessageError('Ocorreu algum erro ao excluir o formulário, tente novamente!');
            setTimeout(() => {
                setMessageError('');
            }, 2000);
            return;
        }
    }

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
                {messageOk ? <View style={styles.messageOk}><Ionicons name='checkmark-circle-outline' size={40} color={COLORS.green} /><Text style={{ fontWeight: 'bold', color: COLORS.green, maxWidth: 260 }}>{messageOk}</Text></View> : null}
                {messageError ? <View style={styles.messageError}><Ionicons name='close-circle-outline' size={40} color={COLORS.red} /><Text style={{ fontWeight: 'bold', color: COLORS.red, maxWidth: 260 }}>{messageError}</Text></View> : null}
                    
                    <ScrollView style={{zIndex: 9999}}>
                        <View style={{ margin: 20 }}>
                            <Filtros setSelectedInep={setSelectedInep} setNumberOfPages={(number)=>  setNumberOfPages(number)} initData={initData} limit={limit} />
                            <View style={{ maxWidth: 900, marginTop: 20, alignItems: 'flex-end', alignSelf: 'center', width: '100%' }}>
                                <TouchableOpacity style={styles.syncBtn}><Ionicons name='reload' size={25} color={COLORS.white} /><Text style={{ color: COLORS.white }}>Sincronizar</Text></TouchableOpacity>
                            </View>
                            <Table data={data} onDelete={(inep) => onShowDelete(inep)} />
                        </View>

                        <View style={[styles.paginationContainer]}>
                            <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('skipBack')}><Ionicons name='play-skip-back-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <TouchableOpacity disabled={currentPage === 1 ? true : false} onPress={() => paginate('back')}><Ionicons name='chevron-back-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <Text>{currentPage} de {numberOfPages}</Text>
                            <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('forward')}><Ionicons name='chevron-forward-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                            <TouchableOpacity disabled={currentPage === numberOfPages ? true : false} onPress={() => paginate('skipForward')}><Ionicons name='play-skip-forward-outline' color={COLORS.white} size={20} style={styles.paginationIcon} /></TouchableOpacity>
                        </View>
                    </ScrollView>
                    <Animated.View style={deleteContainer(scale,display)}>
                        <View style={styles.deleteCard}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tem certeza?</Text>
                            <Text>Essa ação irá excluir o quesitonário preenchido, quer continuar?</Text>
                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity><Text style={{ fontSize: 15 }} onPress={onHideDelete}>Cancelar</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.deleteBtnExcluir} onPress={deleteForm}><Text style={{ fontSize: 15, color: COLORS.white }}>Excluir</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                    <Animated.View style={deleteBackgroud(opacity, display)}></Animated.View>
                </>

            }

        </>
    )
}

export default Home;
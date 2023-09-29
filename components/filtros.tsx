import { View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../styles/filtros.style';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Escola from '../services/Escola';
import { COLORS } from '../constants/theme'
import { IEscola } from '../types/Escola';


interface IProps {
    setSelectedInep: React.Dispatch<React.SetStateAction<string | undefined>>
    limit: number,
    initData: ()=> void
}


const Filtros = (props: IProps) => {
    const router = useRouter();
    const [inepClicked, setInepClicked] = useState(false);
    const [nomeClicked, setNomeClicked] = useState(false);
    const [selectedInep, setSeletedInep] = useState<string>('');
    const [selectedNome, setSeletedNome] = useState<string>();
    const [data, setData] = useState<Array<IEscola>>();

    const getData = async () => {
        const res: any = await Escola.getAll(props.limit);
        if (res != false) {
            setData(res);
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
            props.setSelectedInep(filteredItems.inep.toString());
        }
    }

    const searchDataByInep = async (inep: string) => {
        const res: any = await Escola.getEscolaByInep(inep);
        //const count: any = await Escola.getNumberOfPagesWithInep(inep, props.limit);
        //props.setNumberOfPages(count);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    const searchDataByNome = async (nome: string) => {
        nome = nome.replace('  ', ' ');
        const res: any = await Escola.getEscolaByNome(nome);
        //const count: any = await Escola.getNumberOfPagesWithNome(nome, props.limit);
        //props.setNumberOfPages(count);
        if (res != false) {
            setData(res);
        } else {
            setData([]);
        }
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.add}>
                <Text style={{ fontSize: 20, color: COLORS.green, fontWeight: 'bold' }}>Estrutura Física Escolar</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/add/')}><Ionicons name='add-outline' size={40} color={'#fff'} /></TouchableOpacity>
            </View>
            <View style={styles.filtros}>
                <Text style={styles.txtFiltros}>FILTROS</Text>
                <View style={styles.inep_nome}>
                    <View style={{ flexGrow: 1, maxWidth: '100%', zIndex: 999 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Inep</Text>
                        <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setInepClicked(!inepClicked); getData();props.initData() }}>
                            <Text>{selectedInep}</Text>
                            {inepClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                        </TouchableOpacity>
                        {inepClicked ?
                            <View style={styles.dropdownArea}>
                                <TextInput placeholder="Pesquisar por inep" placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchDataByInep(txt) }} />
                                {
                                    (data && data.length > 0) &&
                                    data.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedInep(item.inep); props.setSelectedInep(item.inep); getNomeAcrossInep(data || [{ inep: '', id: 0, nome: '', tipo: '' }], item.inep); searchDataByInep(item.inep); setInepClicked(false); }}>
                                                <Text>{item.inep}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                            </View> : null}
                    </View>
                    <View style={{ flexGrow: 10, maxWidth: '100%' }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nome da Escola</Text>
                        <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setNomeClicked(!nomeClicked); getData();props.initData() }}>
                            <Text>{selectedNome}</Text>
                            {nomeClicked ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                <Ionicons name='chevron-down-outline' color={COLORS.green} size={30} />}
                        </TouchableOpacity>
                        {nomeClicked ?
                            <View style={styles.dropdownArea}>
                                <TextInput placeholder="Pesquisar escolas" placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchDataByNome(txt) }} />
                                {
                                    (data && data.length > 0) &&
                                    data.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { setSeletedNome(item.nome); getInepAcrossNome(data || [{ inep: '', id: 0, nome: '', tipo: '' }], item.nome, item.id); searchDataByNome(item.nome); setNomeClicked(false); }}>
                                                <Text>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                            </View> : null}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Filtros;
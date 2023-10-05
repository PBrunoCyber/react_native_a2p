import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../styles/table.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme'
import { IEscola } from '../types/Escola';
import { router, useFocusEffect } from 'expo-router';
import CheckBox from './CheckBox';

interface IProps {
    data: Array<IEscola>,
    onDelete: (inep: string) => void,
    selectedItems: (inep: string) => void,
    removeItems: (inep: string) => void
}

const Table = (props: IProps) => {
    const [isChecked, setIsChecked] = useState<0 | 1>(0);

    useFocusEffect(
        useCallback(() => {
            setIsChecked(0);
        }, [])
    )

    return (
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
                    {
                        (props.data && props.data?.length > 0) &&
                        props.data.map((item, index) => {
                            return (
                                <View key={index} style={styles.tableContent}>
                                    {item.sync === 1 ? <Ionicons name='checkmark' size={25} color={COLORS.green} /> : <View style={{ width: 25, marginTop: -35 }}><CheckBox fontWeight='normal' label='' value={isChecked} onSelect={(value) => { setIsChecked(value); value === 1 ? props.selectedItems(item.inep) : props.removeItems(item.inep) }} /></View>}
                                    <Text style={{ width: 100, fontSize: 15, textAlign: 'left' }}>{item.inep}</Text>
                                    <Text style={{ width: 350, fontSize: 15, textAlign: 'left' }}>{item.nome}</Text>
                                    <Text style={{ width: 120, fontSize: 15, textAlign: 'left' }}>{item.status}</Text>
                                    <View style={{ flexDirection: 'row', width: 50, gap: 10 }}>
                                        <TouchableOpacity style={styles.addBtn} onPress={() => router.push({ pathname: '/viewEstruturaFisicaEscolar', params: { inep: item.inep, nome: item.nome } })}><Ionicons color={COLORS.white} name='eye-outline' size={30} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.addBtn} onPress={() => router.push({ pathname: '/editEstruturaFisicaEscolar', params: { inep: item.inep, tipo: item.status, nome: item.nome } })}><Ionicons color={COLORS.white} name='pencil-outline' size={30} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.addBtn} onPress={() => props.onDelete(item.inep)}><Ionicons color={COLORS.white} name='trash-outline' size={30} /></TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                </View>
            </View>
        </ScrollView>

    )
}

export default Table;
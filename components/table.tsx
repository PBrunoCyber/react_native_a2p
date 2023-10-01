import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from '../styles/table.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme'
import { IEscola } from '../types/Escola';
import { router } from 'expo-router';

interface IProps {
    data: Array<IEscola>,
}

const Table = (props: IProps) => {
    const [isChecked, setIsChecked] = useState<boolean>();
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
                                    <BouncyCheckbox
                                        size={25}
                                        fillColor={COLORS.green}
                                        unfillColor="#FFFFFF"
                                        style={{ width: 25, }}
                                        isChecked={isChecked}
                                        iconStyle={{ borderColor: COLORS.green, borderRadius: 5 }}
                                        innerIconStyle={{ borderWidth: 1, borderRadius: 5 }}
                                        onPress={(isChecked: boolean) => { setIsChecked(isChecked) }} />
                                    <Text style={{ width: 100, fontSize: 15, textAlign: 'center' }}>{item.id}</Text>
                                    <Text style={{ width: 100, fontSize: 15, textAlign: 'left' }}>{item.inep}</Text>
                                    <Text style={{ width: 350, fontSize: 15, textAlign: 'left' }}>{item.nome}</Text>
                                    <Text style={{ width: 120, fontSize: 15, textAlign: 'left' }}>{item.tipo}</Text>
                                    <View style={{ flexDirection: 'row', width: 50, gap: 10 }}>
                                        <TouchableOpacity style={styles.addBtn} onPress={() => router.push(`/viewEstruturaFisicaEscolar/${item.inep}`)}><Ionicons color={COLORS.white} name='eye-outline' size={30} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.addBtn} onPress={() => router.push({pathname: '/editEstruturaFisicaEscolar', params: {inep: item.inep, tipo: item.tipo}})}><Ionicons color={COLORS.white} name='pencil-outline' size={30} /></TouchableOpacity>
                                        <TouchableOpacity style={styles.addBtn}><Ionicons color={COLORS.white} name='trash-outline' size={30} /></TouchableOpacity>
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
import { View, Text, Animated, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/abastecimentoDeAgua.style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/theme';
import CheckBox from '../CheckBox';
import { IInstrumentosEMateriais, ILinguaMinistrada } from '../../types/EstruturaFisicaEscolar';
import RadioGroup from '../RadioGroup';
import { useFocusEffect } from 'expo-router';
import json from '../../json/linguas_indigenas.json';

interface IProps {
    linguaMinistrada?: (value: ILinguaMinistrada) => void,
    answerInstrumentosEMateriais?: IInstrumentosEMateriais | undefined
    formErrors?: any,
    data?: ILinguaMinistrada,
    editData?: ILinguaMinistrada
}

const LinguaMinistrada = ({ formErrors, linguaMinistrada, answerInstrumentosEMateriais, data, editData }: IProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [answer, setAnswers] = useState<ILinguaMinistrada>(data || editData || { campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
    const [cod1, setCod1] = useState(false);
    const [cod2, setCod2] = useState(false);
    const [cod3, setCod3] = useState(false);
    const [linguas, setLinguas] = useState(json);
    const textOption = ["SIM", "NÃO"]

    useEffect(() => {
        linguaMinistrada &&
            linguaMinistrada(answer);
    }, [answer])

    useFocusEffect(
        useCallback(() => {
            setAnswers(data || editData || { campo_149: null, campo_150: null, campo_151: '', campo_152: '', campo_153: '' });
            setIsClicked(false);
        }, [])
    )

    useEffect(() => {
        if (formErrors && Object.keys(formErrors).length > 0) {
            setIsClicked(true);
        }
    }, [formErrors])

    const handleOptionChange = (question: string, answer: number | string | null) => {
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [question]: answer
        }));
        if (question === 'campo_149' && answer !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_151']: '',
                ['campo_152']: '',
                ['campo_153']: ''
            }));
            setCod1(false);
            setCod2(false);
            setCod3(false);
        }

        if (question === 'campo_151' && !answer) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_152']: '',
                ['campo_153']: ''
            }));
            setCod2(false);
            setCod3(false);
        }
        if (question === 'campo_152' && !answer) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_153']: ''
            }));
            setCod3(false);
        }

    }

    const searchByNome = (txt: string) => {
        if (txt === '') {
            setLinguas(json);
        } else {
            setLinguas(json.filter((linguas) => linguas.codigo.toString().toLowerCase().includes(txt.toLowerCase()) || linguas.nome.toLowerCase().includes(txt.toLowerCase())));
        }
    }

    useEffect(() => {
        if (answerInstrumentosEMateriais?.campo_148 !== 1) {
            setAnswers((prevAnswer) => ({
                ...prevAnswer,
                ['campo_149']: null,
                ['campo_150']: null
            }));
        }
    }, [answerInstrumentosEMateriais])

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => { setIsClicked(!isClicked) }}>
                <View style={styles.titleContainer}>
                    <Text style={isClicked || formErrors && Object.keys(formErrors).length > 0 ? { width: '80%', color: COLORS.green, fontWeight: 'bold' } : { width: '80%', color: COLORS.black }}>XVI - LÍNGUA EM QUE O ENSINO É MINISTRADO</Text>
                    {isClicked || formErrors && Object.keys(formErrors).length > 0 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} />
                        : <Ionicons name='chevron-down-outline' color={COLORS.lightBlack} size={30} />}
                </View>
                {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ? <View style={{ borderBottomWidth: 2, borderColor: COLORS.green, marginTop: 10 }} /> : null}
            </TouchableOpacity>
            {isClicked === true || formErrors && Object.keys(formErrors).length > 0 ?
                <View style={styles.formContainer}>
                    {formErrors?.linguaMinistrada && <Text style={styles.messageError}>{formErrors?.linguaMinistrada}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_150} disable={answerInstrumentosEMateriais?.campo_148 !== 1 || data ? true : false} value={answer.campo_150} textOption={textOption} fontWeight='normal' question='1 - Língua Portuguesa*' onSelect={(option) => handleOptionChange('campo_150', option)} />
                    {formErrors?.campo_150 && <Text style={styles.messageError}>{formErrors?.campo_150}</Text>}
                    <RadioGroup options={[1, 0]} marked={data ? true : false} selected={data?.campo_149} disable={answerInstrumentosEMateriais?.campo_148 !== 1 || data ? true : false} value={answer.campo_149} textOption={textOption} fontWeight='normal' question='2 - Língua Indígena*' onSelect={(option) => handleOptionChange('campo_149', option)} />
                    {formErrors?.campo_149 && <Text style={styles.messageError}>{formErrors?.campo_149}</Text>}
                    <View style={{ marginTop: 40 }}>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30, zIndex: 999 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>a) Código da língua indígena 1*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TouchableOpacity style={[styles.dropdownSelector, answer.campo_149 !== 1 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} disabled={answer.campo_149 != 1 || data ? true : false} onPress={() => { setCod1(!cod1); setLinguas(json); }}>
                                    <Text>{answer.campo_151}</Text>
                                    {cod1 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                        <Ionicons name='chevron-down-outline' color={answer.campo_149 !== 1 || data ? COLORS.lightBlack : COLORS.green} size={30} />}
                                </TouchableOpacity>
                                {cod1 ?
                                    <View style={styles.dropdownArea}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%' }}>
                                            <Ionicons name='search-outline' size={30} style={{ position: 'absolute', marginLeft: 5 }} color={COLORS.green} />
                                            <TextInput placeholder={"Código ou nome"} placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchByNome(txt) }}></TextInput>
                                        </View>
                                        {
                                            linguas.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { handleOptionChange('campo_151', item.codigo.toString()); setCod1(false); }}>
                                                        <Text>{item.codigo} - {item.nome}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }).slice(0, 10)}
                                    </View> : null}
                                {formErrors?.campo_151 && <Text style={styles.messageError}>{formErrors?.campo_151}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30, zIndex: 99 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>b) Código da língua indígena 2*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TouchableOpacity style={[styles.dropdownSelector, !answer.campo_151 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} disabled={!answer.campo_151 || data ? true : false} onPress={() => { setCod2(!cod2); setLinguas(json); }}>
                                    <Text>{answer.campo_152}</Text>
                                    {cod2 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                        <Ionicons name='chevron-down-outline' color={!answer.campo_151 || data ? COLORS.lightBlack : COLORS.green} size={30} />}
                                </TouchableOpacity>
                                {cod2 ?
                                    <View style={styles.dropdownArea}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%' }}>
                                            <Ionicons name='search-outline' size={30} style={{ position: 'absolute', marginLeft: 5 }} color={COLORS.green} />
                                            <TextInput placeholder={"Código ou nome"} placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchByNome(txt) }}></TextInput>
                                        </View>
                                        {
                                            linguas.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { handleOptionChange('campo_152', item.codigo.toString()); setCod2(false); }}>
                                                        <Text>{item.codigo} - {item.nome}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }).slice(0, 10)}
                                    </View> : null}
                                {formErrors?.campo_152 && <Text style={styles.messageError}>{formErrors?.campo_152}</Text>}
                            </View>
                        </View>
                        <View style={[styles.formFlex, { paddingLeft: 50, marginBottom: 30, zIndex: 9 }]}>
                            <Text style={{ flexGrow: 1, maxWidth: 400 }}>c) Código da língua indígena 3*</Text>
                            <View style={{ maxWidth: 260, flexGrow: 1 }}>
                                <TouchableOpacity style={[styles.dropdownSelector, !answer.campo_152 || data ? { backgroundColor: COLORS.lightGray } : { backgroundColor: COLORS.white }]} disabled={!answer.campo_152 || data ? true : false} onPress={() => { setCod3(!cod3); setLinguas(json); }}>
                                    <Text>{answer.campo_153}</Text>
                                    {cod3 ? <Ionicons name='chevron-up-outline' color={COLORS.green} size={30} /> :
                                        <Ionicons name='chevron-down-outline' color={!answer.campo_152 || data ? COLORS.lightBlack : COLORS.green} size={30} />}
                                </TouchableOpacity>
                                {cod3 ?
                                    <View style={styles.dropdownArea}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '90%' }}>
                                            <Ionicons name='search-outline' size={30} style={{ position: 'absolute', marginLeft: 5 }} color={COLORS.green} />
                                            <TextInput placeholder={"Código ou nome"} placeholderTextColor={COLORS.green} style={styles.searchInput} onChangeText={txt => { return searchByNome(txt) }}></TextInput>
                                        </View>
                                        {
                                            linguas.map((item, index) => {
                                                return (
                                                    <TouchableOpacity key={index} style={styles.schoolsItem} onPress={() => { handleOptionChange('campo_153', item.codigo.toString()); setCod3(false); }}>
                                                        <Text>{item.codigo} - {item.nome}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }).slice(0, 10)}
                                    </View> : null}
                                {formErrors?.campo_153 && <Text style={styles.messageError}>{formErrors?.campo_153}</Text>}
                            </View>
                        </View>
                    </View>
                </View>
                : null
            }

        </View >
    );
}

export default LinguaMinistrada;

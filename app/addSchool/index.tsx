import { Text, TextInput, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './addSchool.style';
import json from '../../json/estados-cidades.json';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddSchool = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nome: '',
        logradouro: '',
        bairro: '',
        cep: '',
        numero: '',
        cidade: '',
        estado: '',
        complemento: ''
    });
    const [formErrors, setFormErrors] = useState({ nome: '', logradouro: '', bairro: '', cep: '', numero: '', estado: '', cidade: '' });

    const handleInputChange = (key: string, input: string) => {
        setFormErrors({ nome: '', logradouro: '', bairro: '', cep: '', numero: '', estado: '', cidade: '' });
        setFormData({ ...formData, [key]: input });
    }

    const onSubmit = async () => {
        const errors = { nome: '', logradouro: '', bairro: '', cep: '', numero: '', estado: '', cidade: '' }
        if (!formData.nome) errors.nome = "O campo nome da instituição é obrigatório"
        if (!formData.logradouro) errors.logradouro = "O campo logradouro é obrigatório"
        if (!formData.bairro) errors.bairro = "O campo bairro é obrigatório"
        if (!formData.cep) errors.cep = "O campo cep é obrigatório"
        if (!formData.numero) errors.numero = "O campo número é obrigatório"
        if (!formData.estado) errors.estado = "O campo estado é obrigatório"
        if (!formData.cidade) errors.cidade = "O campo cidade é obrigatório"
        if (errors.nome || errors.logradouro || errors.bairro || errors.cep || errors.numero || errors.estado || errors.cidade) {
            setFormErrors(errors);
            return;
        }
        try {
            const storageForms = (await AsyncStorage.getItem('formData'));
            let formsArray = [];
            if (storageForms) {
                formsArray = JSON.parse(storageForms);
            }
            formsArray.push(formData);
            const jsonData = JSON.stringify(formsArray);
            await AsyncStorage.setItem('formData', jsonData);
            console.log("Dados do formulário salvos com sucesso");
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>

            <Stack.Screen options={{ title: "Adicionar uma escola", headerShadowVisible: false }} />


            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.label}>Nome da Escola/Instituição</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('nome', text)} placeholder='Digite o nome da escola/instituição'></TextInput>
                    {formErrors.nome ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.nome}</Text> : ''}
                </View>
                <View>
                    <Text style={styles.label}>Logradouro</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('logradouro', text)} placeholder='Digite o endereço da instituição' />
                    {formErrors.logradouro ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.logradouro}</Text> : ''}
                </View>
                <View>
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('bairro', text)} placeholder='Digite o bairro da instituição' />
                    {formErrors.bairro ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.bairro}</Text> : ''}
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('cep', text)} placeholder='Digite o CEP da instituição' />
                    {formErrors.cep ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.cep}</Text> : ''}
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text style={styles.label}>Número</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('numero', text)} placeholder='Número' />
                    {formErrors.numero ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.numero}</Text> : ''}
                </View>
                <View>
                    <Text style={styles.label}>Estado</Text>
                    <View style={styles.picker}>
                        <Picker selectedValue={formData.estado} onValueChange={(itemValue, index) => setFormData({ ...formData, ['estado']: itemValue })} >
                            <Picker.Item style={{ color: "#9e9e9e", fontSize: 14 }} label={"Selecione um estado"} value={""} />
                            {json.estados.map((estado, index) => {
                                return (
                                    <Picker.Item key={index} label={estado.sigla} value={estado.sigla} />
                                )
                            })}
                        </Picker>
                    </View>
                    {formErrors.estado ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.estado}</Text> : ''}
                </View>
                <View >
                    <Text style={styles.label}>Cidade</Text>
                    <View style={styles.picker}>
                        <Picker selectedValue={formData.cidade} onValueChange={(itemValue, index) => setFormData({ ...formData, ['cidade']: itemValue })} >
                            <Picker.Item style={{ color: "#9e9e9e", fontSize: 14 }} label={"Selecione uma cidade"} value={""} />
                            {json.estados.filter((state) => (state.sigla === formData.estado)).map((data) => data.cidades.map(
                                (cidade, index) => {
                                    return (<Picker.Item key={index} label={cidade} value={cidade} />)
                                }
                            ))}
                        </Picker>
                    </View>
                    {formErrors.cidade ? <Text style={{ color: 'red', marginTop: 5, fontSize: 14 }}>{formErrors.cidade}</Text> : ''}
                </View>
                <View>
                    <Text style={styles.label} >Complemento</Text>
                    <TextInput style={styles.input} onChangeText={(text) => handleInputChange('complemento', text)} placeholder='Digite o bairro da instituição' />
                </View>
                <TouchableOpacity style={styles.saveBtn} onPress={onSubmit}>
                    <Text style={{ color: '#fff' }}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default AddSchool;
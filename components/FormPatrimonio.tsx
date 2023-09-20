import { View, Text, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './formPatrimonio.styles'
import { useState } from 'react';

interface IForm {
    school?: string,
    getFormData: (data: Object, screen: string, progress: number) => void
}

const FormPatrimonio = (props: IForm) => {
    const [formData, setFormData] = useState({ unGestora: props.school });

    const onValueChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    }

    return (
        <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}>
            <View style={styles.container}>
                <View>
                    <Text>Unidade Gestora</Text>
                    <TextInput value={props.school} disableFullscreenUI={true} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Nome do Item</Text>
                    <TextInput onChangeText={(value) => onValueChange('nomeItem', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Nome do Bem</Text>
                    <TextInput onChangeText={(value) => onValueChange('nomeBem', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Marca do Bem</Text>
                    <TextInput onChangeText={(value) => onValueChange('marcaBem', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Descrição do Bem</Text>
                    <TextInput multiline numberOfLines={4} onChangeText={(value) => onValueChange('descricaoDoBem', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Número de Tombamento</Text>
                    <TextInput onChangeText={(value) => onValueChange('numeroTombamento', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Alíquota Depreciação Anual (%)</Text>
                    <TextInput onChangeText={(value) => onValueChange('aliquotaDepreciacao', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Alíquota Residual (%)</Text>
                    <TextInput onChangeText={(value) => onValueChange('aliquotaResidual', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Vida Útil do Bem</Text>
                    <TextInput onChangeText={(value) => onValueChange('vidaUtil', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Valor da Aquisição do Bem (R$)</Text>
                    <TextInput onChangeText={(value) => onValueChange('valor', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Situação</Text>
                    <TextInput onChangeText={(value) => onValueChange('situacao', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Data de Entrada</Text>
                    <TextInput onChangeText={(value) => onValueChange('dataEntrada', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Data de Corte</Text>
                    <TextInput onChangeText={(value) => onValueChange('dataCorte', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Valor Mensurada a Mercado em 31/12/2021</Text>
                    <TextInput onChangeText={(value) => onValueChange('valorMensurado', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Número do Empenho</Text>
                    <TextInput onChangeText={(value) => onValueChange('numeroEmpenho', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Valor do Empenho</Text>
                    <TextInput onChangeText={(value) => onValueChange('valorEmpenho', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>CNPJ do Fornecedor</Text>
                    <TextInput onChangeText={(value) => onValueChange('cnpjFornecedor', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Data de Emissão da Nota Fiscal</Text>
                    <TextInput onChangeText={(value) => onValueChange('dataEmissaoNota', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Chave da Nota Fiscal</Text>
                    <TextInput onChangeText={(value) => onValueChange('chaveNotaFiscal', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>CPF do Responsável Pelo Bem</Text>
                    <TextInput onChangeText={(value) => onValueChange('cpfResponsavel', value)} style={styles.input} />
                </View>
                <View>
                    <Text style={styles.label}>Setor de Localização</Text>
                    <TextInput onChangeText={(value) => onValueChange('setorLocalização', value)} style={styles.input} />
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={() => props.getFormData(formData, 'B', 50)}><Text style={{ color: '#fff' }}>Próxima Etapa</Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default FormPatrimonio;
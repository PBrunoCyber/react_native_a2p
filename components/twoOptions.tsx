import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from '../styles/inputLocalDeFuncionamento.style'
import { COLORS } from '../constants/theme';

// Componente reutilizável para uma pergunta com duas opções
interface IProps {
    question: string,
    option1: boolean,
    option2: boolean,
    onOptionChange: (option: boolean) => void
}

const TwoOptions = ({ question, option1, option2, onOptionChange }: IProps) => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckbox1Change = () => {
        setIsChecked1(true);
        setIsChecked2(false);
        onOptionChange(option1);
    };

    const handleCheckbox2Change = () => {
        setIsChecked1(false);
        setIsChecked2(true);
        onOptionChange(option2);
    };

    return (
        <View>
            <View style={styles.formFlex}>
                <Text style={{ fontWeight: 'bold', flexGrow: 1 }}>{question}</Text>
                <View style={styles.formFlexOptions}>
                    <View style={styles.formFlexOption}>
                        <BouncyCheckbox isChecked={false} onPress={() => handleCheckbox1Change()} fillColor={COLORS.green} />
                        <Text style={{ fontWeight: 'bold' }}>SIM</Text>
                    </View>
                    <View style={styles.formFlexOption}>
                        <BouncyCheckbox isChecked={false} onPress={() => handleCheckbox2Change()} fillColor={COLORS.green} />
                        <Text style={{ fontWeight: 'bold' }}>NÃO</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default TwoOptions;
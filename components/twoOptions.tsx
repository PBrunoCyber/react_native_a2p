import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from '../styles/inputLocalDeFuncionamento.style'
import { COLORS } from '../constants/theme';
import { CheckBox } from 'react-native-elements';

// Componente reutilizável para uma pergunta com duas opções
interface IProps {
    question: string,
    weight: "bold" | "normal",
    onOptionChange: (option: boolean) => void
}

const TwoOptions = ({ question, weight, onOptionChange }: IProps) => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckbox1Change = () => {
        setIsChecked1(true);
        setIsChecked2(false);
        onOptionChange(true);
    };

    const handleCheckbox2Change = () => {
        setIsChecked1(false);
        setIsChecked2(true);
        onOptionChange(false);
    };

    return (
        <View>
            <View style={styles.formFlex}>
                <Text style={{ fontWeight: weight, flexGrow: 1 }}>{question}</Text>
                <View style={styles.formFlexOptions}>
                    <View>
                        <CheckBox
                            title="SIM"
                            checked={isChecked1}
                            containerStyle={{
                                borderRadius: 20, // Ajuste o valor de borderRadius conforme necessário
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                            }}
                            titleProps={{
                                style: {
                                    fontWeight: weight,
                                    paddingLeft: 10
                                }
                            }}
                            uncheckedColor={COLORS.green}
                            checkedColor={COLORS.green}
                            size={30}
                            onPress={() => handleCheckbox1Change()}
                        />
                    </View>
                    <View>
                        <CheckBox
                            title="NÃO"
                            checked={isChecked2}
                            containerStyle={{
                                borderRadius: 20, // Ajuste o valor de borderRadius conforme necessário
                                backgroundColor: 'transparent',
                                borderWidth: 0
                            }}
                            titleProps={{
                                style: {
                                    fontWeight: weight,
                                    paddingLeft: 10

                                }
                            }}
                            uncheckedColor={COLORS.green}
                            checkedColor={COLORS.green}
                            size={30}
                            onPress={() => handleCheckbox2Change()}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default TwoOptions;
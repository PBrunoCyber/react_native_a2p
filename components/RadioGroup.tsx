import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/radioGroup.style'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface IRadioGroup {
    options: Array<number>,
    textOption: Array<string>,
    question: string,
    value: number | null,
    disable?: boolean
    fontWeight: 'bold' | 'normal',
    color?: string,
    onSelect: (option: number | null) => void
}

const RadioGroup = ({ options, question, value, textOption, disable, fontWeight, color, onSelect }: IRadioGroup) => {

    const handleOptionSelect = (option: number | null) => {
        onSelect(option);
    };

    return (
        <View style={[styles.formFlex]}>
            <Text style={{ flexGrow: 1, fontWeight: fontWeight, color: color, maxWidth: 400 }}>{question}</Text>
            <View style={styles.formFlexOptions}>
                {options.map((option, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10, width: 130 }}>
                        {disable === false || disable === undefined ?
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    value === option && styles.selected,
                                ]}
                                onPress={() => handleOptionSelect(option)}
                            >   
                                {value === option && <Ionicons color={COLORS.white} name='checkmark-outline' size={20} style={{alignSelf: 'center'}} />}
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={[
                                    styles.radioButtonDisabled,
                                ]}
                                disabled={true}
                            />
                        }

                        <Text style={{ fontWeight: fontWeight }}>{textOption[index]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RadioGroup;
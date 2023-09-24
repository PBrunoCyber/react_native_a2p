import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/checkBox.style'
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../constants/theme';

interface IRadioGroup {
    label: string,
    fontWeight: 'bold' | 'normal',
    value: 0 | 1,
    onSelect: (option: 0 | 1) => void
}

const RadioGroup = ({ label,fontWeight,value, onSelect }: IRadioGroup) => {
    const [isChecked, setIsChecked] = useState<boolean>(value === 1 ? true : false);

    const toggleCheckBox = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        newCheckedState === true ? onSelect(1) : onSelect(0)
    };

    return (
        <View style={styles.formFlexOptions}>
            <TouchableOpacity onPress={toggleCheckBox} style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Ionicons name='checkmark-outline' size={20} color={COLORS.white}/>}
            </TouchableOpacity>
            <Text style={{fontWeight: fontWeight}}>{label}</Text>
        </View>
    );
};

export default RadioGroup;
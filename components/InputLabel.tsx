import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './inputLabel.style';

interface ILabelInput {
    onValueChange: (key: string, value: string | number) => void,
    text: string,
    chave: string,
}



const InputLabel = (props: ILabelInput) => {

    return (
        <View>
            <Text style={styles.label}>{props.text}</Text>
            <TextInput onChangeText={(value) => props.onValueChange(props.chave, value)} style={styles.input} />
        </View>
    )
}

export default InputLabel;
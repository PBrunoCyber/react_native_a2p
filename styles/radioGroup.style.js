import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        borderWidth: 2,
        borderColor: COLORS.green,
        borderRadius: 50,
        padding: 0,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonDisabled: {
        borderWidth: 2,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.lightGray,
        borderRadius: 50,
        padding: 8,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        backgroundColor: COLORS.green,
    },
    formFlexOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        flexWrap: 'wrap',
        gap: 10,
    },
    formFlexOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
    },
    selectedDisabled: {
        backgroundColor: COLORS.gray,
    }
});

export default styles;
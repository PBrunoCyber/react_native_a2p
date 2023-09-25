import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 40,
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
        padding: 8,
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
        gap: 30,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    formFlexOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
    },

});

export default styles;
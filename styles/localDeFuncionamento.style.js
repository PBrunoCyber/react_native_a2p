import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formContainer: {
        marginBottom: 40,
    },
    formFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 40,
        gap: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: COLORS.gray
    },
    formFlexOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
    },
    formFlexOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100
    },
    messageError: {
        marginTop: 10,
        color: COLORS.red,
    }
});

export default styles;